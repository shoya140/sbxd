import Link from 'next/link'

import { getAllMonths, getAllYears, getContents } from '../lib/contents'

import { Layout } from '../components/layout'
import { Scrapbox } from '../components/scrapbox'

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
          {content.diary.map((line, lineIndex) => (
            <div
              key={`line-${lineIndex}`}
              className={`sbx-line indent-${line.indent}`}
            >
              {line.nodes.map((node, nodeIndex) => (
                <Scrapbox key={`node-${lineIndex}-${nodeIndex}`} node={node} />
              ))}
            </div>
          ))}
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
