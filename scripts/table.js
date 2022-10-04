function renderTable(tableData) {
  const table = createTable()
  const caption = createCaption(table.caption, _.Caption)
  const tHeads = createThead(table.tHead, _.THeads)
  const tBody = createTBody(table.tBodies[0], tableData)
  const tFoot = createTFoot(table.tFoot, tHeads.length)
  return table
}

function createTFoot(tfoot, spanLength) {
  const tr = tfoot.insertRow(-1)
  const td = tr.insertCell(-1)
  td.innerHTML = _.TFootComment
  td.colSpan = spanLength
}

function createTBody(tbody, tableData) {
  tableData.map(rowdata => createTRow(rowdata))

  function createTRow(rowdata) {
    const tr = tbody.insertRow(-1)
    _.THeads.map(({ key, _ }) => {
      const celldata = rowdata[key]
      const td = createTCell(celldata, key)
      // if (key === "name") {
      // tr.insertCell(-1)
      // td.colSpan = 2
      // }
    })

    function createTCell(value, key) {
      const td = tr.insertCell(-1)
      td.classList.add(key)

      let text = value
      if (value === null) text = '' // 'ㅤ' <= 这里有个空白符
      else switch (typeof value) {
        case 'string':
          if (value === 'infinity') {
            text = _.Infinity
            td.classList.add(value)
          } else if (value.match(/\n/)) {
            text = text.replace(/\n/, '<br>')
          }
          break
        case 'number':
          text += '%'
          if (value < 0) td.classList.add('minus')
          else if (value >= 75) td.classList.add('greater-75')
          else if (value >= 50) td.classList.add('greater-50')
          else if (value >= 20) td.classList.add('greater-20')
          break
      }
      td.innerHTML = text
      // td.appendChild($.createTextNode(text))
      return td
    }

    return tr
  }
}

function createThead(thead, thData) {
  const tr = thead.insertRow(0)
  thData.map(({ key, value }, i) => {
    const th = $.createElement('th')
    th.classList.add(key)
    th.appendChild($.createTextNode(value))
    tr.appendChild(th)
  })
  return tr.children
}

function createCaption(caption, text) {
  caption.appendChild($.createTextNode(text))
}

function createTable() {
  const table = $.createElement('table')
  table.createCaption()
  table.createTHead()
  table.createTBody()
  table.createTFoot()
  return table
}

function setRowSpan() {
  for (const key in object = _.RowSpan) {
    if (Object.hasOwnProperty.call(object, key)) {
      const span = object[key]
      const selector = `tbody .${key}`
      const nodeList = $.querySelectorAll(selector)
      for (const td of nodeList) {
        if (td.innerText in span) {
          td.rowSpan = span[td.innerText]
        } else td.remove()
      }
    }
  }
}

// const attributes = {
//   id: 'link',
//   target: '_blank',
//   href: _.GitHubLink
// }

// function addAttrsByObject(element, object) {
//   for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//       const value = object[key];
//       element.setAttribute(key, value)
//     }
//   }
// }
