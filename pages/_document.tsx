import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="min-h-screen bg-white">
      <Head>
      <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
      </Head>
      <body className="min-h-screen h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
