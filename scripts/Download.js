class Download {
  constructor (table, opts = {}) {
    this.table = table
    this.scale = _.isMobile ? 1.0 : 1.25
    this.blob = this.getBlob(table, opts)
  }

  async getBlob(table, opts) {
    const options = Object.assign({
      scale: this.scale
      // width: table.offsetWidth
    }, opts);
    return html2canvas(table, options).then(
      async canvas => new Promise(blob => canvas.toBlob(blob))
    )
  }

  async setSize() {
    const blob = await this.blob
    const size = await `${(blob.size / Math.pow(2, 20)).toFixed(2)} MB`
    $.downloadButton.lastChild.innerText = size
  }

  async setScale(arg = this.scale) {
    const isValidNumber = !isNaN(arg) &&
      arg !== this.scale && arg <= 5 && 0 < arg
    if (isValidNumber) {
      $.downloadButton.lastChild.innerText = '… MB'
      this.scale = arg
      this.blob = await this.getBlob(this.table)
      this.setSize()
    } else {
      console.log('Please input number between 0-5');
    }
  }

  screenShot() {
    // https://stackoverflow.com/questions/67804382/force-showing-the-save-as-dialog-box-when-downloading-a-file
    const blob = localStorage.getItem('scale') === this.scale ?
      localStorage.getItem('blob') :
      URL.createObjectURL(this.blob)
    const saveImg = $.createElement("a");
    saveImg.href = blob
    saveImg.download = _.Caption + ".jpg";
    saveImg.click();
  }
}
