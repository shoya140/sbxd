const fs = require('fs')
const path = require('path')

const d = path.join(process.cwd(), 'contents')
fs.readdirSync(d).forEach((f) => {
  if (f.match(RegExp('\\.txt$'))) {
    fs.rmSync(path.join(d, f))
  }
})
