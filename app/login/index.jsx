import {
  Box,
  Flex,
  InputGroup,
  Text,
  Input,
  Button,
  InputRightAddon,
  Checkbox,
  Container,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import LogoFundacion from '../../assets/logo-fundacion.png';

export const Login = () => (
  <Container maxW="100%" background="#F0F0F0" centerContent>
    <Flex maxW="87vw" minHeight="100vh" justify="space-between" align="center">
      <Box width="28%" height="80%" display={['none', 'none', 'none', 'block']}>
        <Image src={LogoFundacion} alt="Logo FUBE" />
        <Text fontSize={32} fontWeight={600}>
          Plataforma de Seguimiento de Casos de Abuso Infantil.
        </Text>
        <Text fontSize={18} fontWeight={400} color="gray">
          Trabajando juntos por la seguridad y el bienestar de los niños.
        </Text>
      </Box>

      <Flex justify="flex-end" align="flex-start">
        <Flex
          background="white"
          borderRadius="md"
          paddingX="4rem"
          paddingY="5rem"
          direction="column"
          gap="6"
          width={480}
          justifyContent="center"
          marginTop="2rem"
        >
          <Flex display={['flex', 'flex', 'flex', 'none']} justify="center">
            <Image src={LogoFundacion} alt="Logo FUBE" />
          </Flex>

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

          <Button colorScheme="blue" size="lg">
            Iniciar sesión
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Container>
);
