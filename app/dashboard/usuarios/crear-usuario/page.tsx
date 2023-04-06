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
import { UserForm } from '../components/user-form';
import { UserPreview } from '../components/user-preview';
import { createUser, UsersRequestDto } from '@/networking/services';
import { usersCache } from '../utils/cache';

export default function UserCreation() {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  const [disablePreviewTab, setDisablePreviewTab] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    console.log(usersCache);
  }, []);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  const onValidated = (data: User) => {
    setUser(data);
    setDisablePreviewTab(false);
    setTabIndex(1);
  };

  const onEdit = () => {
    setTabIndex(0);
    setDisablePreviewTab(true);
  };

  const onCreateUser = async () => {
    try {
      const response = await createUser(user as unknown as UsersRequestDto);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onCloseDrawer} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody marginTop="3rem">
          <VStack gap={10}>
            <Box width="100%">
              <Text color="#2843B2" fontWeight="semibold" fontSize="2xl">
                Crear un usuario
              </Text>
              <Text color="#808080" fontSize="sm">
                Crea un usuario para que pueda accedar y colaborar junto al
                equipo de FUBE.
              </Text>
            </Box>
            <Tabs
              variant="enclosed"
              width="100%"
              index={tabIndex}
              onChange={handleTabsChange}
              isFitted
            >
              <TabList>
                <Tab isDisabled={!disablePreviewTab}>Completar datos</Tab>
                <Tab isDisabled={disablePreviewTab}>Confirmar datos</Tab>
              </TabList>
              <TabPanels marginTop="1rem">
                <TabPanel>
                  <UserForm
                    user={user}
                    onCancel={onCloseDrawer}
                    onValidated={onValidated}
                  />
                </TabPanel>
                <TabPanel>
                  {user && (
                    <UserPreview
                      onCancel={onCloseDrawer}
                      onConfirm={onCreateUser}
                      onEdit={onEdit}
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
  );
}
