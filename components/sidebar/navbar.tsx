import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Breadcrumb from '../breadcrumb/Breadcrumb';

export const Navbar = () => {
  const {data} = useSession();
  const getUserFullName = (): string => `${data?.user.first_name} ${data?.user.last_name}` ?? "user";

  return (
    <Flex py={2} width="full" alignItems="center">
      <HStack justifyContent="space-between" width="full">
        <Breadcrumb />

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <Flex gap="3" alignItems="center">
                <Text fontSize={16}>{data?.user.first_name ?? "User"}</Text>
                <Avatar
                  size="sm"
                  src="https://bit.ly/broken-link"
                  name={getUserFullName()}
                />
              </Flex>
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
