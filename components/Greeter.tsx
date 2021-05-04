import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Interface } from "@ethersproject/abi";

import { useContract } from "hooks/useContract";
import GreeterABI from "abi/greeter.json";
import Address from "constants/address";

export const Greeter: React.FC = () => {
  const [greet, setGreet] = useState<string>("");

  const greetContractAddress = Address.GREETER_ADDRESS;
  const greeter = useContract(
    new Interface(GreeterABI as any),
    greetContractAddress
  );

  useEffect(() => {
    greeter?.greet().then((greeting: string) => setGreet(greeting));
  }, [greeter]);

  return (
    <>
      <Box marginY={2}>
        <Text>Greet Contract: {greetContractAddress}</Text>
        <Text>Greet: {greet}</Text>
      </Box>
    </>
  );
};
