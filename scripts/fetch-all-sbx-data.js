const cliProgress = require('cli-progress')

const utils = require('./utils')

const sbxConfig = require('../sbxd.config')

;(async () => {
  const date = new Date()
  const startDate = new Date(sbxConfig.startDate)
  const dayDiff = Math.floor((date - startDate) / 86400000)

  const bar = new cliProgress.SingleBar(
    {
      format: 'Fetching Scrapbox {bar} {value}/{total} Pages | ETA: {eta}s',
    },
    cliProgress.Presets.shades_classic
  )
  bar.start(dayDiff, 0)
  for (const i of Array(dayDiff).keys()) {
    await utils.fetchData(date)
    date.setDate(date.getDate() - 1)
    bar.update(i + 1)
  }
  bar.stop()
})()
