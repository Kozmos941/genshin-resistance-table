const $ = document

$.githubLink = createGithubLink()
$.downloadButton = createDownloadButton()

fetchData()
  .then(raw => flattenData(raw))
  .then(flattened => tableData(flattened))
  .then(tablized => renderTable(tablized))
  // Mount into DOM
  .then(table => {
    $.body.insertBefore(table, $.body.firstChild)
    $.body.insertBefore($.downloadButton, $.body.firstChild)
    table.caption.appendChild($.githubLink)
    setRowSpan(_.RowSpan)
    $.downloadButton.addEventListener(
      'click', function () { screenShot(table) }
    )
    return table
  })
  .then((table) => {
    setTimeout(async function () {
      const blob = await Download.getBlob(table)
      const size = `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`
      $.downloadButton.lastChild.innerText = size
      _.blob = blob
    }, 1)
  })
