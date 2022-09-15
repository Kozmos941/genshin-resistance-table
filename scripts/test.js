// (async function (d) {
//   WebFontConfig = {
//     google: {
//       families: [
//         'Noto Sans SC:200,300,400,500,600,700,900',
//         'Noto Serif SC:200,300,400,500,600,700,900',
//       ]
//     }
//   };
//   const text = await fetch('../data/TEXT').then(r => r.text())
//   let url = WebFontConfig.google.families.reduce((a, c) => {
//     const _ = (family) => {
//       const fontFamily = family.split(':')[0].split(' ').join('+')
//       const fontWeight = family.split(':')[1].split(',').join(';')
//       return (`family=${fontFamily}:wght@${fontWeight}&`);
//     }
//     return a + _(c)
//   }, 'https://fonts.googleapis.com/css2?') + `display=swap&text=${text}`
//   const wf = d.createElement('link')
//   wf.rel = 'stylesheet'
//   wf.href = url
//   d.head.appendChild(wf)
// })(document);
