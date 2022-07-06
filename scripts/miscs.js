function createGithubLink() {
  const a = $.createElement('a')
  const span = $.createElement('span')
  const img = $.createElement('img')
  const text = $.createElement('span')
  const imgStyle = {
    verticalAlign: 'middle',
    marginRight: '0.5rem'
  }
  const spanStyle = {
    fontSize: '2.0rem',
    position: 'absolute',
    display: 'inline-block',
    right: '1rem',
    bottom: '0.5rem',
  }

  a.setAttribute('target', '_blank')
  a.setAttribute('href', _.GitHubLink)
  a.setAttribute('id', 'link')
  img.src = './assets/GitHub-Mark-Light-32px.png'
  text.style.verticalAlign = 'middle'
  Object.assign(img.style, imgStyle)
  Object.assign(span.style, spanStyle)
  text.appendChild(textNode('Kozmos941'))
  span.appendChild(img)
  span.appendChild(text)
  a.appendChild(span)
  return a
}

function createDownloadButton() {
  const button = $.createElement('button')
  const div = $.createElement('div')
  button.id = 'download'
  button.appendChild(textNode('Save As Image'))
  div.appendChild(textNode('… MB'))
  button.appendChild(div)
  return button
}


async function screenShot(table) {
  const options = {
    scale: Download.setScale(),
  }
  // https://stackoverflow.com/questions/67804382/force-showing-the-save-as-dialog-box-when-downloading-a-file
  const blob = options.scale === 1 ?
    _.blob : await Download.getBlob(table, options)
  const saveImg = $.createElement("a");
  saveImg.href = URL.createObjectURL(blob);
  saveImg.download = _.Caption + ".png";
  saveImg.click();
}

const Download = (function () {
  function scale() {
    let scale = 1
    return function (num) {
      if (0 < num && num <= 5) {
        scale = num
      }
      return scale
    }
  }

  function getBlob(table, opts) {
    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
    const windows = navigator.userAgent.match(/windows/i)
    const options = Object.assign({
      scale: windows ? 1.2 : 1.0,
      // width: table.offsetWidth
    }, opts)
    return html2canvas(table, options)
      .then(async canvas =>
        new Promise(blob => canvas.toBlob(blob))
      )
  }
  return { setScale: scale(), getBlob }
})()

function textNode(text) {
  return $.createTextNode(text)
}
