function renderTable(tableData) {
  const table = createTable()
  const caption = createCaption(table.caption, _.Caption)
  const tHeads = createThead(table.tHead, _.THeads)
  const tBody = createTBody(table.tBodies[0], tableData)
  const tFootColSpan = tHeads.length
  const tFoot = createTFoot(table.tFoot, _.TFootComment, tFootColSpan)
  return table
}

function createTFoot(tfoot, comment, spanLength) {
  const tr = tfoot.insertRow(-1)
  const td = tr.insertCell(-1)
  td.innerHTML = comment
  td.colSpan = spanLength
}

function createTBody(tbody, tableData) {
  tableData.map(rowdata => createTRow(rowdata))

  function createTRow(rowdata) {
    const tr = tbody.insertRow(-1)
    _.THeads.map(({ key, _ }) => {
      const celldata = rowdata[key]
      createTCell(celldata, key)
    })

    function createTCell(celldata, key) {
      function check(value, key) {
        let text = value
        if (!value) text = 'ㅤ'
        else switch (value) {
          case 'infinity':
            text = _.Infinity
            td.classList.add(value)
            break
          default:
            if (value < 0) td.classList.add('minus')
            else if (value >= 75) td.classList.add('greater-75')
            else if (value >= 20) td.classList.add('greater-20')
        }
        return text % 1 === 0 ? text + '%' : text
      }

      const td = tr.insertCell(-1)
      td.classList.add(key)
      td.appendChild($.createTextNode(check(celldata, key)))
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
  const style = {
    position: 'relative',
    paddingLeft: '.2em',
    fontSize: '4em'
  }
  Object.assign(caption.style, style)
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
