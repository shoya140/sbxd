import { parseAllData } from '../lib/scrapbox'

import { Layout } from '../components/layout'

const projectId = process.env.SBX_PROJECT_ID
  ? process.env.SBX_PROJECT_ID
  : 'villagepump'

const sb = (node, lineIndex, nodeIndex) => {
  switch (node.type) {
    case 'plain':
      return <span key={`node-${lineIndex}-${nodeIndex}`}>{node.text}</span>
    case 'image':
      return (
        <img
          key={`node-${lineIndex}-${nodeIndex}`}
          className="sbx-image"
          src={node.src}
        />
      )
    case 'link':
      switch (node.pathType) {
        case 'relative':
          return (
            <a
              key={`node-${lineIndex}-${nodeIndex}`}
              className="sbx-link"
              href={`https://scrapbox.io/${projectId}/${node.href}`}
            >
              {node.href}
            </a>
          )
        case 'root':
          return (
            <a
              key={`node-${lineIndex}-${nodeIndex}`}
              href={`https://scrapbox.io${node.href}`}
            >
              {node.href}
            </a>
          )
        case 'absolute':
          return (
            <a key={`node-${lineIndex}-${nodeIndex}`} href={node.href}>
              {node.content ? node.content : node.raw}
            </a>
          )
        default:
          return (
            <a key={`node-${lineIndex}-${nodeIndex}`} href="">
              {node.href}
            </a>
          )
      }
    case 'hashTag':
      return (
        <a
          key={`node-${lineIndex}-${nodeIndex}`}
          href={`https://scrapbox.io/${projectId}/${node.href}`}
        >
          {node.raw}
        </a>
      )
    case 'icon':
      switch (node.pathType) {
        case 'root':
          return (
            <img
              key={`node-${lineIndex}-${nodeIndex}`}
              className="sbx-icon"
              src={`https://scrapbox.io/api/pages${node.path}/icon`}
            />
          )
        default:
          return (
            <img
              key={`node-${lineIndex}-${nodeIndex}`}
              className="sbx-icon"
              src={`https://scrapbox.io/api/pages/${projectId}/${node.path}/icon`}
            />
          )
      }
    case 'code':
      return (
        <code key={`node-${lineIndex}-${nodeIndex}`} className="sbx-code">
          {node.text}
        </code>
      )
    case 'quote':
      return (
        <span key={`node-${lineIndex}-${nodeIndex}`} className="sbx-quote">
          {node.nodes.map((node) =>
            sb(node, lineIndex, nodeIndex + '' + Math.random())
          )}
        </span>
      )
    case 'decoration':
      return <span key={`node-${lineIndex}-${nodeIndex}`}>{node.raw}</span>
    default:
      console.log('unknown node:', node)
      return <span key={`node-${lineIndex}-${nodeIndex}`}>unknown</span>
  }
}

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
              {line.nodes.map((node, nodeIndex) =>
                sb(node, lineIndex, nodeIndex)
              )}
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
