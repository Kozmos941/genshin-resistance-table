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
    return table
  })
  .then((table) => {
    // 第一次加载网页没问题，但截图会少一列，原因不明
    let time = document.cookie ? 1 : 1500
    setTimeout(async function () {
      const blob = await Download.getBlob(table)
      const size = `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`
      $.downloadButton.lastChild.innerText = size
      _.blob = blob
      // 防止提前点击
      $.downloadButton.addEventListener(
        'click', () => { screenShot(table) }
      )
    }, time)
  })
