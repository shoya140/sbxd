import sbxdConfig from '../sbxd.config'

export function Scrapbox({ node }) {
  switch (node.type) {
    case 'plain':
      return <span>{node.text}</span>
    case 'image':
      return (
        <a href={node.src} target="_blank" rel="noopener noreferrer">
          <img className="sbx-image" src={node.src} />
        </a>
      )
    case 'link':
      switch (node.pathType) {
        case 'relative':
          return (
            <a
              className="sbx-link"
              href={`https://scrapbox.io/${sbxdConfig.projectId}/${node.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node.href}
            </a>
          )
        case 'root':
          return (
            <a
              href={`https://scrapbox.io${node.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node.href}
            </a>
          )
        case 'absolute':
          return (
            <a href={node.href} target="_blank" rel="noopener noreferrer">
              {node.content ? node.content : node.raw}
            </a>
          )
        default:
          return <span>unknown</span>
      }
    case 'hashTag':
      return (
        <a
          href={`https://scrapbox.io/${sbxdConfig.projectId}/${node.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.raw}
        </a>
      )
    case 'icon':
      switch (node.pathType) {
        case 'relative':
          return (
            <a
              href={`https://scrapbox.io/${sbxdConfig.projectId}/${node.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="sbx-icon"
                src={`https://scrapbox.io/api/pages/${sbxdConfig.projectId}/${node.path}/icon`}
              />
            </a>
          )
        case 'root':
          return (
            <img
              className="sbx-icon"
              src={`https://scrapbox.io/api/pages${node.path}/icon`}
            />
          )
        default:
          return <span>unknown</span>
      }
    case 'code':
      return <code className="sbx-code">{node.text}</code>
    case 'quote':
      return (
        <span className="sbx-quote">
          {node.nodes.map((node) => (
            <Scrapbox key={`node-${Math.random()}`} node={node} />
          ))}
        </span>
      )
    case 'decoration':
      return <span>{node.raw}</span>
    default:
      console.log('unknown node:', node)
      return <span>unknown</span>
  }
}
