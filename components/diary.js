import { Scrapbox } from '../components/scrapbox'

export function Diary({ date, projects }) {
  return projects.map(({ projectId, diary, faviconUrl }, index) => (
    <div key={`diary-${date}-${projectId}`}>
      <div className="sbx-favicon-container">
        <a
          href={`https://scrapbox.io/${projectId}/${date.replaceAll(
            '-',
            '%2F'
          )}`}
        />
        <img className="sbx-favicon" src={faviconUrl} />
      </div>
      {diary.map((line, lineIndex) => {
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
            {line.content && line.type === 'codeBlock' && (
              <div className="sbx-pre">
                <span className="sbx-file-name">{line.fileName}</span>
                <pre>{line.content}</pre>
              </div>
            )}
          </div>
        )
      })}
      {index !== projects.length - 1 && <hr />}
    </div>
  ))
}
