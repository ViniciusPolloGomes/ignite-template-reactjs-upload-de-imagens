import { Box, Button, Stack, useToast} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface addImageFormData{
  url: string,
  title:string,
  description: string,
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();
 
  const formValidations = {
    
    image: {
      // TODO ok REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: {
        value: true,
        message: "Arquivo Obrigatório"},
      validate:{
        lessThan10MB: (file)=> file[0]?.size < 10000000 
            || 
            "O arquivo deve ser menor que 10MB",

        acceptedFormats: (file) => ["image/jpeg", "image/png", "image/gif"]
          .includes(file[0]?.type)
            ||
            "Somente são aceitos arquivos PNG, JPEG e GIF" ,
      }
      //Documentation https://www.codegrepper.com/code-examples/javascript/react-hook-form+file+validation
    },
    title: {
       // TODO ok REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required :{
        value: true ,
        message :"Título Obrigatório"
      },
      minLength: {
        value: 2,
        message: "Mínimo de 2 caracteres." 
      },
      maxLength:{
        value: 20,
        message: "Máximo de 20 caracteres."
      },
      // https://regexr.com/ pattern syntax Details
      //pattern: /([A-Za-z])\w {2}/g
    },
    description: {
      // TODO ok REQUIRED, MAX LENGTH VALIDATIONS
      required:{
        value: true,
        message:"Descrição Obrigatória."
      },
      maxLength:{
        value: 65,
        message: "Máximo de 65 caracteres."
      }   
    },
  };

  const queryClient = useQueryClient();
  // TODO ok MUTATION API POST REQUEST,
    const addImage = useMutation(async (image : addImageFormData)=>{   
        
      const response = await  api.post('api/images',{
          image: {
            url: imageUrl,
            title: image.title,
            description:image.description
          }

        })
        return response.data.images;
        
    },
    
    {
      // TODO ONSUCCESS MUTATION 
      onSuccess: () =>{
        queryClient.invalidateQueries('images')
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit : SubmitHandler<addImageFormData> = async (data) => {
    
    
    try {
      // TODO ok SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      !localImageUrl && !imageUrl ?
        toast({
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          status:'error',
          duration:9000,
          isClosable:true,
        })
      :
      // TODO ok EXECUTE ASYNC MUTATION
       await addImage.mutateAsync(data)
       
      // TODO SHOW SUCCESS TOAST
      toast({
        title: "Imagem cadastrada",
        description: "Sua imagem foi cadastrada com sucesso.",
        status:'success',
        duration:9000,
        isClosable:true,
      })
      
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status:'error',
        duration:9000,
        isClosable:true,
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset()
      closeModal;
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image} // TODO ok SEND IMAGE ERRORS
          {...register('image',formValidations.image)}// TODO ok REGISTER IMAGE INPUT WITH VALIDATIONS
          
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}// TODO ok SEND TITLE ERRORS
          {...register('title',formValidations.title)}// TODO ok REGISTER TITLE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}// TODO ok SEND DESCRIPTION ERRORS
          {...register('description', formValidations.description)}// TODO ok REGISTER DESCRIPTION INPUT WITH VALIDATIONS
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w={"100%"}
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
