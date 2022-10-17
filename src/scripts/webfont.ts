import WebFont from 'webfontloader'
import * as _ from '@/assets/config'
import data from '@/assets/data.json'

const SERIF_TEXT = _.THEADS.map(({ value }) => value).join('') + _.CAPTION_TITLE

const SANS_TEXT = Array.from(new Set(JSON.stringify(data) + _.TFOOT_COMMENTS))
  .concat(Object.values(_.SIGN))
  .join('')

WebFont.load({
  google: {
    families: ['Noto Sans SC:100,200,300,400,500,600,700,900'],
    text: SANS_TEXT,
  },
})

WebFont.load({
  google: {
    families: ['Noto Serif SC:100,200,300,400,500,600,700,900'],
    text: SERIF_TEXT,
  },
})

WebFont.load({
  google: {
    families: ['Poppins:100,200,300,400,500,600,700,800,900'],
  },
})
