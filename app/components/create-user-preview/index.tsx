import { FC } from 'react';
import { VStack, HStack, Avatar, Button, Text } from '@chakra-ui/react';

interface CreateUserPreviewProps {
  onCancel: () => void;
}

export const CreateUserPreview: FC<CreateUserPreviewProps> = ({ onCancel }) => {
  return (
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
              name="User Name"
              src="https://bit.ly/broken-link"
              size="sm"
            />
            <VStack width="100%" align="flex-start">
              <Text fontSize="sm">Gonzalo Perez | Abogado</Text>
              <Text color="#808080" fontSize="xs">
                gonzalezper@fube.com
              </Text>
              <Text color="#808080" fontSize="xs">
                +23938899
              </Text>
            </VStack>
          </HStack>
          <Button size="xs" variant="ghost" textDecoration="underline">Edit</Button>
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
        >
          Validar
        </Button>
      </HStack>
    </>
  );
};
