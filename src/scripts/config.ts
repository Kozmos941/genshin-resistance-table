export const RACES = [
  '元素生命',
  '丘丘部落',
  '深渊',
  '愚人众',
  '其他人类势力',
  '异种魔兽',
  '自律机关',
  '值得铭记的强敌',
]

export const TABLE_HEADS = [
  { key: 'race', value: '种族', color: '' },
  { key: 'being', value: '生物', color: '' },
  { key: 'state', value: '状态', color: '' },
  { key: 'correspond', value: '对应', color: '' },
  { key: 'electro', value: '雷', color: '#ffacff' },
  { key: 'pyro', value: '火', color: '#ff9999' },
  { key: 'hydro', value: '水', color: '#80c0ff' },
  { key: 'cryo', value: '冰', color: '#5cffff' },
  { key: 'dendro', value: '草', color: '#13eea2' },
  { key: 'anemo', value: '风', color: '#80ffd7' },
  { key: 'geo', value: '岩', color: '#ffe699' },
  { key: 'physical', value: '物', color: '#cccccc' },
]

export const THEADS_LENGTH = TABLE_HEADS.length

export const SIGN_REPLACE = {
  INFINITY: '∞', //♾️∞ထ８ꝏꝎ
  ASTERISK: '✱',
  LINEFEED: '<br>',
}

export const TABLE_CAPTION = `原神抗性表 v${__APP_VERSION__}`

export const MAIN_WIDTH = 1120 + 'px'

/* Init Document */
/* Set Document Title */
document.title = TABLE_CAPTION

/* Set CSS element color variables */
const root = document.querySelector(':root') as HTMLElement
TABLE_HEADS.forEach(({ key, color }) => {
  if (color) root.style.setProperty(`--color-${key}`, color)
})

