import { FC } from 'react';
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

interface CreateUserFormProps {
  setIsDataValid: (isValid: boolean) => void;
  onCancel: () => void;
}

export const CreateUserForm: FC<CreateUserFormProps> = ({
  setIsDataValid,
  onCancel,
}) => {
  const validateData = () => {
    //  Todo: validate data
    setIsDataValid(true);
  };

  return (
    <FormControl>
      <VStack gap={3} w="100%">
        <Input placeholder="Nombre" />
        <Input placeholder="Apellido" />
        <Input placeholder="Email" />
        <Input placeholder="Celular" />
        <Select placeholder="Tipo de usuario" />
        <Divider />
        <HStack justify="space-between" w="100%">
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
            onClick={validateData}
          >
            Validar
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
};
