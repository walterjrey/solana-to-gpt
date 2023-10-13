import type { AppProps } from "next/app";
import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Head from "next/head";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import theme from "../theme";
import Footer from "../components/footer";
import Navbar from "../components/navbar/navbar";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/400.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";
require('@solana/wallet-adapter-react-ui/styles.css');

function App({ Component, pageProps: { ...pageProps }, router }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Testnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );


  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Head>
              <title>Solana to GPT</title>
              <link rel="icon" href="/favicon.png" />
            </Head>
            <Container minW="90vw" maxW="95%" h="100svh" centerContent>
              <Flex direction="column" flex={1} w="100%">
                <Navbar />
                <Component {...pageProps} key={router.route} />
              </Flex>
              <Footer />
            </Container>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    </ChakraProvider>
  );
}

export default App;