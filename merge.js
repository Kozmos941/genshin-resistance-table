// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) + '/src'

import fs from 'fs'
import { Races, THeads } from './src/assets/config.js'

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
  return Races.reduce(async (accumulator, race) => {
    const file = race.replace(/\n/, '')
    const path = `${__dirname}/data/${file}.json`
    const json = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    return await accumulator.then(a => a.concat([{ race, beings: json }]))
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
              const tmp = THeads.reduce((a, { key, _ }) => {
                a[key] = null
                return a
              }, {})
              const particular = THeads.slice(4).reduce((a, { key, _ }) => {
                a[key] = general
                return a
              }, {})
              return Object.assign(tmp, { race, being }, particular, obj)
            }
            return destructor(state_item)
          })
        })
        .flat()
    })
    .flat()
}
