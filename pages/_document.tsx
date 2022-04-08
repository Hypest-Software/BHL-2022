import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full bg-gray-200">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#333333" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
