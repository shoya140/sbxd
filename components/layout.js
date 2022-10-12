import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import sbxdConfig from '../sbxd.config'

export function Layout({ children, year, month, monthList }) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{`${sbxdConfig.title}${
          router.asPath !== '/' && year && month ? ` ${year}-${month}` : ''
        }`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="content">{children}</div>
        <div className="navigation">
          <Link href="/">
            <a className="brand-link">{sbxdConfig.title}</a>
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
      </div>
    </div>
  )
}
