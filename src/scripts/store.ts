import localforage from 'localforage'
import { reactive } from 'vue'
import { TABLE_CAPTION } from '$/config'

/* Is Mobile */
export const isMobile = navigator.userAgentData?.mobile ?? !!navigator.userAgent.match(/Mobile/i)

/* Image Information */
export const fileOptions = reactive({
  name: TABLE_CAPTION,
  size: '…',
  scale: isMobile ? 1.0 : 1.25,
  type: isMobile ? 'image/jpeg' : 'image/png',
  quality: isMobile ? 0.92 : undefined,
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
