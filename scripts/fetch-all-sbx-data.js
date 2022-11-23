const cliProgress = require('cli-progress')

const utils = require('./utils')

const sbxConfig = require('../sbxd.config')

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d)
}

;(async () => {
  for (const { projectId, startDate, endDate } of sbxConfig.projects) {
    const d = new Date(endDate)
    const date = isValidDate(d) ? d : new Date()
    const sDate = new Date(startDate)
    const dayDiff = Math.floor((date - sDate) / 86400000)

    const bar = new cliProgress.SingleBar(
      {
        format: `Fetching ${projectId} {bar} {value}/{total} Pages | ETA: {eta}s`,
      },
      cliProgress.Presets.shades_classic
    )
    bar.start(dayDiff, 0)
    for (const i of Array(dayDiff).keys()) {
      await utils.fetchPage(date, projectId)
      date.setDate(date.getDate() - 1)
      bar.update(i + 1)
    }
    bar.stop()
    await utils.fetchFaviconUrl(projectId)
  }
})()
