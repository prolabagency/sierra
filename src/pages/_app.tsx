import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head >
        <title>Sierra</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon512_rounded.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#262a2b" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#00000"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>
        <meta name="author" content="Prolab Agency"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="twitter:card" content="summary" />
        {/* <meta name="twitter:url" content="https://yourdomain.com" /> */}
        <meta name="twitter:title" content="Sierra" />
        <meta name="twitter:description" content="Sierra" />
        <meta name="twitter:image" content="/icon512_rounded.png" />
        <meta name="twitter:creator" content="@ProlabAgency" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sierra" />
        <meta property="og:description" content="Sierra" />
        <meta property="og:site_name" content="Sierra" />
        {/* <meta property="og:url" content="https://yourdomain.com" /> */}
        <meta property="og:image" content="/icon512_rounded.png" />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/favicon/preloader.webp"
          sizes="640x1136"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )

}
