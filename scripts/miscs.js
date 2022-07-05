function textNode(text) {
  return $.createTextNode(text)
}

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
  return button
}

