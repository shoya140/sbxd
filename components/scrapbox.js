export function Scrapbox({ projectId, node, nImages }) {
  switch (node.type) {
    case 'plain':
      return <span>{node.text}</span>
    case 'image':
      return (
        <a href={node.src} target="_blank" rel="noopener noreferrer">
          <img className={`sbx-image sbx-image-${nImages}`} src={node.src} />
        </a>
      )
    case 'link':
      switch (node.pathType) {
        case 'relative':
          return (
            <a
              className="sbx-link"
              href={`https://scrapbox.io/${projectId}/${node.href}`}
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
          const youtubeMatch = node.href.match(
            RegExp('^https://www.youtube.com/watch\\?v=([a-zA-Z0-9_-]+)$')
          )
          if (node.content === '' && youtubeMatch) {
            const youtubeKey = youtubeMatch[1]
            return (
              <div className="sbx-youtube-container">
                <iframe
                  className="sbx-youtube-iframe"
                  width="560"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeKey}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          }
          const audioMatch = node.href.match(RegExp('\\.mp3$'))
          if (node.content === '' && audioMatch) {
            return <audio controls className="sbx-audio" src={node.href} />
          }
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
          href={`https://scrapbox.io/${projectId}/${node.href}`}
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
              href={`https://scrapbox.io/${projectId}/${node.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="sbx-icon"
                src={`https://scrapbox.io/api/pages/${projectId}/${node.path}/icon`}
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
      const nis = node.nodes.filter((node) => node.type === 'image').length
      return (
        <span className="sbx-quote">
          {node.nodes.map((node) => (
            <Scrapbox key={`node-${Math.random()}`} node={node} nImages={nis} />
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
