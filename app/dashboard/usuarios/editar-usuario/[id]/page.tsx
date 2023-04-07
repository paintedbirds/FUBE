'use client';

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  DrawerOverlay,
  VStack,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@/utils/types';
import { UserForm } from '../../components/user-form';
import { UserPreview } from '../../components/user-preview';
import {
  getUserByID,
  updateUser,
  UsersRequestDto,
} from '@/networking/services';

export default function UserEditByIDPage({ params }: never) {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [disablePreviewTab, setDisablePreviewTab] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState<User>();
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

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  const onEditData = () => {
    setTabIndex(0);
    setDisablePreviewTab(true);
  };

  const onValidated = (data: User) => {
    setUser(data);
    setDisablePreviewTab(false);
    setTabIndex(1);
  };

  const onEditUser = async () => {
    try {
      const response = await updateUser(id, user as unknown as UsersRequestDto);
      if (response.status === 200) {
        toast({
          position: 'top',
          title: '¡Usuario editado éxitosamente!',
          description: "Ya puedes visualizar su cuenta.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push(`/dashboard/usuarios/${id}`);
        return;
      }
      toast({
        position: 'top',
        title: 'Error al editar al usuario.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error al editar al usuario.',
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
        <DrawerBody marginTop="3rem">
          <VStack gap={10}>
            <Box>
              <Text color="#2843B2" fontWeight="semibold" fontSize="2xl">
                Edición de Usuario
              </Text>
              <Text color="#808080" fontSize="sm">
                A continuación se te permitirá editar toda la información y rol
                de{' '}
                <Text textDecoration="underline" as="span">
                  {user?.first_name}
                </Text>{' '}
                en el sistema.
              </Text>
            </Box>
            <Tabs
              variant="enclosed"
              width="100%"
              isFitted
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList>
                <Tab isDisabled={!disablePreviewTab}>Completar datos</Tab>
                <Tab isDisabled={disablePreviewTab}>Confirmar datos</Tab>
              </TabList>
              <TabPanels marginTop="1rem">
                <TabPanel>
                  {user && (
                    <UserForm
                      user={user}
                      onCancel={onCloseDrawer}
                      onValidated={onValidated}
                      isEditingMode
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  {user && (
                    <UserPreview
                      onCancel={onCloseDrawer}
                      onConfirm={onEditUser}
                      onEdit={onEditData}
                      user={user}
                      isEditingMode
                    />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
