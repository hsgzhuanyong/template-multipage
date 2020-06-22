const path = require('path')
const fs = require('fs')

const pages = () => {
  const obj = {
    entrys: {}
  }
  const pageRootDirName = 'pages'
  const pageRoot = path.resolve(__dirname, '../src', pageRootDirName)
  fs.readdirSync(pageRoot).forEach(dir => {
    obj.entrys[dir] = path.join(pageRoot, dir, 'index.js')
  })
  return obj
}

exports.pages = pages
