import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '../styles/theme';
import{ReactQueryDevtools} from 'react-query/devtools'



function MyApp({ Component, pageProps }) :JSX.Element {
  const queryClient = new QueryClient();



  return (
    
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>

            <Component {...pageProps} />
            
          </ChakraProvider>
          <ReactQueryDevtools/>
        </QueryClientProvider>
  );
}

export default MyApp;
