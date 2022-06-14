import { Flex, SimpleGrid, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { stringify } from 'querystring';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}


export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO ok MODAL USEDISCLOSURE
    const { isOpen, onOpen, onClose } = useDisclosure()

  // TODO ok SELECTED IMAGE URL STATE
    const [imgUrl, setImgUrl] = useState('');

  // TODO ok FUNCTION HANDLE VIEW IMAGE
  function handlerViewImage(imgUrl: string){
    setImgUrl(imgUrl)
    onOpen();
  }
  
  //console.log(cards)
  return (
      <SimpleGrid columns={[1,2,3]} spacing={["10px","20px","40px"]} >
        {cards.map((cards) => {
          
          //console.log(JSON.stringify(card,null,4))
            return (
                  <Flex direction="column" key={cards.id} h="100%" w="100%" minW="295">
                        {/* TODO ok CARD GRID */}
                          <Card data={cards} viewImage={() => handlerViewImage(cards.url)}/>
                        {/* TODO ok MODALVIEWIMAGE */}
                        <ModalViewImage   isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />  
                  </Flex> 
            )
        })}
      </SimpleGrid>
  );
}
