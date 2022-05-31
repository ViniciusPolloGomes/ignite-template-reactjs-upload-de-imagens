import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
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
    const [imgurl, setImgUrl] = useState('');

  // TODO ok FUNCTION HANDLE VIEW IMAGE
  function handlerViewImage(imgUrl: string){
    setImgUrl(imgurl);
    onOpen();
  }

  return (
    < SimpleGrid columns={3} spacing={"40px"} >
      {cards.map((card) => {
        
        return (
          <>
             {/* TODO ok CARD GRID */}
              <Card key={card.id} data={card} viewImage={() => handlerViewImage(card.url)}/>
              {/* TODO ok MODALVIEWIMAGE */}
              <ModalViewImage  isOpen={isOpen} onClose={onClose} imgUrl={imgurl} />
          </>
        )
      })}
      </SimpleGrid>
  );
}
