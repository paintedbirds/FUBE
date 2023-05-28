'use client';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Text,
  Divider,
  HStack,
  VStack,
  useDisclosure,
  Button,
  Collapse,
  Link,
  Tooltip,
} from '@chakra-ui/react';
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
import { RetrunIcon } from '@/assets/icons/return';
import { ExpandIcon } from '@/assets/icons/expand';
import NextLink from 'next/link';

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
    <HStack alignItems="flex-start" bg="#F5F5F5">
      <SidebarContent />
      <VStack width="full" px={5} transition="3s ease">
        <Navbar />
        <Box width="full">{children}</Box>
      </VStack>
    </HStack>
  );
};

const SidebarContent = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      transition="3s ease"
      bg="white"
      h="100vh"
      justifyItems="space-between"
      direction="column"
    >
      <Flex
        h="10px"
        alignItems="center"
        justifyContent={isOpen ? 'flex-start' : 'center'}
        marginTop="4rem"
        marginInline={isOpen ? '2rem' : '0'}
        marginBottom="4rem"
      >
        <Link as={NextLink} href="/dashboard">
          <Image
            src={LogoFoundationVariant}
            alt="Logo FUBE"
            width={isOpen ? 80 : 45}
          />
        </Link>
      </Flex>

      {links.map(({ icon, label, route }) => (
        <NavItem
          key={label}
          icon={icon}
          route={route}
          label={label}
          showLabel={isOpen}
        />
      ))}

      <Flex
        marginTop="auto"
        justify="center"
        direction="column"
        align="center"
        p="4"
      >
        <Tooltip label="Expandir" placement="auto" isDisabled={isOpen}>
          <Button onClick={onToggle} background="wihte" transition="3s ease">
            <Collapse in={isOpen} animateOpacity>
              <Flex gap="2">
                Colapsar <RetrunIcon />
              </Flex>
            </Collapse>
            <Collapse in={!isOpen} animateOpacity>
              <ExpandIcon />
            </Collapse>
          </Button>
        </Tooltip>

        <Collapse in={isOpen} animateOpacity>
          <Divider marginY="0.5rem" />
          <Text fontSize={12} color="rgba(52, 52, 52, 0.45)" textAlign="center">
            © 2023 FUBE. Todos los derechos reservados
          </Text>
        </Collapse>
      </Flex>
    </Flex>
  );
};
