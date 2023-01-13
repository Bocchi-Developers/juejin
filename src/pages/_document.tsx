import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'zh-cn'}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#39C5BB" />
        <meta name="msapplication-navbutton-color" content="#39C5BB" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
