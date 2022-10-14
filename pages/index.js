import Link from 'next/link'

import { getAllMonths, getContents } from '../lib/contents'

import { Layout } from '../components/layout'
import { Scrapbox } from '../components/scrapbox'

export default function Home({ contents, year, month, monthList }) {
  return (
    <Layout year={year} month={month} monthList={monthList}>
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

export function getStaticProps() {
  const allContents = getContents()
  const yearMonth =
    allContents.length > 0 ? allContents[0].date.slice(0, 7) : 'none'
  const contents = allContents.filter((c) =>
    c.date.match(RegExp('^' + yearMonth))
  )
  const monthList = getAllMonths().map((m) => m.params)
  return {
    props: {
      contents,
      year: contents.length > 0 ? contents[0].date.slice(0, 4) : null,
      month: contents.length > 0 ? contents[0].date.slice(5, 7) : null,
      monthList: contents.length > 0 ? monthList : [],
    },
  }
}
