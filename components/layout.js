import Head from 'next/head'
import Link from 'next/link'

export function Layout({ children, year, month, monthList }) {
  return (
    <div>
      <Head>
        <title>@shoya140 - scrapbox-diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <dic className="container">
        <div className="navigation">
          <Link href="/">
            <a className="brand-link">井戸端日記帳</a>
          </Link>
          {monthList &&
            monthList.map((m) => (
              <Link
                key={`navigation-${m.year}/${m.month}`}
                href={`/${m.year}/${m.month}`}
              >
                <a
                  className={`navigation-link ${
                    m.year === year && m.month === month
                      ? 'navigation-link-active'
                      : ''
                  }`}
                >{`${m.year}-${m.month}`}</a>
              </Link>
            ))}
        </div>
        <div className="content">{children}</div>
      </dic>
    </div>
  )
}
