const $ = document
$.githubLink = createGithubLink()
$.downloadButton = createDownloadButton()

fetchData()
  .then(raw => flattenData(raw))
  .then(flattened => tableData(flattened))
  .then(tablized => renderTable(tablized))
  // Mount into DOM
  .then(table => { $.body.insertBefore(table, $.body.firstChild) })
  .then(() => { setRowSpan(_.RowSpan) })
