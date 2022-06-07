import { Button, Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { string } from 'yup/lib/locale';
import axios from 'axios';

export default function Home(): JSX.Element {
  const responseGetImages = async ({ pageParam = null }) => {
    const response = await axios.get('/api/images', {
      params: {
        after: pageParam,
      },
    });
    console.log(JSON.stringify(response.data,null,6))
    return response.data;
  };

  const {
    data, //É um objeto contendo dados de consulta infinitos:
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(['images'], responseGetImages, {// TODO ok AXIOS REQUEST WITH PARAM
    staleTime:1000*5, //10 seconds
    // TODO ok GET AND RETURN NEXT PAGE PARAM
    getNextPageParam: lastPage => {
      return lastPage.after ?? null;
    },
  });
  console.log(JSON.stringify(data,null,6))
  const formattedData = useMemo(() => {
    if (data) {
      // TODO ok FORMAT AND FLAT DATA ARRAY
      return data.pages.map(page => {
          return page.data;
        })
        .flat();
    }
    return [];
  }, [data]);

  console.log(JSON.stringify(formattedData))

  // TODO ok RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO ok RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {/*TODO  ok RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE*/}
        <Flex>
          <Button
            mt="6"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Carregando mais...'
              : hasNextPage
              ? 'Carregar mais'
              : 'Não há mais dados a serem carregados'}
          </Button>
        </Flex>
      </Box>
    </>
  );
}


//ferramentas de erro side server, splunk(log errors), newRelic(APM de Monitoramento com Throughput), sentry (parte do código que deu erro)