import { ApolloProvider } from "@apollo/client";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from 'react-dom/client';
import { initApollo } from "./context/apollo";

function hydrate() {
  const client = initApollo(false);
  
  hydrateRoot(
    document,
    <ApolloProvider client={client}>
      <RemixBrowser />
    </ApolloProvider>
  )
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  window.setTimeout(hydrate, 1)
}