import Head from 'next/head';
import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../storage/stateStorage/stateStorage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Stellar Wallet</title>
        <meta name="Create and manage your Stellar account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
