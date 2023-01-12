import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/lib/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
