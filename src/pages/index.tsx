import { Button, Box } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { query, Query } from 'faunadb';


export default function Home(): JSX.Element {

  const responseGetImages = () => {
      api.get('http://localhost:3000/images',{
        params:{

        }
      })
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['images'],
    responseGetImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {}
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
     
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
         {/*<CardList cards={formattedData} />*/}
          
          {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    
    </> 
  );
}
