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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@/utils/types';
import { UserForm } from '../../components/user-form';
import { UserPreview } from '../../components/user-preview';
import { getUsers } from '@/networking/services';
import { useQuery } from '@tanstack/react-query';

export default function UserEditByIDPage({ params }: never) {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  const [disablePreviewTab, setDisablePreviewTab] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
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

  const onEditUser = () => {
    // TODO: edit user and push route to view user
    alert('user edited');
  };

  return (
    !isLoading && (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onCloseDrawer}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody marginTop="3rem">
            <VStack gap={10}>
              <Box>
                <Text color="#2843B2" fontWeight="semibold" fontSize="2xl">
                  Edición de Usuario
                </Text>
                <Text color="#808080" fontSize="sm">
                  A continuación se te permitirá editar toda la información y
                  rol de {user?.first_name} en el sistema.
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
                      />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  );
}
