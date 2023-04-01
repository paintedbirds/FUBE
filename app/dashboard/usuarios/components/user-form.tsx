/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface UserFormProps {
  user: never; // TODO: define user when user endpoints are availables
  setTabIndex: (tabIndex: number) => void;
  onSubmit: SubmitHandler<FieldValues>;
}

export const UserForm: FC<UserFormProps> = ({ setTabIndex, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
  //   console.log(data);
  // };

  const onValidateData = () => {
    // TODO: validate data
    setTabIndex(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={3} width="100%">
        <FormControl isInvalid={!!errors.name}>
          {/*
          // @ts-ignore */}
          <Input
            id="user_name"
            placeholder="Nombre"
            {...(register('name'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.name && <>errors.name.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastname}>
          {/*
          // @ts-ignore */}
          <Input
            id="lastname"
            placeholder="Apellido"
            {...(register('lastname'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.lastname && <>errors.lastname.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          {/*
          // @ts-ignore */}
          <Input
            id="phone"
            placeholder="Celular"
            {...(register('phone'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.phone && <>errors.phone.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.userType}>
          {/*
          // @ts-ignore */}
          <Select
            id="userType"
            placeholder="Tipo de usuario"
            {...(register('userType'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.userType && <>errors.userType.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          {/*
          // @ts-ignore */}
          <Input
            id="email"
            placeholder="Email"
            {...(register('email'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.email && <>errors.email.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          {/*
          // @ts-ignore */}
          <Input
            id="password"
            placeholder="Email"
            {...(register('password'), { required: 'This is required' })}
          />
          <FormErrorMessage>
            {errors.password && <>errors.password.message</>}
          </FormErrorMessage>
        </FormControl>

        <Divider />
        <HStack justify="space-between" width="100%">
          <Button
            variant="outline"
            size="lg"
            borderColor="#2843B2"
            color="#2843B2"
            width="50%"
          >
            Cancelar
          </Button>
          <Button
            variant="solid"
            size="lg"
            background="#2843B2"
            color="#fff"
            width="50%"
            onClick={onValidateData}
          >
            Validar
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
