import localforage from 'localforage'
import { defineStore } from 'pinia'

/* Is Mobile */
export const isMobile = navigator.userAgentData?.mobile ?? !!navigator.userAgent.match(/Mobile/i)

export const useImageStore = defineStore('image', {
  state: () => ({
    name: usePiniaStore().TABLE_CAPTION,
    size: '…',
    scale: isMobile ? 1 : 1.25,
    type: isMobile ? 'image/jpeg' : 'image/png',
    quality: isMobile ? 0.92 : undefined,
  }),
  getters: {
    fileName: (state) => {
      const ext = state.type.split('/').at(-1)
      return `${state.name}.${ext}`
    },
  },
})

export const usePiniaStore = defineStore('pinia', {
  state: () => ({
    scrollY: 0,
    table: null as HTMLTableElement | null,
    button: null as HTMLButtonElement | null,
    tCellRaces: new Map<string, HTMLTableCellElement>(),
  }),
  getters: {
    TABLE: state => state.table as HTMLTableElement,
    TABLE_CAPTION: () => `原神抗性表 v${__APP_VERSION__}`,
    TABLE_WIDTH() {
      const table = this.TABLE as HTMLTableElement
      return table.offsetWidth as number
    },
    THEAD_HEIGHT() {
      const tHead = this.TABLE.tHead as HTMLTableSectionElement
      return tHead.offsetHeight as number
    },
  },
})

/* Image Localforage */
export const imageForage = localforage.createInstance({
  name: 'image',
})

if (localStorage.getItem('LastUpdate') !== __LAST_UPDATE__) {
  localStorage.clear()
  sessionStorage.clear()
  imageForage.clear()
  localStorage.setItem('LastUpdate', __LAST_UPDATE__)
}

