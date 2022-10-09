import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { parse } from '@progfay/scrapbox-parser'

const projectId = process.env.SBX_PROJECT_ID
  ? process.env.SBX_PROJECT_ID
  : 'villagepump'

const userId = process.env.SBX_USER_ID ? process.env.SBX_USER_ID : 'villagepump'

const fetchData = async (date) => {
  const dateString = date.toISOString().split('T')[0]
  const dateEncoded = dateString.replaceAll('-', '%2F')

  const data = (
    await axios.get(
      `https://scrapbox.io/api/pages/${projectId}/${dateEncoded}/text`
    )
  ).data

  var isMyDiary = false
  var diary = ''
  data.split('\n').forEach((text) => {
    if (isMyDiary) {
      if (text === '') {
        isMyDiary = false
      } else {
        diary += text + '\n'
      }
    } else {
      if (text.trim() === `[${userId}.icon]`) {
        isMyDiary = true
      }
    }
  })

  if (diary !== '') {
    fs.writeFileSync(
      path.join(process.cwd(), 'contents', `${dateString}.txt`),
      diary.trimEnd()
    )
  }
}

const fetchAllData = async () => {
  const date = new Date()
  const startDate = new Date(process.env.SBX_START_DATE)
  const dayDiff = Math.floor((date - startDate) / 86400000)

  const dir = path.join(process.cwd(), 'contents')
  fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`))

  for (const i of Array(dayDiff).keys()) {
    await fetchData(date)
    date.setDate(date.getDate() - 1)
    console.log('progress:', i, dayDiff)
  }
}

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

export { fetchData, fetchAllData, parseData, parseAllData }
