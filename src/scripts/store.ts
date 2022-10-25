import localforage from 'localforage'
import { defineStore } from 'pinia'
import { TABLE_CAPTION } from '$/config'

/* Is Mobile */
export const isMobile = navigator.userAgentData?.mobile ?? !!navigator.userAgent.match(/Mobile/i)

export const usePiniaStore = defineStore('pinia', {
  state: () => ({
    count: 0,
    name: TABLE_CAPTION,
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
