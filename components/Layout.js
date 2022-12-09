import Head from 'next/head'
import { NextSeo } from 'next-seo'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="author" content="xx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo title="xblog"
        description="this is xx's blog"
        canonical="https://www.xxblog.com/"
      />

      <main style={{ height: '100%' }}>{children}</main>
    </>
  )
}
