async function renderTable() {
  // Create Table
  const table = $.createElement('table')
  // Create Table Basic Node
  const caption = table.createCaption()
  const thead = table.createTHead()
  const tbody = table.createTBody()
  const tfoot = table.createTFoot()
  // Create Table CAPTION
  {
    const span = $.createElement('span')
    span.appendChild($.createTextNode(TEXT.CAPTION))
    const link = $.getElementById('link')
    caption.appendChild(span)
    caption.appendChild(link)
  }
  // Create Table Head
  const thead_tr = thead.insertRow(0)
  TEXT.THS.map(({ key, value }, i) => {
    const th = $.createElement('th')
    th.classList.add(key)
    th.appendChild($.createTextNode(value))
    thead_tr.appendChild(th)
  })

  // Fetch Data
  const json = await fetch('./table.json').then(response => response.json())

  const data = json.reduce((a, { race, monsters }) => {
    const tmp = monsters.reduce((a, { monster, states }) => {
      const tmp = states.reduce((a, { state, resistance }) => {
        const obj = TEXT.THS.reduce((a, c) => {
          a[c.key] = resistance.common
          return a
        }, {})
        const tmp = Object.assign(obj, resistance, { race, monster, state })
        delete tmp.common
        return a.concat(tmp)
      }, [])
      return a.concat(tmp)
    }, [])
    return a.concat(tmp)
  }, [])

  // Mount into DOM
  const record = {
    add(key) { key in this ? this[key]++ : this[key] = 1 }
  }
  data.map(row => {
    const tr = tbody.insertRow(-1)
    record.add(row.race)
    record.add(row.monster)

    Object.values(row).map((cell, i) => {
      const td = tr.insertCell(-1)
      td.classList.add(TEXT.THS[i].key)
      let text = ''
      if (cell && !isNaN(cell)) {
        if (cell < 0 || 10 < cell) {
          td.classList.add(cell < 0 ? 'minus' : 'greater')
        }
        text = cell + '%'
      }
      else if (cell) {
        if (cell === 'infinity') {
          td.classList.add('infinity')
          text = TEXT.INFINITY
        } else text = cell
      }
      td.appendChild($.createTextNode(text))
    })

  })
  // console.log(data);
  // console.log(record);

  // Merging Same Row
  let [c_race, c_monster] = ['', '']
  for (const tr of tbody.children) {
    const td_race = tr.children[0]
    const td_monster = tr.children[1]

    if (c_race !== td_race.innerHTML) {
      c_race = td_race.innerHTML
      td_race.rowSpan = record[td_race.innerHTML]
    } else { td_race.remove() }

    if (c_monster !== td_monster.innerHTML) {
      c_monster = td_monster.innerHTML
      td_monster.rowSpan = record[td_monster.innerHTML]
    } else { td_monster.remove() }

  }

  const td_tfoot = tfoot.insertRow(-1).insertCell(-1)
  td_tfoot.colSpan = TEXT.THS.length
  td_tfoot.innerHTML = TEXT.TFOOT
  // After Render
  $.body.appendChild(table)
  return table
}



