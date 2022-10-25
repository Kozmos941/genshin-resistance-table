import html2canvas from 'html2canvas'
import { Options as HOptions } from 'html2canvas'

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
  list: NodeListOf<HTMLElement>
  constructor(el: HTMLElement, headOffset = 0, nodeList: NodeListOf<HTMLElement>) {
    this.element = el
    this.offset = headOffset
    this.list = nodeList
    el.onclick = this.onClick.bind(this)
  }
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const div = event.target.closest('div') as HTMLDivElement
      const index = div.dataset.index
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
          const td = this.list[Number(index)] as HTMLTableCellElement
          this.scrollIntoViewOffset(td)
          break
        }
      }
    }
  }
  scrollIntoViewOffset(element: Element) {
    const { top: elementTop } = element.getBoundingClientRect()
    const top = elementTop + window.scrollY - this.offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
