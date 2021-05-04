import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import { isAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { useEthers } from "@usedapp/core";

export function useContract(abi: Interface, address: string): Contract | null {
  const { library, account } = useEthers();
  return useMemo(() => {
    if (!address || !library) {
      return null;
    }

    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    const provider = account
      ? library.getSigner(account).connectUnchecked()
      : library;

    return new Contract(address, abi, provider as any);
  }, [address, abi, library, account]);
}
