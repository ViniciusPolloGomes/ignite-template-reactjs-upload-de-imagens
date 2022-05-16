import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../styles/theme';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import { linkResolver, repositoryName } from '../../src/services/prismicio';
import Link from 'next/link';


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    
        <PrismicProvider
          linkResolver={linkResolver}
          internalLinkComponent={({ href, children, ...props }) => (
            <Link href={href}>
              <a {...props}>
                {children}
              </a>
            </Link>
          )}
        >
          <PrismicPreview repositoryName={repositoryName}>
            <ChakraProvider resetCSS theme={theme}>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </ChakraProvider> 

          </PrismicPreview>
        </PrismicProvider>
    
  );
}

export default MyApp;
