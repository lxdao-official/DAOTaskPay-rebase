import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import '@rainbow-me/rainbowkit/styles.css';
import toast, { Toaster } from 'react-hot-toast';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, goerli } from 'wagmi/chains';
const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Task3',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={goerli}>
        <NextUIProvider>
          <Component {...pageProps} />
          <Toaster />
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
