async function fetchData() {
  const raw = _.Races.reduce(async (accumulator, race) => {
    const url = await `./data/${race}.json`
    const json = await fetch(url)
      .then(response => response.json())
    return await accumulator
      .then(a => a.concat([{ race, monsters: json }]))
  }, Promise.resolve([]))
  return raw
}

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
