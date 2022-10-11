import path from 'path'
import fs from 'fs'
import { parse } from '@progfay/scrapbox-parser'

const getAllFileNames = () => {
  return fs.readdirSync(path.join(process.cwd(), 'contents')).sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

const getContents = (query = '') => {
  const res = []
  const fileNames = getAllFileNames()
  for (const fileName of fileNames) {
    if (fileName.match(RegExp('^' + query + '.+\\.txt$'))) {
      const d = fs.readFileSync(
        path.join(process.cwd(), 'contents', fileName),
        'utf8'
      )
      const diary = parse(d, { hasTitle: false })
      res.push({
        date: path.parse(fileName).name,
        diary: diary,
      })
    }
  }
  return res
}

const getAllYear = () => {
  const ids = {}
  const fileNames = getAllFileNames()
  for (const fileName of fileNames) {
    if (fileName.match(RegExp('\\d{4}-\\d{2}-\\d{2}\\.txt$'))) {
      ids[fileName.slice(0, 4)] = 1
    }
  }
  return Object.keys(ids).map((id) => {
    return {
      params: {
        year: id,
      },
    }
  })
}

const getAllMonth = () => {
  const ids = {}
  const fileNames = getAllFileNames()
  for (const fileName of fileNames) {
    if (fileName.match(RegExp('\\d{4}-\\d{2}-\\d{2}\\.txt$'))) {
      ids[fileName.slice(0, 7)] = 1
    }
  }
  return Object.keys(ids).map((id) => {
    return {
      params: {
        year: id.slice(0, 4),
        month: id.slice(5, 7),
      },
    }
  })
}

export { getContents, getAllYear, getAllMonth }
