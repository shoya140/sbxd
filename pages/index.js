import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { getAllMonths, getContents } from '../lib/contents'

import { Layout } from '../components/layout'

export default function Home({ contents, year, month, monthList }) {
  const router = useRouter()

  useEffect(() => {
    router.push(`/${year}/${month}`, undefined, { shallow: true })
  }, [])

  return <Layout monthList={monthList} />
}

export function getStaticProps() {
  const contents = getContents()
  const monthList = getAllMonths().map((m) => m.params)
  return {
    props: {
      contents,
      year: contents.length > 0 ? contents[0].date.slice(0, 4) : 2022,
      month: contents.length > 0 ? contents[0].date.slice(5, 7) : 10,
      monthList: contents.length > 0 ? monthList : [],
    },
  }
}
