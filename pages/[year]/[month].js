import { getAllMonth, getContents } from '../../lib/contents'

import { Layout } from '../../components/layout'
import { Scrapbox } from '../../components/scrapbox'

export default function Home({ contents }) {
  return (
    <Layout>
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

export async function getStaticPaths() {
  const paths = getAllMonth()
  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const contents = getContents(`${params.year}-${params.month}`)
  return {
    props: {
      contents,
    },
  }
}
