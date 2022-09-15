const $ = document
const _ = {
  // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
  isMobile: navigator.userAgentData ?
    navigator.userAgentData.mobile :
    navigator.userAgent.match(/\Mobile/i)
}

$.githubLink = (function () {
  const a = $.createElement('a')
  const span = $.createElement('span')
  const img = $.createElement('img')
  const text = $.createElement('span')
  span.id = 'github'
  a.setAttribute('target', '_blank')
  a.setAttribute('href', _.GitHubLink)
  a.setAttribute('id', 'link')
  a.setAttribute('alt', 'GithubIcon')
  img.src = './assets/GitHub.svg'
  text.style.verticalAlign = 'middle'
  text.appendChild($.createTextNode('Kozmos941'))
  span.appendChild(img)
  span.appendChild(text)
  a.appendChild(span)
  return a
})()

$.downloadButton = (function () {
  const button = $.createElement('button')
  const div = $.createElement('div')
  button.id = 'download'
  button.appendChild($.createTextNode('Save As Image'))
  // const size = localStorage.getItem('size') || '… MB'
  div.appendChild($.createTextNode('… MB'))
  button.appendChild(div)
  return button
})()

window.onload = (async function () {
  // Get Data
  const json = await (async function () {
    const url = await `./data/data.json`
    return await fetch(url).then(
      response => response.json()
    )
  })()
  // 打印最后更新时间
  console.log(json.LastUpdated);
  Object.assign(_, json._)
  const table = renderTable(json.Data)
  // Mount into DOM
  $.body.insertBefore(table, $.body.firstChild)
  $.body.insertBefore($.downloadButton, $.body.firstChild)
  table.caption.appendChild($.githubLink)
  setRowSpan(_.RowSpan)
  return table
})().then((table) => {
  setTimeout(async function () {
    const dl = new Download(table)
    window.setScale = dl.setScale.bind(dl)
    if (localStorage.getItem('blob')) {
      dl.setSize()
      $.downloadButton.addEventListener(
        'click', () => { dl.screenShot() }
      )
    } else {
      const blob = await dl.blob
      localStorage.setItem('size', `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`);
      localStorage.setItem('scale', dl.scale);
      localStorage.setItem('blob', URL.createObjectURL(blob));
      dl.setSize()
      // 防止提前点击
      $.downloadButton.addEventListener(
        'click', () => { dl.screenShot() }
      )
    }
  }, 0)
})
