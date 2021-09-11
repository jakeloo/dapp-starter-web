import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, DAppProvider } from "@usedapp/core";
import theme from "themes/chakraTheme";

const config = {
  readOnlyChainId: ChainId.Ropsten,
  supportedChains: [ChainId.Ropsten],
  readOnlyUrls: {
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
};

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default App;
