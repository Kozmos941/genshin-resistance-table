const $ = document
const TEXT = {
  THS: [
    { key: 'race', value: '种族' },
    { key: 'monster', value: '怪物' },
    { key: 'state', value: '状态' },
    { key: 'correspond', value: '对应' },
    { key: 'electro', value: '雷' },
    { key: 'pyro', value: '火' },
    { key: 'hydro', value: '水' },
    { key: 'cryo', value: '冰' },
    { key: 'dendro', value: '草' },
    { key: 'anemo', value: '风' },
    { key: 'geo', value: '岩' },
    { key: 'physical', value: '物' },
  ],
  INFINITY: '♾️', //♾️∞
  CAPTION: '原神怪物抗性表 v2.6',
  TFOOT: `
    * 来自【空萤酒馆】，初版由巴别塔夜空提供，由 whrily、小明明、羽川raid 完善、修正，最后由 NGA 吾竟南宫遥保持更新。<br>
    * 现版又经更新、重制、并会在 <strong>米游社</strong> 和 
    <a href="https://bbs.nga.cn/read.php?tid=29649225" target="_blank"><strong>NGA</strong></a> 一直保持更新。`
}

renderTable().then(table => {
  $.querySelector('#download')
    .addEventListener("click", function () {
      html2canvas(table, { scale: scale() })
        .then(function (canvas) {
          saveAs(canvas.toDataURL(), TEXT.CAPTION + '.png');
        })
    })
})

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

const scale = (function () {
  let scale = 1
  return function (num) {
    if (0 < num && num < 5) {
      scale = num
    }
    console.log('scale = ' + scale);
    return scale
  }
})()
