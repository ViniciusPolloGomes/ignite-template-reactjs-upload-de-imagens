import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '../styles/theme';



function MyApp({ Component, pageProps }) :JSX.Element {
  const queryClient = new QueryClient();

  return (
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
  );
}

export default MyApp;
