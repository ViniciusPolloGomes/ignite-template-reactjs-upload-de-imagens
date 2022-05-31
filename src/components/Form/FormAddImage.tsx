import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
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
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION 
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

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS

      // TODO EXECUTE ASYNC MUTATION

      // TODO SHOW SUCCESS TOAST

    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED

    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL

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
                               // TODO ok SEND IMAGE ERRORS
          {...register('image',formValidations.image)}// TODO ok REGISTER IMAGE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}// TODO ok SEND TITLE ERRORS
          {...register('title',formValidations.title
        )}// TODO ok REGISTER TITLE INPUT WITH VALIDATIONS
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
