import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head >
        <title>Sierra</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#262a2b" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#3c2f2f"></meta>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2b5797" />
      </Head>

      <body className='w-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
