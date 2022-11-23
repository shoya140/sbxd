const cliProgress = require('cli-progress')

const utils = require('./utils')

const sbxConfig = require('../sbxd.config')

;(async () => {
  for (const { projectId } of sbxConfig.projects) {
    const date = new Date()
    const dayDiff = 3

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
