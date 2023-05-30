'use client';

import { ReactNode, useMemo } from 'react';
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
  Tooltip,
  Fade,
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
import { Link } from '@chakra-ui/next-js';
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
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Flex
      bg="white"
      h="100vh"
      justifyItems="space-between"
      direction="column"
      borderWidth="1px"
    >
      <Link as={NextLink} href="/dashboard">
        <Flex
          height="80px"
          marginTop="2rem"
          marginInlineStart={isOpen ? '1.5rem' : '0'}
          justifyContent={isOpen ? 'flex-start' : 'center'}
          width="full"
          alignItems="flex-start"
          marginBottom="0.5rem"
        >
          <Collapse in={isOpen}>
            <Image src={LogoFoundationVariant} alt="Logo FUBE" width={110} />
          </Collapse>
          <Fade in={!isOpen}>
            <Image src={LogoFoundationVariant} alt="Logo FUBE" width={45} />
          </Fade>
        </Flex>
      </Link>

      {links.map(({ icon, label, route }) => (
        <NavItem
          key={label}
          icon={icon}
          route={route}
          label={label}
          showLabel={isOpen}
        />
      ))}

      <VStack
        marginTop="auto"
        justifyContent="space-between"
        direction="column"
        align="center"
        p="4"
        h="160px"
      >
        <Tooltip label="Expandir" placement="auto" isDisabled={isOpen}>
          <Button onClick={onToggle} background="wihte">
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
            © {currentYear} FUBE. Todos los derechos reservados
          </Text>
        </Collapse>
      </VStack>
    </Flex>
  );
};
