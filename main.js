const $ = document

$.githubLink = createGithubLink()
$.downloadButton = createDownloadButton()

window.onload = (async function () {
  const raw = await fetchData()
  const flattened = flattenData(raw)
  const tablized = tableData(flattened)
  const table = renderTable(tablized)
  console.log(table);
  $.body.insertBefore(table, $.body.firstChild)
  $.body.insertBefore($.downloadButton, $.body.firstChild)
  table.caption.appendChild($.githubLink)
  setRowSpan(_.RowSpan)
  return table
})().then((table) => {
  setTimeout(async function () {
    const blob = await Download.getBlob(table)
    const size = `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`
    $.downloadButton.lastChild.innerText = size
    _.blob = blob
    // 防止提前点击
    $.downloadButton.addEventListener(
      'click', () => { screenShot(table) }
    )
  }, 0)
})


  // fetchData()
  //   .then(raw => flattenData(raw))
  //   .then(flattened => tableData(flattened))
  //   .then(tablized => renderTable(tablized))
  //   // Mount into DOM
  //   .then(table => {
  //     $.body.insertBefore(table, $.body.firstChild)
  //     $.body.insertBefore($.downloadButton, $.body.firstChild)
  //     table.caption.appendChild($.githubLink)
  //     setRowSpan(_.RowSpan)
  //     return table
  //   })
  //   .then((table) => {
  //     setTimeout(async function () {
  //       const blob = await Download.getBlob(table)
  //       const size = `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`
  //       $.downloadButton.lastChild.innerText = size
  //       _.blob = blob
  //       // 防止提前点击
  //       $.downloadButton.addEventListener(
  //         'click', () => { screenShot(table) }
  //       )
  //     }, 0)
  //   })
