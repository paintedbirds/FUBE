'use client';

import { Flex, Button, Text, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import { AddIcon } from '@chakra-ui/icons';

import LogoFundationVariant from 'assets/logo-variant.svg';
import { NavItem } from './nav-item';

// TODO: add icons paths
const links = [
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    label: 'Casos',
    route: '/dashboard/casos',
  },
  {
    label: 'Usuarios',
    route: '/dashboard/usuarios',
  },
];

export const SideBar = () => (
  <Flex
    direction="column"
    background="rgba(242, 242, 242, 0.79)"
    height="100vh"
    width="300px"
    justify="space-between"
    paddingX="1rem"
  >
    <Flex marginTop="4rem" marginInlineStart="1rem" gap="20" direction="column">
      <Image src={LogoFundationVariant} alt="Logo FUBE" />
      <nav>
        <ul>
          {links.map(({ label, route }) => (
            <NavItem key={route} label={label} route={route} />
          ))}
        </ul>
      </nav>
    </Flex>

    <Flex
      marginBottom="2rem"
      justify="center"
      direction="column"
      align="center"
    >
      <Button
        background="#FFE5E4CF"
        color="red"
        rightIcon={<AddIcon />}
        margin="auto"
        paddingY="1rem"
        paddingX="2rem"
      >
        Registrar un caso
      </Button>
      <Divider marginY="0.5rem" />
      <Text
        fontSize={12}
        color="rgba(52, 52, 52, 0.45)"
        width="200px"
        textAlign="center"
      >
        © 2023 FUBE. Todos los derechos reservados
      </Text>
    </Flex>
  </Flex>
);
