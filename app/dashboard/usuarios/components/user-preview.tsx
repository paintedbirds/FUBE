'use-client';

import { FC } from 'react';
import { VStack, HStack, Avatar, Button, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { User } from '@/utils/types';

type Callback = () => void;

interface UserPreviewProps {
  onCancel: Callback;
  onConfirm: Callback;
  onEdit: Callback;
  user: User;
}

export const UserPreview: FC<UserPreviewProps> = ({
  onCancel,
  onConfirm,
  onEdit,
  user,
}) => (
  <>
    <VStack gap={10} align="flex-start">
      <VStack gap={1}>
        <Text
          color="#38A169"
          fontWeight="semibold"
          margin="0 auto 0 0"
          fontSize="md"
        >
          ¿Deseas crear este usuario en el sistema?
        </Text>
        <Text color="#808080" fontWeight="thin" fontSize="sm">
          Recuerda que una vez creado, tendrá acceso a las funcionalidades
          correspondientes a su tipo de usuario.
        </Text>
      </VStack>
      <HStack justify="space-between" align="center" width="100%">
        <HStack align="flex-start">
          <Avatar
            name={`${user.first_name} ${user.last_name}`}
            src="https://bit.ly/broken-link"
            size="sm"
          />
          <VStack width="100%" align="flex-start">
            <Text fontSize="sm">
              {`${user.first_name} ${user.last_name}`}
            </Text>
            <Text color="#808080" fontSize="xs">
              {user.email}
            </Text>
          </VStack>
        </HStack>
        <Button
          size="xs"
          variant="ghost"
          textDecoration="underline"
          onClick={onEdit}
        >
          Edit
        </Button>
      </HStack>
    </VStack>
    <HStack justify="space-between" width="100%" marginTop="5rem">
      <Button
        variant="ghost"
        size="md"
        color="#FA3E32"
        width="50%"
        onClick={onCancel}
      >
        Cancelar
      </Button>
      <Button
        variant="solid"
        size="md"
        background="#38A169"
        color="#fff"
        width="50%"
        rightIcon={<AddIcon />}
        onClick={onConfirm}
      >
        Crear usuario
      </Button>
    </HStack>
  </>
);
