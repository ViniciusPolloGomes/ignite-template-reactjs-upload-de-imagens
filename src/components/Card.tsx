import {
  Box,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box key={data.ts} borderRadius="md" bgColor="pGray.800" h="100%" w="100%" >
      <Skeleton isLoaded={!isLoading} >
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
          w="100%"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={6} h="100%">
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <>
            <Heading fontSize="2xl" color="gray.50" fontWeight="bold">{data.title}</Heading>
            <Text mt={2.5} fontSize="md" color="pGray.300" fontWeight="normal" >
              {data.description}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
