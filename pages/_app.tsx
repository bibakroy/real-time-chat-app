import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { UserContextProvider } from "../src/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}
