'use client';

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
import { useLogin } from './useLogin';

import LogoFundation from 'assets/logo.svg';
import LogoFundationVariant from 'assets/logo-variant.svg';

export default function LoginPage() {
  const { mutate: loginRequest } = useLogin()

  const handleSubmit = () => {
    loginRequest({ username: 'admin', password: 'admin' })
  }

  return (
    <main>
      <Container
        maxWidth="100vw"
        height="100vh"
        background="#F0F0F0"
        centerContent
      >
        <Flex
          maxWidth={['100%', '100%', '100%', '87vw']}
          width="70vw"
          justify={['center', 'center', 'center', 'space-between']}
          marginY="auto"
        >
          <Flex display={['none', 'none', 'none', 'flex']} minWidth="50%">
            <Image src={LogoFundation} alt="Logo FUBE" />
          </Flex>

          <Flex
            minWidth={['100vw', '100vw', '100vw', 'auto']}
            maxWidth={400}
            justify="center"
          >
            <Flex
              background="white"
              borderRadius="md"
              paddingX={['1.5rem', '3rem', '4rem', '4rem']}
              paddingY={['8rem', '8rem', '8rem', '3.5rem']}
              direction="column"
              gap="6"
              justify="center"
            >
              <Flex
                display={['flex', 'flex', 'flex', 'none']}
                justify="center"
                width="auto"
                align="center"
              >
                <Image src={LogoFundationVariant} alt="Logo FUBE" />
              </Flex>

              <Box
                display={['none', 'none', 'none', 'block']}
                minWidth="300px"
                maxWidth={500}
              >
                <Text fontSize={24} fontWeight={500} lineHeight="32px">
                  Plataforma de Seguimiento de Casos de Abuso Infantil.
                </Text>
                <Text
                  fontSize={18}
                  fontWeight={400}
                  color="#808080"
                  lineHeight="21px"
                  marginTop="0.5rem"
                >
                  Trabajando juntos por la seguridad y el bienestar de los
                  niños.
                </Text>
              </Box>

              <Flex direction="column" gap="2">
                <Text fontSize={16} fontWeight={700}>
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
                <Text fontSize={16} fontWeight={700}>
                  Contraseña*
                </Text>
                <InputGroup>
                  <Input
                    placeholder="Ingresa tu contraseña..."
                    type="password"
                  />
                  <InputRightAddon>
                    <LockIcon />
                  </InputRightAddon>
                </InputGroup>
              </Flex>

              <Checkbox size="sm">
                <Text fontSize={12}>Guardar sesión</Text>
              </Checkbox>

              <Button colorScheme="blue" size="lg">
                Iniciar sesión
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </main>
  );
}
