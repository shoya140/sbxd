import { fetchAllData } from '../../../lib/scrapbox'

export default async function handler(req, res) {
  await fetchAllData()
  res.status(200).json({ status: 'done' })
}
