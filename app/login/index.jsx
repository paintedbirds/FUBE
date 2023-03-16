import {
  Box,
  Flex,
  InputGroup,
  Text,
  Input,
  Button,
  InputRightAddon,
  Checkbox,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import LogoFundacion from '../../assets/logo-fundacion.png';

export const Login = () => (
  <Flex background="#F0F0F0" height="100vh" justify="center">
    <Flex maxWidth="95vw" alignItems="start" justifyContent="center">
      <Box width="28%" marginTop="3rem">
        <Image src={LogoFundacion} alt="Logo FUBE" />
        <Text fontSize={32} fontWeight={600}>
          Plataforma de Seguimiento de Casos de Abuso Infantil.
        </Text>
        <Text fontSize={18} fontWeight={400} color="gray">
          Trabajando juntos por la seguridad y el bienestar de los niños.
        </Text>
      </Box>
      <Flex
        width="50%"
        justifyContent="flex-end"
        alignItems="center"
        height="100%"
      >
        <Flex
          background="white"
          borderRadius="md"
          paddingX="4rem"
          paddingY="6rem"
          direction="column"
          gap="6"
          width={480}
          justifyContent="center"
        >
          <Box>
            <Text fontSize={24} fontWeight={500}>
              Iniciar Sesión
            </Text>
            <Text fontSize={18} fontWeight={400} color="#808080">
              Ingresa tus credenciales para acceder a tu cuenta.
            </Text>
          </Box>

          <Flex direction="column" gap="2">
            <Text fontSize={16} fontWeight={400}>
              Correo electronico*
            </Text>
            <InputGroup>
              <Input placeholder="Ingresa tu correo..." />
              <InputRightAddon>
                <EmailIcon />
              </InputRightAddon>
            </InputGroup>
          </Flex>

          <Flex direction="column" gap="2">
            <Text fontSize={16} fontWeight={400}>
              Contraseña*
            </Text>
            <InputGroup>
              <Input placeholder="Ingresa tu contraseña..." type="password" />
              <InputRightAddon>
                <LockIcon />
              </InputRightAddon>
            </InputGroup>
            <Checkbox size="sm">
              <Text fontSize={12}>Guardar sesión</Text>
            </Checkbox>
          </Flex>

          <Button colorScheme="blue" size="lg">Iniciar sesión</Button>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
