import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainId } from "@usedapp/core";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [ChainId.Rinkeby, ChainId.Ropsten],
});
