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
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteUser, getUserByID } from '@/networking/services';
import { useState, useEffect } from 'react';
import { User } from '@/utils/types';

export default function ViewUser({ params }: never) {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [user, setUser] = useState<User>();
  const [showConfrimMessage, setShowConfrimMessage] = useState(false);
  const { id } = params;
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserByID(id);
      if (response.status === 200) {
        setUser(response.data as unknown as User);
        onOpen();
        return;
      }
      alert('Error al consultar usuario...');
    };
    fetchData();
  }, [id, onOpen]);

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  const onEdit = () => {
    onClose();
    router.push(`/dashboard/usuarios/editar-usuario/${id}`);
  };

  const onShowConfirmMessage = () => {
    setShowConfrimMessage(!showConfrimMessage);
  };

  const onDeleteUser = async () => {
    try {
      const response = await deleteUser(id);
      if (response.status === 204) {
        toast({
          position: 'top',
          title: `Usuario eliminado.`,
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
        router.push(`/dashboard/usuarios`);
        return;
      }
      toast({
        position: 'top',
        title: 'Error eliminando al usuario.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error eliminando al usuario.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
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
                background="#F2F2F2"
                color="#2843B2"
                width="100%"
                border="1px solid #F2F2F2"
                leftIcon={<EditIcon />}
                onClick={onEdit}
              >
                Editar Usuario
              </Button>
              {showConfrimMessage ? (
                <VStack width="100%">
                  <Text color="#E53E3E" fontSize="sm" marginY="1rem" fontWeight="semibold">
                    ¿Seguro que quieres dar de baja a este usuario?
                  </Text>
                  <HStack width="100%" justify="space-between">
                    <Button width="50%" onClick={onShowConfirmMessage}>No</Button>
                    <Button width="50%" background="#FA3E32" color="white" onClick={onDeleteUser}>Si, dar de baja</Button>
                  </HStack>
                </VStack>
              ) : (
                <Button
                  width="100%"
                  size="lg"
                  color="white"
                  background="#E53E3E"
                  leftIcon={<DeleteIcon />}
                  onClick={onShowConfirmMessage}
                >
                  Dar de baja
                </Button>
              )}
            </VStack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
