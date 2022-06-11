import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';


interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal   onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay bg="#1B1A185e"/>
        <ModalContent >
          <ModalBody  
              x="900px" 
              y="600px" 
              bg="pGray.900"  
              w="100%"
              h="100%"
              mx="0"
              my="0"
              px="0"
              py="0"  
              borderRadius={15}    
          >
            <Image src={imgUrl} h="100%" w="100%" mx={0} my={0} py={0} px={0} />
          </ModalBody>
          <ModalFooter 
                  bg="pGray.700" 
                  fontWeight="pGray.400"  
                  mx="0"
                  my="0"
                  px="1rem"
                  py="1rem"
                  h="4rem"
                  w="100%"
                  justifyContent="left"
                  
            >
            <Link href={imgUrl} 
                  isExternal 
                  w="auto" 
                  h="auto" 
                  mx="0"
                  my="0"
                  px={2}
                  py={1}
                  textAlign="left"
                  borderRadius={10}
                       
            >
              Abrir original 
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) // TODO ok MODAL WITH IMAGE AND EXTERNAL LINK
}
