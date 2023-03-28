'use client';

import { useEffect } from 'react';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Text,
  Avatar,
  Stack,
  HStack,
  Flex,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

// TODO: define correct type to PageProps
export default function ViewUser({ params }: never) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = params;

  useEffect(onOpen, [onOpen]);

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  console.log(id);

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onCloseDrawer}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text fontSize="sm" fontWeight="semibold">
              <Text color="#808080" as="span" fontWeight="thin">
                Dashboard / Usuarios
              </Text>{' '}
              / Ver usuario
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Flex justify="space-between" direction="column" height="100%">
              <Stack>
                <Avatar
                  name="Gonzalo Perez "
                  src="https://bit.ly/broken-link"
                  size="xl"
                />
                <Text fontSize="xl" fontWeight="semibold">
                  Gonzalo Perez{' '}
                </Text>
                <Text fontSize="xs" color="#808080">
                  gonzalezper@fube.com
                </Text>
                <Text fontSize="xs" color="#808080">
                  +23938899
                </Text>
                <HStack paddingTop="1rem">
                  <Text
                    rounded={100}
                    fontSize="lg"
                    px="1rem"
                    py="0.3rem"
                    bgColor="black"
                    color="white"
                  >
                    Legal
                  </Text>
                  <Text
                    rounded={100}
                    fontSize="lg"
                    px="1rem"
                    py="0.3rem"
                    bgColor="#D9D9D978"
                  >
                    Abogado
                  </Text>
                </HStack>
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
                  Editar Usuario
                </Button>
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
