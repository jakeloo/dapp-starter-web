import React from "react";
import { useEagerConnect, useInactiveListener } from "hooks/useWeb3Injected";

export const Web3EagerConnectManager: React.FC = ({ children }) => {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  return <>{children}</>;
};
