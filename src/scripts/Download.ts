import html2canvas from 'html2canvas'
import { Options as HOptions } from 'html2canvas'

interface DOptions {
  scale?: number,
  type?: string,
  quality?: number
}

export default class Download {
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
