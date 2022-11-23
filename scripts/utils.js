const fs = require('fs')
const path = require('path')
const axios = require('axios')

const sbxConfig = require('../sbxd.config')

const fetchPage = async (date, projectId) => {
  const dateString = date.toISOString().split('T')[0]
  const dateEncoded = dateString.replaceAll('-', '%2F')

  var data = ''
  try {
    data = (
      await axios.get(
        `https://scrapbox.io/api/pages/${projectId}/${dateEncoded}/text`
      )
    ).data
  } catch (error) {}

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
      if (text.trim() === `[${sbxConfig.userId}.icon]`) {
        isMyDiary = true
      }
    }
  })

  if (diary !== '') {
    fs.writeFileSync(
      path.join(process.cwd(), 'contents', `${projectId}__${dateString}.txt`),
      diary.trimEnd()
    )
  }
}

const fetchFaviconUrl = async (projectId) => {
  var faviconUrl = 'https://i.gyazo.com/5f93e65a3b979ae5333aca4f32600611.png'
  try {
    const res = await axios.get(
      `https://scrapbox.io/api/projects/${projectId}/`
    )
    if (res.data.image) {
      faviconUrl = res.data.image
    }
  } catch (error) {}
  fs.writeFileSync(
    path.join(process.cwd(), 'contents', `${projectId}_favicon_url.txt`),
    faviconUrl
  )
}

module.exports = {
  fetchPage: fetchPage,
  fetchFaviconUrl: fetchFaviconUrl,
}
