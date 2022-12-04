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
  const fileNames = getAllFileNames()

  const resDict = {}
  for (const fileName of fileNames) {
    const match = fileName.match(RegExp('(\\S+)__' + query + '.+\\.txt$'))
    if (match) {
      resDict[path.parse(fileName).name.slice(-10)] = { projects: [] }
    }
  }

  for (const fileName of fileNames) {
    const match = fileName.match(RegExp('(\\S+)__' + query + '.+\\.txt$'))
    if (match) {
      const d = fs.readFileSync(
        path.join(process.cwd(), 'contents', fileName),
        'utf8'
      )
      const diary = parse(d, { hasTitle: false })
      const date = path.parse(fileName).name.slice(-10)

      const faviconUrl = fs.readFileSync(
        path.join(process.cwd(), 'contents', `${match[1]}_favicon_url.txt`),
        'utf8'
      )

      resDict[date].projects.push({
        projectId: match[1],
        diary: diary,
        faviconUrl: faviconUrl,
      })
    }
  }

  return Object.keys(resDict)
    .map((key) => {
      return {
        date: key,
        projects: resDict[key].projects,
      }
    })
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

const getAllYears = () => {
  const ids = {}
  const fileNames = getAllFileNames()
  for (const fileName of fileNames) {
    const match = fileName.match(
      RegExp('\\S+(\\d{4})-(\\d{2})-(\\d{2})\\.txt$')
    )
    if (match) {
      ids[match[1]] = 1
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

const getAllMonths = () => {
  const ids = {}
  const fileNames = getAllFileNames()
  for (const fileName of fileNames) {
    const match = fileName.match(
      RegExp('\\S+(\\d{4})-(\\d{2})-(\\d{2})\\.txt$')
    )
    if (match) {
      ids[match[1] + '-' + match[2]] = 1
    }
  }
  return Object.keys(ids)
    .map((id) => ({
      params: {
        year: id.slice(0, 4),
        month: id.slice(5, 7),
      },
    }))
    .sort((a, b) => {
      if (
        `${a.params.year}-${a.params.month}` <
        `${b.params.year}-${b.params.month}`
      ) {
        return 1
      } else {
        return -1
      }
    })
}

export { getContents, getAllYears, getAllMonths }
