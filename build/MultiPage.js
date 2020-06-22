const path = require('path')
const fs = require('fs')

export class MultiPage {
  constructor() {
    this.entrys = []
    this.init()
  }
  init() {
    this.getEntrys()
    console.log(this.entrys)
  }
  getEntrys() {
    const pageRootDirName = 'pages'
    const pageRoot = path.resolve(__dirname, '../src', pageRootDirName)
    fs.readdirSync(pageRoot).forEach(dir => {
      this.entrys.entrys[dir] = path.join(pageRoot, dir, 'index.js')
    })
  }
}
