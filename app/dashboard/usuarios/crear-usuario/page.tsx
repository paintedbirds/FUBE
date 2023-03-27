'use client';

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
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

import { CreateUserForm } from '@/app/components/create-user-form';
import { CreateUserPreview } from '@/app/components/create-user-preview';

export default function UserCreation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isDataValid, setIsDataValid] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(onOpen, [onOpen]);

  useEffect(() => {
    if (isDataValid) {
      setTabIndex(1);
    }
  }, [isDataValid]);

  const onCloseDrawer = () => {
    onClose();
    router.push('/dashboard/usuarios');
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

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
              / Crear usuario
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={10}>
              <Box>
                <Text color="#2843B2" fontWeight="lg" fontSize="2xl">
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
                isFitted
                index={tabIndex}
                onChange={handleTabsChange}
              >
                <TabList>
                  <Tab isDisabled={isDataValid}>Completar datos</Tab>
                  <Tab isDisabled={!isDataValid}>Confirmar datos</Tab>
                </TabList>
                <TabPanels marginTop="1rem">
                  <TabPanel>
                    <CreateUserForm
                      setIsDataValid={setIsDataValid}
                      onCancel={onCloseDrawer}
                    />
                  </TabPanel>
                  <TabPanel>
                    <CreateUserPreview onCancel={onCloseDrawer} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
