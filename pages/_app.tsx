import React from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/global.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
