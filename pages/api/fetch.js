import { fetchData } from '../../lib/scrapbox'

export default async function handler(req, res) {
  const date = new Date()
  const dayDiff = 7

  for (const i of Array(dayDiff).keys()) {
    await fetchData(date)
    date.setDate(date.getDate() - 1)
    console.log('progress:', i + 1, '/', dayDiff)
  }

  res.status(200).json({ status: 'done' })
}
