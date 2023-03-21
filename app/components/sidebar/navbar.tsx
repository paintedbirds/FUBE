import {
  IconButton,
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BellIcon, CalendarIcon } from '@/assets/icons';

export const Navbar = (props: FlexProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      p={{ base: 12 }}
      alignItems="center"
      bg="white"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...props}
    >
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Notifications"
          icon={<BellIcon />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Calendar"
          icon={<CalendarIcon />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <UserAvatar />
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const UserAvatar = () => {
  return (
    <HStack>
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
      />
      <VStack
        display={{ base: 'none', md: 'flex' }}
        alignItems="flex-start"
        spacing="1px"
        ml="2"
      >
        <Text fontSize="sm">Jane</Text>
        <Text fontSize="sm" color="gray.600">
          Doe
        </Text>
      </VStack>
    </HStack>
  );
};