import { useState, useEffect, useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import { isAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { useEthers } from "@usedapp/core";
import { ContractAddress } from "constants/contract";
import { Greeter, Greeter__factory } from "types/ethers-contracts";

export function useContract(abi: Interface, address: string): Contract | null {
  const { library, account } = useEthers();
  return useMemo(() => {
    if (!address || !library) {
      return null;
    }

    if (address === AddressZero) {
      return null;
    }

    if (!isAddress(address)) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    const provider = account
      ? library.getSigner(account).connectUnchecked()
      : library;

    return new Contract(address, abi, provider as any);
  }, [address, abi, library, account]);
}

export function useContractAddress(contractName: string): string {
  const { library } = useEthers();
  const [address, setAddress] = useState(AddressZero);

  useEffect(() => {
    if (!library) {
      return;
    }

    library.getNetwork().then((network) => {
      setAddress(
        (ContractAddress as any)[network.chainId][contractName] || AddressZero
      );
    });
  }, [contractName, library]);

  return address;
}

export function useGreeterContract(): Greeter | null {
  return useContract(
    Greeter__factory.createInterface(),
    useContractAddress("Greeter")
  ) as Greeter;
}
