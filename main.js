const $ = document
const _ = {
  Infinity: '∞', //♾️∞ထ８ꝏꝎ
  Caption: '原神怪物抗性表 v3.0',
  GitHubLink: 'https://github.com/Kozmos941/genshin-resistance-table',
  TFootComment: `
    * 来自【空萤酒馆】，初版由巴别塔夜空提供，由 whrily、小明明、羽川raid 完善、修正，最后由 NGA 吾竟南宫遥保持更新。<br>
    * 现版又经更新、重制、并会在 <strong>米游社</strong> 和 
    <a href="https://bbs.nga.cn/read.php?tid=29649225" target="_blank"><strong>NGA</strong></a> 一直保持更新。`,
}

$.githubLink = createGithubLink()
$.downloadButton = createDownloadButton()

window.onload = (async function () {
  // Get Data
  const json = await fetchData()
  Object.assign(_, json._)
  const table = renderTable(json.Data)
  // console.log(table);
  // Mount into DOM
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
