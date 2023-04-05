'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  // Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LogoFundation from '@/assets/logo.svg';
import LogoFundationVariant from '@/assets/logo-variant.svg';
import { DASHBOARD_HOME_PATH } from '@/utils/constants';

interface LoginFormValues {
  username: string;
  password: string;
}

const loginFormSchema = z.object({
  username: z.string().nonempty('Ingrese su correo para continuar'),
  password: z.string().nonempty('Ingrese su contraseña para continuar'),
});

export default function LoginPage() {
  const { handleSubmit, register, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();

  const toast = useToast();

  const [loginError, setLoginError] = useState('');

  const onSubmit = async ({ username, password }: LoginFormValues) => {
    setLoginError('');

    signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    }).then((response) => {
      if (response?.status === 401) {
        toast({
          position: 'top',
          title: 'Error de inicio de sesión',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoginError(
          'No se encontró usuario. Verifique sus datos e intente de nuevo'
        );
      }

      if (response?.ok && response.status === 200) {
        toast({
          position: 'top',
          title: '¡Inicio de sesión exitoso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        router.push(DASHBOARD_HOME_PATH);
      }
    });
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <FormControl isInvalid={Boolean(formState.errors.username)}>
                    <FormLabel>Correo electronico</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Ingresa tu correo"
                        id="username"
                        {...register('username')}
                      />
                      <InputRightAddon>
                        <EmailIcon />
                      </InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>
                      Ingrese su correo para continuar
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(formState.errors.password)}>
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Ingresa tu contraseña"
                        type="password"
                        id="password"
                        {...register('password')}
                      />
                      <InputRightAddon>
                        <LockIcon />
                      </InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>
                      Ingrese su contraseña para continuar
                    </FormErrorMessage>
                  </FormControl>
                  {/* <Checkbox size="sm">
                    <Text fontSize={12}>Guardar sesión</Text>
                  </Checkbox> */}

                  {loginError ? (
                    <Text as="div" color="#FA3E32">
                      {loginError}
                    </Text>
                  ) : null}

                  <Button colorScheme="blue" size="lg" type="submit">
                    Iniciar sesión
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </Container>
      </main>
    )
  );
}
