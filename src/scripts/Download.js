import html2canvas from 'html2canvas'

const isMobile = navigator.userAgentData ?
  navigator.userAgentData.mobile :
  navigator.userAgent.match(/\Mobile/i)

export default class Download {
  constructor (DOM) {
    this.node = DOM
    this.image = new Map()

    this.dataURL = async function (element) {
      this.image.set('scale', isMobile ? 1.0 : 1.25)
      this.image.set('type', isMobile ? 'image/jpeg' : 'image/png')
      this.image.set('quality', isMobile ? 0.92 : undefined)
      const options = { scale: this.image.get('scale') }
      const canvas = await html2canvas(element, options)
      const dataURL = canvas.toDataURL(
        this.image.get('type'),
        this.image.get('quality')
      )
      this.image.set('size', this.getSize(dataURL))
      for (const iterator of this.image) {
        localStorage.setItem(iterator[0], iterator[1])
      }
      localStorage.setItem('dataURL', dataURL)
      return dataURL
    }.bind(this)(this.node)
  }

  getSize = dataURL => (
    dataURL.length * 3.0 / 4.0 / Math.pow(2, 20)
  ).toFixed(2)
}
