import { useEffect, useMemo, useState } from 'react';
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
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Breadcrumb, { Crumbs } from '../breadcrumb/Breadcrumb';

export const Navbar = () => {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState<Crumbs[]>([]);

  const paths = useMemo(() => {
    if (!pathname) {
      return;
    }

    return pathname.split('/').splice(1);
  }, [pathname]);

  useEffect(() => {
    if (!paths) {
      return;
    }

    const breadcumb: Crumbs[] = paths.map((path, index) => {
      return {
        title: path.replace(
          /^(.)(.*)$/,
          (_, firstChar, restOfString) => firstChar.toUpperCase() + restOfString
        ),
        path: `/${paths.slice(0, index + 1).join('/')}`,
      };
    });
    setCrumbs(breadcumb);
  }, [paths]);

  return (
    <Flex py={2} width="full" alignItems="center">
      <HStack justifyContent="space-between" width="full">
        <Breadcrumb crumbs={crumbs} />

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <Flex gap="3" alignItems="center">
                <Text fontSize={16}>Rodrygo</Text>
                <Avatar
                  size="sm"
                  src="https://bit.ly/broken-link"
                  name="Rodrygo Goes"
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
