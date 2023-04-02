'use-client';

import { FC, FormEvent, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';

import { User } from '@/utils/types';

interface UserFormProps {
  user?: User;
  onCancel: () => void;
  onValidated: (user: User) => void;
}

export const UserForm: FC<UserFormProps> = ({
  user,
  onCancel,
  onValidated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [formData, setFormData] = useState(user);

  const handleFields = (event: FormEvent) => {
    const { id, value } = event.target as HTMLInputElement;
    const newData = {
      ...formData,
      [id]: value,
    };
    setFormData(newData as User);
  };

  const onSubmit = (data: FieldValues) => {
    onValidated(data as User);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <VStack gap={3} width="100%">
        <FormControl>
          <Input
            id="first_name"
            placeholder="Nombre"
            value={formData?.first_name}
            {...register('first_name')}
            onChange={handleFields}
            required
            autoComplete="off"
            type="text"
          />
        </FormControl>

        <FormControl>
          <Input
            id="last_name"
            placeholder="Apellido"
            value={formData?.last_name}
            {...register('last_name')}
            onChange={handleFields}
            required
            autoComplete="off"
          />
        </FormControl>

        <FormControl>
          <Input
            id="username"
            placeholder="Nombre de usuario"
            {...register('username')}
            value={formData?.username}
            onChange={handleFields}
            required
            autoComplete="off"
          />
        </FormControl>

        <FormControl>
          <Input
            id="email"
            placeholder="Email"
            value={formData?.email}
            {...register('email')}
            onChange={handleFields}
            required
            autoComplete="off"
          />
        </FormControl>

        <FormControl>
          <Input
            id="password"
            placeholder="Contraseña"
            value={formData?.password}
            {...register('password')}
            onChange={handleFields}
            required
            autoComplete="off"
          />
        </FormControl>

        <Divider />
        <HStack justify="space-between" width="100%">
          <Button
            variant="outline"
            size="lg"
            borderColor="#2843B2"
            color="#2843B2"
            width="50%"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="solid"
            size="lg"
            background="#2843B2"
            color="#fff"
            width="50%"
            type="submit"
            isLoading={isSubmitting}
          >
            Validar
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
