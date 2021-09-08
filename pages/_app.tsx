import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, DAppProvider } from "@usedapp/core";
import theme from "themes/chakraTheme";

const config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]:
      "https://eth-ropsten.alchemyapi.io/v2/IZ_oYU0U6z3qFNryO73Tx0iATXKrkEy1",
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
