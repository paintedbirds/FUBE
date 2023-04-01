'use-client';

import { FC, FormEvent, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
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
  const [formData, setFormData] = useState<User>();

  const handleFields = (event: FormEvent) => {
    const { id, value } = event.target as HTMLInputElement;
    const newData = {
      ...user,
      [id]: value,
    };
    setFormData(newData as User);
  };

  const onSubmit = (data: FieldValues) => {
    onValidated(data as User);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={3} width="100%">
        <FormControl>
          <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
          <Input
            id="username"
            placeholder="Nombre de usuario"
            {...register('username')}
            value={formData?.username}
            onChange={handleFields}
          />
        </FormControl>

        <FormControl>
          <Input
            id="password"
            placeholder="Contraseña"
            value={formData?.password}
            {...register('password')}
            onChange={handleFields}
          />
        </FormControl>

        <FormControl>
          <Input
            id="first_name"
            placeholder="Nombre"
            value={formData?.first_name}
            {...register('first_name')}
            onChange={handleFields}
          />
        </FormControl>

        <FormControl>
          <Input
            id="last_name"
            placeholder="Apellido"
            value={formData?.last_name}
            {...register('last_name')}
            onChange={handleFields}
          />
        </FormControl>

        <FormControl>
          <Select
            id="area"
            placeholder="Área"
            value={formData?.area}
            {...register('area')}
            onChange={handleFields}
          >
            <option value="legal">Legal</option>
            <option value="psicologia">Psicologia</option>
            <option value="social">social</option>
            <option value="social">administrativa</option>
          </Select>
        </FormControl>

        <FormControl>
          <Select
            id="user_type"
            placeholder="Tipo de usuario"
            value={formData?.type}
            {...register('user_type')}
            onChange={handleFields}
          >
            <option value="abogada_admin">Abogada Admin</option>
            <option value="abogada_asignada">Abogada Asignada</option>
            <option value="asistente_legal">Asistente Legal</option>
            <option value="voluntario">Voluntario</option>
            <option value="social_admin">Social Admin</option>
            <option value="social_asignada">Social Asignada</option>
            <option value="cordinadora">Cordinadora</option>
            <option value="ceo">CEO</option>
          </Select>
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
