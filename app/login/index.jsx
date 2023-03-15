import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import LogoFundacion from '../../assets/logo-fundacion.png';

export const Login = () => (
  <Flex background="#F0F0F0" height="100vh" justify="center">
    <Flex maxWidth="87vw" justify="between" margin="3rem">
      <Box>
        <Image src={LogoFundacion} alt="Logo FUBE" />
        <Text fontSize={32} fontWeight={600}>
          Plataforma de Seguimiento de Casos de Abuso Infantil.
        </Text>
        <Text fontSize={18} fontWeight={400} color="gray">
          Plataforma de Seguimiento de Casos de Abuso Infantil.
        </Text>
      </Box>
      <Flex height="100%">
        <Flex
          background="white"
          borderRadius="md"
          paddingX="6"
          paddingY="5"
          direction="column"
          gap="5"
          width={500}
        >
          <Text fontSize={24} fontWeight={500}>
            Iniciar Sesión
          </Text>
          <InputGroup>
            <InputLeftElement>
              <EmailIcon />
            </InputLeftElement>
            <Input placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <InputLeftElement>
              <LockIcon />
            </InputLeftElement>
            <Input placeholder="Password" />
          </InputGroup>
          <Button>Iniciar sesion</Button>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
