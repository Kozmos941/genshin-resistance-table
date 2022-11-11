import html2canvas from 'html2canvas'
import type { Options as HOptions } from 'html2canvas'

interface DOptions {
  scale?: number,
  type?: string,
  quality?: number
}

export class Download {
  element: HTMLElement
  options: DOptions
  canvas: Promise<HTMLCanvasElement>
  dataURL: Promise<string>
  constructor(element: HTMLElement, options: DOptions = {}) {
    this.element = element
    this.options = Object.assign({
      scale: 1.0,
      type: 'image/jpeg',
      quality: 0.92,
    }, options)
    this.canvas = this.getCanvas({ scale: options.scale })
    this.dataURL = this.getDataURL(options.type, options.quality)
  }

  async getCanvas(options?: Partial<HOptions>) {
    return await html2canvas(this.element, options)
  }

  async getDataURL(type?: string | undefined, quality?: number) {
    const cavans = await this.canvas
    return cavans.toDataURL(type, quality)
  }
}

// https://javascript.info/event-delegation
export class SidebarEventDelegation {
  element: HTMLElement
  offset: number
  map: Map<string, HTMLElement>
  constructor(el: HTMLElement, offset = 0, nodeMap: Map<string, HTMLElement>) {
    this.element = el
    this.offset = offset
    this.map = nodeMap
    el.onmouseup = this.onClick.bind(this)
  }
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const div = event.target.closest('div') as HTMLDivElement
      const index = div.dataset.index as string
      switch (index) {
        case 'TOP': {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          break
        }
        case 'BOTTOM': {
          const bottom = document.body.scrollHeight - window.innerHeight
          window.scrollTo({ top: bottom, behavior: 'smooth' })
          break
        }
        default: {
          const td = this.map.get(index) as HTMLTableCellElement
          this.scrollIntoViewOffset(td, this.offset)
          break
        }
      }
    }
  }
  scrollIntoViewOffset(element: Element, offset = 0) {
    const { top: elementTop } = element.getBoundingClientRect()
    const top = Math.round(elementTop + window.scrollY - offset)
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
