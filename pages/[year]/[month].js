import { getAllMonths, getContents } from '../../lib/contents'

import { Layout } from '../../components/layout'
import { Diary } from '../../components/diary'

export default function Home({ contents, year, month, monthList }) {
  return (
    <Layout year={year} month={month} monthList={monthList}>
      {contents.map((content) => (
        <div key={content.date} id={content.date.slice(8)} className="diary">
          <a href={`#${content.date.slice(8)}`} className="date-link">
            <h2>{content.date}</h2>
          </a>
          {content.projects.map(({ projectId, diary }, index) => (
            <div key={`diary-${content.date}-${projectId}`}>
              <Diary
                key={`diary-${content.date}-${projectId}`}
                projectId={projectId}
                diary={diary}
              />
              {index !== content.projects.length - 1 && <hr />}
            </div>
          ))}
        </div>
      ))}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllMonths()
  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const contents = getContents(`${params.year}-${params.month}`)
  const monthList = getAllMonths().map((m) => m.params)
  return {
    props: {
      contents,
      year: params.year,
      month: params.month,
      monthList: monthList,
    },
  }
}
