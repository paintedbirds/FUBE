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
  <Container maxWidth="100%" height="100vh" background="#F0F0F0" centerContent>
    <Flex maxWidth="87vw" justify="space-between" marginY="auto">
      <Flex
        width="28%"
        minHeight="100%"
        display={['none', 'none', 'none', 'flex']}
        direction="column"
        align="flex-start"
      >
        <Image src={LogoFundacion} alt="Logo FUBE" height="auto"/>
        <Text fontSize={32} fontWeight={600} lineHeight="38.73px">
          Plataforma de Seguimiento de Casos de Abuso Infantil.
        </Text>
        <Text fontSize={18} fontWeight={400} color="gray" lineHeight="21.78px" marginTop="0.5rem">
          Trabajando juntos por la seguridad y el bienestar de los niños.
        </Text>
      </Flex>

      <Flex justify="flex-end">
        <Flex
          background="white"
          borderRadius="md"
          paddingX={['2rem', '2rem', '4rem', '4rem']}
          paddingY={['2rem', '2rem', '2rem', '9rem']}
          direction="column"
          gap="7"
          justifyContent="center"
          marginTop={['1', '1rem', '1rem', '2rem']}
        >
          <Flex
            display={['flex', 'flex', 'flex', 'none']}
            justify="center"
            width="auto"
            align="center"
          >
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
