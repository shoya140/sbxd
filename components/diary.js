import { Scrapbox } from '../components/scrapbox'

export function Diary({ projectId, diary }) {
  return diary.map((line, lineIndex) => {
    const nImages = line.nodes
      ? line.nodes.filter((node) => node.type === 'image').length
      : 0
    return (
      <div
        key={`line-${lineIndex}`}
        className={`sbx-line indent-${line.indent}`}
      >
        {line.nodes &&
          line.nodes.map((node, nodeIndex) => (
            <Scrapbox
              key={`node-${lineIndex}-${nodeIndex}`}
              projectId={projectId}
              node={node}
              nImages={nImages}
            />
          ))}
        {line.content && <pre className="sbx-pre">{line.content}</pre>}
      </div>
    )
  })
}
