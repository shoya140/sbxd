import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { getAllMonths, getContents } from '../lib/contents'

import { Layout } from '../components/layout'
import { Scrapbox } from '../components/scrapbox'

export default function Home({ contents, year, month, monthList }) {
  const router = useRouter()

  useEffect(() => {
    router.push(`/${year}/${month}`, undefined, { shallow: true })
  }, [])

  return (
    <Layout year={year} month={month} monthList={monthList}>
      {contents.map((content) => (
        <div key={content.date} id={content.date.slice(8)} className="diary">
          <a href={`#${content.date.slice(8)}`} className="date-link">
            <h2>{content.date}</h2>
          </a>
          {content.diary.map((line, lineIndex) => (
            <p
              key={`line-${lineIndex}`}
              className={`sbx-p indent-${line.indent}`}
            >
              {line.nodes.map((node, nodeIndex) => (
                <Scrapbox key={`node-${lineIndex}-${nodeIndex}`} node={node} />
              ))}
            </p>
          ))}
        </div>
      ))}
    </Layout>
  )
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
