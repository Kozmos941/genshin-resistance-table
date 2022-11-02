// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) + '/src'

/* Check Argument */
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
// https://stackoverflow.com/questions/1751301/regex-match-entire-words-only
// https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
class Arguments {
  constructor (args) {
    this.args = args
    this.NO_SPAN = this.test('nospan')
    this.BOTH = this.test('both')
  }
  test(word) {
    const regexp = String.raw`\b${word}\b`
    return new RegExp(regexp, 'i').test(this.args)
  }
}

const TOKEN = new Arguments(process.argv.slice(2))
const [RACES, TABLE_HEADS] = await config()
const RECORD_MAP = new Map()
const SPAN_MAP = new Map()
const DATA_ARRAY = []

/* Set Config */
async function config() {
  const utf8 = await fs.promises.readFile('./src/scripts/config.ts', 'utf-8')

  function arraySlice(txt, count) {
    const lefts = [...utf8.matchAll(/\[\n/g)]
    const rights = [...utf8.matchAll(/\]\n/g)]
    const array = []
    for (let i = 0; i < count; i++) {
      const l = lefts[i].index
      const r = rights[i].index + 1
      const json = txt.slice(l, r)
        .replace(/(\w+):/g, '"$1":')
        .replace(/'/g, '"')
        .replace(/,\n\]$/, '\n]')
      array.push(JSON.parse(json))
    }
    return array
  }

  return arraySlice(utf8, 2)
}

/* Data Merge */
async function fetchData() {
  return RACES.reduce(async (accumulator, { key, value }, index) => {
    const basename = `${(index + 1 + '').padStart(2, '0')}_${key}`
    const dir = `${__dirname}/data/${basename}.json`
    const beings = JSON.parse(await fs.promises.readFile(dir, 'utf-8'))
    return await accumulator.then(a => a.concat([{ race: value, beings }]))
  }, Promise.resolve([]))
}

function flatten(raw) {
  raw.forEach(({ race: curr_race_name, beings }) => {
    RECORD_MAP.set('length', DATA_ARRAY.length)
    beings.forEach(({ being: curr_being_name, states }) => {
      const $ = (item = {}) => {
        const map = createDataMap(curr_race_name, curr_being_name)
        setDataMap(map, item)
        DATA_ARRAY.push(map)
      }
      if (states) {
        if (states.length > 1) SPAN_MAP.set(curr_being_name, states.length)
        states.forEach(state_item => $(state_item))
      } else $()
    })
    const curr_race_span = () => DATA_ARRAY.length - RECORD_MAP.get('length')
    SPAN_MAP.set(curr_race_name, curr_race_span())
  })
}

function createDataMap(race, being) {
  const map = new Map()
  map.set('race', race)
  map.set('being', being)
  map.set('state', null)
  map.set('correspond', null)
  return map
}

function setDataMap(map, item) {
  const ITEM_MAP = new Map(Object.entries(item))
  if (!ITEM_MAP.has('general')) ITEM_MAP.set('general', 10)
  TABLE_HEADS.slice(4).forEach(({ key }) => map.set(key, ITEM_MAP.get('general')))
  ITEM_MAP.delete('general')
  for (const [key, value] of ITEM_MAP) map.set(key, value)
}

function writeFile(name, txt, outDir) {
  const dir = outDir ?? `${__dirname}/data/`
  const file = path.normalize(dir + name)
  fs.writeFile(file, txt, 'utf-8', err => {
    if (err) console.log(err)
    else console.log(`File: ${file} 写入完成！\n`)
  })
}

function replacer(key, value) {
  switch (key) {
    case 'race':
    case 'being': {
      if (RECORD_MAP.get(key) === value) return
      else RECORD_MAP.set(key, value)
      break
    }
  }
  return value
}

/* Main Function */
async function main() {
  flatten(await fetchData())
  const data = DATA_ARRAY.map(item => Object.fromEntries(item))
  if (TOKEN.NO_SPAN || TOKEN.BOTH) {
    const d = RACES.reduce((a, { key, value }) => {
      a[key] = data.filter(item => item.race === value)
      return a
    }, {})
    const json = JSON.stringify(d, null, 2)
    writeFile('data.json', json)
  }
  if (!TOKEN.NO_SPAN || TOKEN.BOTH) {
    const rowspan = Object.fromEntries(SPAN_MAP)
    const json = JSON.stringify({ data, rowspan }, replacer, 2)
    writeFile('table.json', json)
  }
}

main.call()
