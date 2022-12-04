import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ContractProvider } from '../context';

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';

function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.goerli, chain.hardhat],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: 'Member Role App',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          overlayBlur: 'small',
        })}
      >
        <ContractProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                overflow: 'hidden',
                maxWidth: '100%',
                width: 'fit-content',
              },
            }}
          />
        </ContractProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
