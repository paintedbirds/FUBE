'use client';

import { ReactNode } from 'react';
import { Box, Flex, Text, Divider, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { IconProps } from '@chakra-ui/icons';
import {
  AlbumsIcon,
  DashboardIcon,
  UserDetailIcon,
  CalendarIcon,
} from '@/assets/icons';
import LogoFoundationVariant from '@/assets/logo-variant.svg';
import { Navbar } from './navbar';
import { NavItem } from './nav-item';

interface LinkItemProps {
  label: string;
  route: string;
  icon: IconProps;
}

const links: LinkItemProps[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Usuarios',
    route: '/dashboard/usuarios',
    icon: <UserDetailIcon />,
  },
  {
    label: 'Casos',
    route: '/dashboard/casos',
    icon: <AlbumsIcon />,
  },
  {
    label: 'Calendario',
    route: '/dashboard/calendario',
    icon: <CalendarIcon />,
  },
];

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <HStack maxWidth="100vw" alignItems="flex-start" bg="#F5F5F5">
      <SidebarContent />
      <VStack width="full" px={5}>
        <Navbar />
        <Box minHeight="full" width="full">
          {children}
        </Box>
      </VStack>
    </HStack>
  );
};

const SidebarContent = () => (
  <Flex
    bg="white"
    w="220px"
    h="100vh"
    justifyItems="space-between"
    direction="column"
  >
    <Flex
      h="10px"
      w="80px"
      alignItems="center"
      justifyContent="space-between"
      marginTop="4rem"
      marginInline="2rem"
      marginBottom="4rem"
    >
      <Image src={LogoFoundationVariant} alt="Logo FUBE" />
    </Flex>

    {links.map(({ icon, label, route }) => (
      <NavItem key={label} icon={icon} route={route} label={label} />
    ))}

    <Flex
      marginTop="auto"
      justify="center"
      direction="column"
      align="center"
      p="4"
    >
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
