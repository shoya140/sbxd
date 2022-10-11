import { parseAllData } from '../lib/contents'

import { Layout } from '../components/layout'
import { Scrapbox } from '../components/scrapbox'

export default function Home({ allData }) {
  return (
    <Layout>
      {allData.map((postData) => (
        <div key={postData.date} className="diary">
          <h2>{postData.date}</h2>
          {postData.content.map((line, lineIndex) => (
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
  const allData = parseAllData()
  return {
    props: {
      allData,
    },
  }
}
