import { ref, computed, onMounted, onBeforeUpdate } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from 'lodash'
import { TABLE_HEADS } from '$/config'

export const usePiniaStore = defineStore('pinia', () => {
  /* Constant */
  const TABLE_CAPTION = `${document.title} v${__APP_VERSION__}`
  /* States */
  const scrollY = ref(window.scrollY)
  const innerWidth = ref(window.innerWidth)
  const innerHeight = ref(window.innerHeight)
  const tableWidth = ref(window.innerWidth)
  const aside = ref<HTMLElement>()
  const sideVisibility = ref(false)
  const table = ref<HTMLTableElement>()
  const button = ref<HTMLButtonElement>()
  const tCellRaces = ref<Map<string, HTMLTableCellElement>>(new Map())
  /* Getters */
  const TABLE = computed(() => table.value as HTMLTableElement)
  const THEAD_HEIGHT = computed(() => {
    const tHead = TABLE.value.tHead as HTMLTableSectionElement
    return tHead.offsetHeight as number
  })
  /* Set Document Title */
  document.title = TABLE_CAPTION
  /* Set CSS element color variables */
  TABLE_HEADS.filter(({ color }) => color)
    .forEach(({ key, color }) => document.documentElement.style.setProperty(`--color-${key}`, color))
  /* Set tableWidth */
  onMounted(() => {
    new ResizeObserver(([entry]) => {
      tableWidth.value = Math.ceil(entry.contentRect.width)
    }).observe(table.value as HTMLTableElement)
  })
  /* Set innerWidth & innerHeight */
  window.addEventListener('resize', debounce(() => {
    innerWidth.value = window.innerWidth
    innerHeight.value = window.innerHeight
  }, 20, { 'leading': false, 'trailing': true }))
  /* Set scrollY */
  window.addEventListener('scroll', debounce(() => {
    scrollY.value = Math.floor(window.scrollY)
  }, 200, { 'leading': false, 'trailing': true }))
  /* Set Side Visibility */
  let side: HTMLElement
  let lineHeight: number
  onMounted(() => {
    side = aside.value as HTMLElement
    lineHeight = Number(getComputedStyle(side).lineHeight.match(/\d+/g))
  })
  onBeforeUpdate(() => {
    const isLandscape = innerWidth.value > innerHeight.value
    const isEnoughWidth = innerWidth.value > tableWidth.value + side.offsetWidth * 2
    const isEnoughHeight = innerHeight.value > side.innerText.length * (lineHeight + 4)
    sideVisibility.value = isLandscape && isEnoughWidth && isEnoughHeight
  })
  /* Expose */
  return {
    TABLE_CAPTION,
    scrollY, innerWidth, innerHeight, tableWidth,
    aside, sideVisibility, table, button, tCellRaces,
    TABLE, THEAD_HEIGHT,
  }
})
