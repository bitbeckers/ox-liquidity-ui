import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import QuoteBox from "./components/quote-box";
import { SwapContextProvider } from "./contexts/swapContext";
import SwapForm from "./components/swap-form";

export const App = () => (
  <ChakraProvider theme={theme}>
    <SwapContextProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <SwapForm />
            <QuoteBox />
          </VStack>
        </Grid>
      </Box>
    </SwapContextProvider>
  </ChakraProvider>
);
