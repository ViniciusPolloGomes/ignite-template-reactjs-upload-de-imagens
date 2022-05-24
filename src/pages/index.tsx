import { Button, Box } from '@chakra-ui/react';
import { useMemo, useState ,ReactNode} from 'react';
import { GetNextPageParamFunction, useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { query, Query } from 'faunadb';
import { string } from 'yup/lib/locale';
import axios from 'axios';



export default function Home():JSX.Element{
  
  const responseGetImages = async ({pageParam = null}) => {
    const response = await axios.get('/api/images',{
      params:{
        after: pageParam,
      }
    })
    return response.data
    
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
    {                                           // TODO GET AND RETURN NEXT PAGE PARAM
      getNextPageParam: lastPage => {
        return lastPage.after ?? null;
      },
    }
  );

  
  const formattedData = useMemo(() => {
     if(data){                                  // TODO FORMAT AND FLAT DATA ARRAY
       return data.pages.map(page =>{
         return page.data;
       }).flat();
     }
     return[];
  }, [data]);
  console.log(formattedData)
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
