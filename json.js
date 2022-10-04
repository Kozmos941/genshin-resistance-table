import fs from 'fs'
import { Races, THeads } from './src/scripts/Config.js'

const src = './src'

fetchData().then(raw => {
  const Data = flattenData(raw)
  const json = JSON.stringify(Data)
  const path = `${src}/assets/data.json`

  fs.writeFile(path, json, 'utf-8'
    , (err) => {
      if (err) console.log(err)
      else console.log('data.json 写入完成！');
    }
  )
})

async function fetchData() {
  return Races.reduce(async (accumulator, race) => {
    const path = `${src}/data/${race}.json`
    const json = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    return await accumulator.then(
      a => a.concat([{ race, beings: json }])
    )
  }, Promise.resolve([]))
}

function flattenData(raw) {
  const flattened = raw.map(({ race, beings }) => {
    return beings.map(being_item => {
      let { being, states } = being_item
      if (!states) states = new Array({})
      return states.map(state_item => {

        function destructor(obj) {
          const { general = 10 } = obj
          delete obj.general

          const tmp = THeads
            .reduce((a, { key, _ }) => {
              a[key] = null
              return a
            }, {})

          const particular = THeads.slice(4)
            .reduce((a, { key, _ }) => {
              a[key] = general
              return a
            }, {})

          return Object.assign(
            tmp,
            { race, being },
            particular,
            obj
          )
        }
        return destructor(state_item)
      })
    }).flat()
  }).flat()
  return flattened
}
