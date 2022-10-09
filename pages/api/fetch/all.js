import { fetchData, deleteAllData } from '../../../lib/scrapbox'

export default async function handler(req, res) {
  deleteAllData()

  const date = new Date()
  const startDate = new Date(process.env.SBX_START_DATE)
  const dayDiff = Math.floor((date - startDate) / 86400000)

  for (const i of Array(dayDiff).keys()) {
    await fetchData(date)
    date.setDate(date.getDate() - 1)
    console.log('progress:', i + 1, '/', dayDiff)
  }

  res.status(200).json({ status: 'done' })
}
