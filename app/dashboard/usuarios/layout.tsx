'use client';

import { ReactNode } from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

import { ObjectTabs } from '@/components/object-tabs';
import { UsersList } from './components/users-list';

const tabs: string[] = ['Todos'];

const tabContents: ReactNode[] = [<UsersList key="1" />];

interface UsersLayout {
  children: ReactNode;
}

export default function UsersLayout({ children }: UsersLayout) {
  const router = useRouter();

  const onCreateUser = () => {
    router.push('/dashboard/usuarios/crear-usuario');
  };

  return (
    <main>
      <Flex direction="column" gap="8">
        <Box>
          <Text fontWeight="bold" fontSize="3xl">
            Administración de Usuarios
          </Text>
          <Text color="#808080" fontSize="lg" width="500px">
            Visualiza a todos los usuarios de FUBE organizados por sus
            respectivas áreas
          </Text>
        </Box>

        <Button
          marginInlineEnd="auto"
          background="#2843B2"
          color="white"
          rightIcon={<AddIcon />}
          onClick={onCreateUser}
        >
          Crear Usuario
        </Button>
        <ObjectTabs tabs={tabs} tabContents={tabContents} />
      </Flex>
      {children}
    </main>
  );
}
