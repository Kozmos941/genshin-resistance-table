import * as Config from './Config'
import data from '@/assets/data.json'
import WebFont from 'webfontloader'

const SERIF_TEXT = (Config.THeads
  .map(({ _, value }) => value)
  .join('') + Config.CaptionText
)

const SANS_TEXT = (
  Array.from(
    new Set(
      JSON.stringify(data)
      + Config.TFootComment
    )
  ).join('')
  + Config.InfinitySign
  + Config.AsteriskSign
)

WebFont.load({
  google: {
    families: [
      'Noto Sans SC:100,200,300,400,500,600,700,900',
    ],
    text: SANS_TEXT
  }
})

WebFont.load({
  google: {
    families: [
      'Noto Serif SC:100,200,300,400,500,600,700,900',
    ],
    text: SERIF_TEXT
  }
})

WebFont.load({
  google: {
    families: [
      'Poppins:100,200,300,400,500,600,700,800,900',
    ],
  }
})

