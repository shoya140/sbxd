const fs = require('fs')
const path = require('path')
const axios = require('axios')

const sbxConfig = require('../sbxd.config')

const fetchData = async (date, projectId) => {
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

module.exports = {
  fetchData: fetchData,
}
