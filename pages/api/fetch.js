import { fetchData } from '../../lib/scrapbox'

export default async function handler(req, res) {
  const date = new Date()
  await fetchData(date)
  res.status(200).json({ status: 'done' })
}
