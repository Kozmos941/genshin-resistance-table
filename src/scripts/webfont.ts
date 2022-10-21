import WebFont from 'webfontloader'
import * as _ from '$/config'
import data from '@/data/table.json'

const SERIF_TEXT = textDeduplicate(''.concat(
  ..._.THEADS.map(({ value }) => value),
  ..._.RACES.map(r => r),
  _.CAPTION_TITLE,
))

const SANS_TEXT = textDeduplicate(''.concat(
  JSON.stringify(data),
  ...Object.values(_.SIGN),
))

loadGoogleWebFont('Noto Serif SC', SERIF_TEXT)
loadGoogleWebFont('Poppins')
loadGoogleWebFont('Noto Sans SC', SANS_TEXT)

export function textDeduplicate(text: string) {
  return Array.from(new Set(text)).join('')
}

export function loadGoogleWebFont(font: string, text?: string) {
  const family = `${font}:100,200,300,400,500,600,700,900`
  WebFont.load({ google: { families: [family], text: text } })
}
