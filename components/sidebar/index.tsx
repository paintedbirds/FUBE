'use client';

import { ReactNode } from 'react';
import { Box, Flex, Text, Button, Divider, FlexProps } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AddIcon, IconProps } from '@chakra-ui/icons';
import { AlbumsIcon, DashboardIcon, UserDetailIcon } from '@/assets/icons';
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
    label: 'Casos',
    route: '/dashboard/casos',
    icon: <AlbumsIcon />,
  },
  {
    label: 'Usuarios',
    route: '/dashboard/usuarios',
    icon: <UserDetailIcon />,
  },
];

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <Box minH="100vh">
      <SidebarContent />
      <Navbar />
      <Box ml={{ base: 0, md: 60 }} paddingX="3rem" paddingY="1.5rem">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = (props: FlexProps) => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/dashboard/casos/registro');
  };

  return (
    <Flex
      transition="3s ease"
      bg="#F5F5F5"
      w={{ base: 'full', md: 60 }}
      position="fixed"
      minH="full"
      justifyItems="space-between"
      direction="column"
      paddingBottom={8}
      {...props}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        marginTop="4rem"
        marginInline="2rem"
        marginBottom="5rem"
      >
        <Image src={LogoFoundationVariant} alt="Logo FUBE" />
      </Flex>

      <Flex justify="center" direction="column" align="center" p="4">
        <Button
          background="#2843B21A"
          color="#2843B2"
          rightIcon={<AddIcon />}
          paddingY="10px"
          paddingX="2rem"
          height="48px"
          fontWeight="bold"
          onClick={handleRegisterClick}
        >
          Registrar un caso
        </Button>
        <Divider marginY="0.5rem" />
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
};
