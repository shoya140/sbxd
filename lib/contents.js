import path from 'path'
import fs from 'fs'
import { parse } from '@progfay/scrapbox-parser'

const parseData = (date) => {
  const diary = fs.readFileSync(
    path.join(process.cwd(), 'contents', `${date}.txt`),
    'utf8'
  )
  return parse(diary, { hasTitle: false })
}

const parseAllData = () => {
  const res = []
  const fileNames = fs
    .readdirSync(path.join(process.cwd(), 'contents'))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  for (const fileName of fileNames) {
    const pattern = fileName.match(RegExp('.txt$'))
    if (pattern) {
      const d = parseData(path.parse(fileName).name)
      res.push({
        date: path.parse(fileName).name,
        content: d,
      })
    }
  }
  return res
}

export { parseData, parseAllData }
