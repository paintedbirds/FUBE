'use-client';

import { FC, FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
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
    const newData: FieldValues = { ...formData };

    if (['is_staff', 'is_superuser'].includes(id)) {
      //
    } else {
      newData[id] = value;
    }

    setFormData(newData as User);
  };

  const onSubmit = (data: FieldValues) => {
    onValidated(data as User);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <HStack align="flex-start" gap="20">
        <VStack gap={3}>
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
        </VStack>

        <VStack justify="flex-start" alignItems="flex-start" height="100%">
          <FormControl>
            <Checkbox
              id="is_staff"
              isChecked={formData?.is_staff}
              {...register('is_staff')}
              onChange={handleFields}
              autoComplete="off"
            >
              Acceso al area de administración
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              id="is_superuser"
              isChecked={formData?.is_superuser}
              {...register('is_superuser')}
              onChange={handleFields}
              autoComplete="off"
            >
              Acceso total
            </Checkbox>
          </FormControl>
        </VStack>
      </HStack>

      <Divider marginY="2rem" />
      <HStack justify="flex-end" align="flex-end" width="100%">
        <Button
          variant="outline"
          size="md"
          borderColor="#2843B2"
          color="#2843B2"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="solid"
          size="md"
          background="#2843B2"
          color="#fff"
          type="submit"
          isLoading={isSubmitting}
        >
          Validar
        </Button>
      </HStack>
    </form>
  );
};
