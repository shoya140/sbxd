const fs = require('fs')
const path = require('path')
const axios = require('axios')

const sbxConfig = require('../sbxd.config')

const fetchData = async (date) => {
  const dateString = date.toISOString().split('T')[0]
  const dateEncoded = dateString.replaceAll('-', '%2F')

  const data = (
    await axios.get(
      `https://scrapbox.io/api/pages/${sbxConfig.projectId}/${dateEncoded}/text`
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
      if (text.trim() === `[${sbxConfig.userId}.icon]`) {
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

module.exports = {
  fetchData: fetchData,
}
