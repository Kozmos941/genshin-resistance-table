const _ = {
  Races: [
    '元素生命',
    '丘丘部落',
    '深渊',
    '愚人众',
    '其他人类势力',
    '异种魔兽',
    '自律机关',
    '值得铭记的强敌',
  ],
  THeads: [
    { key: 'race', value: '种族' },
    { key: 'name', value: '怪物' },
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
}

const fs = require('fs')

fetchData().then(raw => {
  const flattened = flattenData(raw)
  const Data = tableData(flattened)
  const json = JSON.stringify({ Data, _ })

  fs.writeFile('data.json', json, 'utf-8'
    , (err) => {
      if (err) console.log(err)
      else console.log('data.json 写入完成！');
    })
})

async function fetchData() {
  return _.Races.reduce(async (accumulator, race) => {
    const path = `../data/${race}.json`
    const json = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    return await accumulator.then(
      a => a.concat([{ race, monsters: json }])
    )
  }, Promise.resolve([]))
}

/* Old Version */
// async function fetchData() {
//   const raw = _.Races.reduce(async (accumulator, race) => {
//     const url = await `./data/${race}.json`
//     const json = await fetch(url).then(
//       response => response.json()
//     )
//     return await accumulator.then(
//       a => a.concat([{ race, monsters: json }])
//     )
//   }, Promise.resolve([]))
//   return raw
// }

function flattenData(raw) {
  const rowspan = {
    race: {}, name: {},
    add: function (k1, k2) {
      k2 in this[k1] ? this[k1][k2]++ : this[k1][k2] = 1
    }
  }
  const flattened = raw.map(({ race, monsters }) => {
    return monsters.map((monster) => {
      let { name, states } = monster
      if (!states) states = new Array({})
      return states.map((state) => {
        function destructor(obj) {
          const state =
            Object.assign({
              state: null,
              general: 10,
              particular: null,
            }, obj)
          const particular =
            Object.assign({
              correspond: null,
              electro: state.general,
              pyro: state.general,
              hydro: state.general,
              cryo: state.general,
              dendro: state.general,
              anemo: state.general,
              geo: state.general,
              physical: state.general,
            }, state.particular)

          return Object.assign(
            { race, name },
            { state: state.state },
            particular
          )
        }
        rowspan.add('race', race)
        rowspan.add('name', name)
        return destructor(state)
      })
    }).flat()
  }).flat()
  delete rowspan.add

  _.RowSpan = rowspan
  return flattened
}

function tableData(flattened) {
  let [_race, _name] = ''
  return flattened.map(
    d => {
      if (_race !== d.race)
        _race = d.race
      else delete d.race

      if (_name !== d.name)
        _name = d.name
      else delete d.name
      return d
    })
}
