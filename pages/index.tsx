import React, { useRef } from "react";
import {
  Button,
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { UnsupportedChainIdError } from "@web3-react/core";
import { useEthers } from "@usedapp/core";

import { injectedConnector } from "libs/connectors";
import { Wallet } from "components/Wallet";
import { Greeter } from "components/Greeter";

interface ConnectorError {
  connector: any;
  error: Error;
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestError) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

const HomePage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { account, activate, deactivate, connector, error } = useEthers();
  const errorRef = useRef<ConnectorError | null>(null);

  if (error) {
    errorRef.current = { connector, error };
  } else {
    if (errorRef.current?.error && errorRef?.current.connector == connector) {
      errorRef.current = null;
    }
  }

  return (
    <Container minH="100vh" display="flex">
      <Flex flexDir="column" margin="auto">
        {errorRef.current ? (
          <Box bgColor="red.500" textColor="white" padding={4} rounded="md">
            <Text>{getErrorMessage(errorRef.current.error)}</Text>
          </Box>
        ) : null}

        <Heading mb={8}>dApp Starter Template</Heading>

        <FormControl display="flex" align="center" mb={4}>
          <FormLabel htmlFor="darkMode" mb="0">
            Dark Mode
          </FormLabel>
          <Switch
            isChecked={colorMode === "dark"}
            onChange={() => toggleColorMode()}
            id="darkMode"
          />
        </FormControl>

        {account ? (
          <>
            <Wallet />
            <Button mt={2} onClick={() => deactivate()}>
              Disconnect Wallet
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                activate(injectedConnector);
              }}
            >
              Connect Wallet
            </Button>
          </>
        )}

        <Box>
          <Greeter />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
