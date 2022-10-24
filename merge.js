// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) + '/src'

export const RACES = [
  '元素生命',
  '丘丘部落',
  '深渊',
  '愚人众',
  '其他\n人类势力',
  '异种魔兽',
  '自律机关',
  '值得铭记\n的强敌',
]

export const TABLE_HEADS = [
  { key: 'race', value: '种族', color: '' },
  { key: 'being', value: '生物', color: '' },
  { key: 'state', value: '状态', color: '' },
  { key: 'correspond', value: '对应', color: '' },
  { key: 'electro', value: '雷', color: '#ffacff' },
  { key: 'pyro', value: '火', color: '#ff9999' },
  { key: 'hydro', value: '水', color: '#80c0ff' },
  { key: 'cryo', value: '冰', color: '#5cffff' },
  { key: 'dendro', value: '草', color: '#13eea2' },
  { key: 'anemo', value: '风', color: '#80ffd7' },
  { key: 'geo', value: '岩', color: '#ffe699' },
  { key: 'physical', value: '物', color: '#cccccc' },
]

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const isNoSpan = new RegExp(/\bnoSpan\b/i).test(process.argv.slice(2)) ?? false

const RECORD_MAP = new Map()
const SPAN_MAP = new Map()
const DATA_ARRAY = []

async function fetchData() {
  return RACES.reduce(async (accumulator, race, index) => {
    const basename = (index + 1) + '-' + race.replace(/\n/, '')
    const path = `${__dirname}/data/${basename}.json`
    const beings = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    return await accumulator.then(a => a.concat([{ race, beings }]))
  }, Promise.resolve([]))
}

function flattenData(raw) {
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

function writeFile(name, txt) {
  const dir = path.normalize(`${__dirname}/data/${name}`)
  fs.writeFile(dir, txt, 'utf-8', err => {
    if (err) console.log(err)
    else console.log(`${dir} 写入完成！`)
  })
}

fetchData().then(raw => {
  flattenData(raw)
  const data = DATA_ARRAY.map(item => Object.fromEntries(item))
  const rowspan = Object.fromEntries(SPAN_MAP)
  const json = JSON.stringify({ data, rowspan }, replacer, 2)
  writeFile('table.json', json)
  if (isNoSpan) {
    const json = JSON.stringify(data, null, 2)
    writeFile('data.json', json)
  }
})

