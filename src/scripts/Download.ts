import html2canvas from 'html2canvas'

type MapValue = string | number | boolean | undefined

export default class Download {
  node: HTMLElement
  image: Map<string, MapValue>
  dataURL: Promise<string>
  constructor(DOM: HTMLElement, mobile = false) {
    this.node = DOM
    this.image = new Map()
    this.image.set('scale', mobile ? 1.0 : 1.25)
    this.image.set('type', mobile ? 'image/jpeg' : 'image/png')
    this.image.set('quality', mobile ? 0.92 : undefined)
    this.dataURL = (async () => {
      const options = { scale: this.image.get('scale') as number }
      const canvas = await html2canvas(this.node, options)
      const dataURL = canvas.toDataURL(
        this.image.get('type') as string,
        this.image.get('quality'),
      )
      this.image.set('size', this.getSize(dataURL))
      this.image.set('dataURL', dataURL)
      return dataURL
    }).bind(this)()
  }

  getSize = (dataURL: string) =>
    ((dataURL.length * 3.0) / 4.0 / Math.pow(2, 20)).toFixed(2)
}
