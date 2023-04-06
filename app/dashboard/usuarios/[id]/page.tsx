'use client';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Text,
  Avatar,
  Stack,
  Flex,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getUsers } from '@/networking/services';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/utils/types';

export default function ViewUser({ params }: never) {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  const [user, setUser] = useState<User>();
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const { id } = params;

  useEffect(() => {
    const temp = data?.find((obj) => obj.id == id);
    setUser(temp as User);
  }, [isLoading, data, user]);

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  const onEdit = () => {
    onClose();
    router.push(`/dashboard/usuarios/editar-usuario/${id}`);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onCloseDrawer} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody marginTop="5rem">
          <Flex justify="space-between" direction="column" height="100%">
            <Stack>
              <Avatar
                name={`${user?.first_name} ${user?.last_name}`}
                src="https://bit.ly/broken-link"
                size="xl"
              />
              <Text fontSize="xl" fontWeight="bold">
                {`${user?.first_name} ${user?.last_name}`}{' '}
              </Text>
              <Text fontSize="xs" color="#808080">
                {user?.email}
              </Text>
            </Stack>

            <VStack marginBottom="1rem">
              <Divider />
              <Button
                variant="solid"
                size="lg"
                background="#2843B2"
                color="#fff"
                width="100%"
                leftIcon={<EditIcon />}
                onClick={onEdit}
              >
                Editar Usuario
              </Button>
              <Button
                width="100%"
                size="lg"
                color="red"
                background="#FA3E320D"
                leftIcon={<DeleteIcon />}
              >
                Dar de baja
              </Button>
            </VStack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
