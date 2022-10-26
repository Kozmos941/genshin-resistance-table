import WebFont from 'webfontloader'
import { onMounted, unref } from 'vue'
import type { Ref } from 'vue'
import data from '@/data/table.json'
import * as _ from '$/config'

const SERIF_TEXT = textDeduplicate(''.concat(
  ..._.TABLE_HEADS.map(({ value }) => value),
  ..._.RACES.map(({ value }) => value),
  _.TABLE_CAPTION,
))

const SANS_TEXT = textDeduplicate(''.concat(
  JSON.stringify(data),
  SERIF_TEXT,
  ...Object.values(_.SIGN_REPLACE),
))

loadGoogleWebFont('Noto Serif SC', SERIF_TEXT)
loadGoogleWebFont('Poppins')
loadGoogleWebFont('Noto Sans SC', SANS_TEXT)

function textDeduplicate(text: string) {
  return Array.from(new Set(text)).join('')
}

function loadGoogleWebFont(font: string, text?: string) {
  const family = `${font}:100,200,300,400,500,600,700,900`
  WebFont.load({ google: { families: [family], text: text } })
}

export function loadWebFont(fontFamily: string, element?: HTMLElement | Ref<HTMLElement | undefined>) {
  onMounted(() => {
    const el = unref(element) as HTMLElement
    loadGoogleWebFont(fontFamily, textDeduplicate(el.innerText))
  })
}
