import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full bg-gray-200">
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"></link>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
