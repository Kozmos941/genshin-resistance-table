import { derived, readable, writable, get } from "svelte/store";
import localforage from 'localforage'

export const title = readable(`原神抗性表 v${__APP_VERSION__}`)

export const scrollY = writable(0)

// Sider Visibility 
export const innerWidth = writable(0)
export const innerHeight = writable(0)
export const mainWidth = writable(0)

// Scroll To
export const tHeadHeight = writable(0)
export const tCellRace: Map<string, HTMLTableCellElement> = (new Map())

// image
export const image = writable({
  name: get(title),
  scale: 1.25,
  type: 'image/png',
  quality: 1,
  size: '…',
})
export const fileName = derived(image, $image =>
  `${$image.name}.${$image.type.split('/').at(-1)}`
)

// https://kit.svelte.dev/faq#how-do-i-use-a-client-side-only-library-that-depends-on-document-or-window

export const imageForage = localforage.createInstance({ name: 'image' })
