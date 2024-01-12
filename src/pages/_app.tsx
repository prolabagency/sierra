import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head >
        <title>Sierra</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#262a2b" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="theme-color" content="#3c2f2f"></meta>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2b5797" />
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
