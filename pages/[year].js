import Link from 'next/link'

import { getAllMonths, getAllYears, getContents } from '../lib/contents'

import { Layout } from '../components/layout'
import { Diary } from '../components/diary'

export default function Home({ contents, monthList }) {
  return (
    <Layout monthList={monthList}>
      {contents.map((content) => (
        <div key={content.date} className="diary">
          <Link
            href={`/${content.date.slice(0, 4)}/${content.date.slice(
              5,
              7
            )}#${content.date.slice(8)}`}
          >
            <a className="date-link">
              <h2>{content.date}</h2>
            </a>
          </Link>
          <Diary date={content.date} projects={content.projects} />
        </div>
      ))}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllYears()
  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const contents = getContents(`${params.year}-`)
  const monthList = getAllMonths().map((m) => m.params)
  return {
    props: {
      contents,
      monthList: monthList,
    },
  }
}
