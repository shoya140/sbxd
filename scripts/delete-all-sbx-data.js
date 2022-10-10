const fs = require('fs')
const path = require('path')

const d = path.join(process.cwd(), 'contents')
fs.readdirSync(d).forEach((f) => {
  if (f !== '.gitkeep') {
    fs.rmSync(path.join(d, f))
  }
})
