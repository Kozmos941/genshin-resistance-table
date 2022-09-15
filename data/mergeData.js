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
  ],
  Infinity: '∞', //♾️∞ထ８ꝏꝎ
  Caption: '原神怪物抗性表 v3.0',
  TFootComment: `
    * 来自【空萤酒馆】，初版由巴别塔夜空提供，由 whrily、小明明、羽川raid 完善、修正，最后由 NGA 吾竟南宫遥保持更新。<br>
    * 现版又经更新、重制、并会在 <strong>米游社</strong> 和 
    <a href="https://bbs.nga.cn/read.php?tid=29649225" target="_blank"><strong>NGA</strong></a> 一直保持更新。`,
}

const WebFontConfig = {
  google: {
    families: [
      // 'Noto Serif SC:200,300,400,500,600,700,900',
      // 'Noto Sans SC:200,300,400,500,600,700,900',
      // 'Poppins:0,100,0,200,0,300,0,400,0,500,0,600,0,700,0,800,0,900,1,100,1,200,1,300,1,400,1,500,1,600,1,700,1,800,1,900',
      'Noto Serif SC:900',
      'Noto Sans SC:400,700,900',
      'Poppins:100,300,500,700,900',
    ]
  }
}

const fs = require('fs')

fetchData().then(raw => {
  const flattened = flattenData(raw)
  const Data = tableData(flattened)
  const json = JSON.stringify({
    Data, _,
    LastUpdated: new Date()
  })

  const txt = JSON.stringify(json).match(/.+/g)
    .join('').split('').sort().reduce((a, c) => {
      return c === a.slice(-1) ? a : a + c
    }, '')

  const links = WebFontConfig.google.families.reduce((a, c) => {
    let base = 'https://fonts.googleapis.com/css2?'
    const font = c.split(':')
    const fn = (font) => {
      const fontFamily = font[0].split(' ').join('+')
      const fontWeight = font[1].split(',').join(';')
      return (`family=${fontFamily}:wght@${fontWeight}`);
    }
    let text = ''
    // encodeURIComponent
    switch (font[0]) {
      case 'Noto Serif SC':
        text = `&text=` + (
          _.THeads.map(({ _, value }) => value).join('')
          + _.Caption.split(' ')[0]
        )
        break;
      case 'Noto Sans SC':
        text = `&text=` + (
          txt.slice(txt.indexOf(_.Infinity))
        )
        break;
    }
    const link = `<link rel="stylesheet" href="${base}${fn(font)}&display=swap${text}">`
    return a = a.concat(link)
  }, [])


  fs.writeFile('./WebFont.html', links.join('\n'), 'utf-8'
    , (err) => {
      if (err) console.log(err)
      else console.log('TEXT 写入完成！');
    }
  )

  fs.writeFile('data.json', json, 'utf-8'
    , (err) => {
      if (err) console.log(err)
      else console.log('data.json 写入完成！');
    }
  )
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
