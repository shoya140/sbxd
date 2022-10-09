import Head from 'next/head'

export function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>@shoya140 - scrapbox-diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">{children}</div>
    </div>
  )
}
