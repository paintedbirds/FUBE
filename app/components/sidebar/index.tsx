'use client';

import { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  // VStack,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Divider,
} from '@chakra-ui/react';
import Image from 'next/image';
import { AddIcon, IconProps } from '@chakra-ui/icons';

import LogoFoundationVariant from 'assets/logo-variant.svg';
// import { NavItem } from './nav-item';

interface LinkItemProps {
  label: string;
  route: string;
  icon: IconProps;
}

const links: LinkItemProps[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: <AddIcon />,
  },
  {
    label: 'Casos',
    route: '/dashboard/casos',
    icon: <AddIcon />,
  },
  {
    label: 'Usuarios',
    route: '/dashboard/usuarios',
    icon: <AddIcon />,
  },
];

// export const SideBar = () => (
//   <Flex
//     direction="column"
//     background="rgba(242, 242, 242, 0.79)"
//     height="100vh"
//     width="300px"
//     justify="space-between"
//     paddingX="1rem"
//   >
//     <Flex marginTop="4rem" marginInlineStart="1rem" gap="20" direction="column">
//       <Image src={LogoFundationVariant} alt="Logo FUBE" />
//       <nav>
//         <ul>
//           {links.map(({ label, route }) => (
//             <NavItem key={route} label={label} route={route} />
//           ))}
//         </ul>
//       </nav>
//     </Flex>

//     <Flex
//       marginBottom="2rem"
//       justify="center"
//       direction="column"
//       align="center"
//     >
//       <Button
//         background="#FFE5E4CF"
//         color="red"
//         rightIcon={<AddIcon />}
//         margin="auto"
//         paddingY="1rem"
//         paddingX="2rem"
//       >
//         Registrar un caso
//       </Button>
//       <Divider marginY="0.5rem" />
//       <Text
//         fontSize={12}
//         color="rgba(52, 52, 52, 0.45)"
//         width="200px"
//         textAlign="center"
//       >
//         © 2023 FUBE. Todos los derechos reservados
//       </Text>
//     </Flex>
//   </Flex>
// );

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Flex
      transition="3s ease"
      bg={useColorModeValue('gray.100', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      minH="full"
      {...rest}
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
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {links.map(({ icon, label, route }) => (
        <NavItem key={label} icon={icon} route={route} label={label} />
      ))}

      <Flex marginTop="auto" justify="center" direction="column" align="center">
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
};

interface NavItemProps extends FlexProps {
  icon: IconProps;
  label: string;
  route: string;
}

const NavItem = ({ label, icon, route, ...rest }: NavItemProps) => {
  return (
    <Link
      href={route}
      fontWeight={700}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        gap="22px"
        _hover={{
          bg: 'white',
          color: '#2843B2',
        }}
        {...rest}
      >
        <>
          {icon}
          {label}
        </>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<AddIcon />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AddIcon />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AddIcon />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                {/* <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack> */}
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
