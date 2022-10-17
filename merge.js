// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) + '/src'

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

export const THEADS = [
  { key: 'race', value: '种族' },
  { key: 'being', value: '生物' },
  { key: 'state', value: '状态' },
  { key: 'correspond', value: '对应' },
  { key: 'electro', value: '雷' },
  { key: 'pyro', value: '火' },
  { key: 'hydro', value: '水' },
  { key: 'cryo', value: '冰' },
  { key: 'dendro', value: '草' },
  { key: 'anemo', value: '风' },
  { key: 'geo', value: '岩' },
  { key: 'physical', value: '物' },
]

const map = new Map()

THEADS.map(({ key }) => {
  const shim = key.slice(0, 2)
  map.set(key, shim)
  // map.set(shim, key)
})

fetchData().then(raw => {
  const Data = flattenData(raw)
  const json = JSON.stringify(Data)
  const path = `${__dirname}/assets/data.json`

  fs.writeFile(path, json, 'utf-8', err => {
    if (err) console.log(err)
    else console.log('data.json 写入完成！')
  })
})

async function fetchData() {
  return RACES.reduce(async (accumulator, race) => {
    const file = race.replace(/\n/, '')
    const path = `${__dirname}/data/${file}.json`
    const json = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    return await accumulator.then(a =>
      a.concat([{ race, beings: json }])
    )
  }, Promise.resolve([]))
}

function flattenData(raw) {
  return raw
    .map(({ race, beings }) => {
      return beings
        .map(being_item => {
          let { being, states } = being_item
          if (!states) states = new Array({})
          return states.map(state_item => {
            function destructor(obj) {
              const { general = 10 } = obj
              delete obj.general
              const tmp = THEADS.reduce((a, { key, _ }) => {
                a[key] = null
                return a
              }, {})
              const particular = THEADS.slice(4).reduce(
                (a, { key, _ }) => {
                  a[key] = general
                  return a
                },
                {}
              )
              return Object.assign(
                tmp,
                { race, being },
                particular,
                obj
              )
            }
            return destructor(state_item)
          })
        })
        .flat()
    })
    .flat()
}
