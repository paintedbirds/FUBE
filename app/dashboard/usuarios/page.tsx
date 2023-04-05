'use client';

import { ReactNode } from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';

import { DataItem, MainActionButtonProps } from '@/types';
import { ObjectTable } from '@/components/object-table';
import { ObjectTabs } from '@/components/object-tabs';

const tabs: string[] = [
  'Todos',
  'Legal',
  'Psicologia',
  'Social',
  'Administrativa',
];

const tableHeads: string[] = ['ID', 'Usuario', 'Área', 'Email'];

const data: DataItem[] = [
  {
    id: '010929',
    usuario: 'Leandro Martinez',
    area: 'Administrativa',
    email: 'leamar@fube.com',
  },
];

const actionButtons: MainActionButtonProps[] = [
  { icon: <EditIcon />, onClick: () => alert('edit') },
  { icon: <DeleteIcon />, onClick: () => alert('delete'), color: 'red' },
  { icon: <ViewIcon />, onClick: () => alert('view'), color: '#3182CE' },
];

const tabContents: ReactNode[] = [
  // TODO: define content for the diferents tabs
  <ObjectTable
    key="1"
    tableHeads={tableHeads}
    data={data}
    actionButtons={actionButtons}
  />,
];

export default function Home() {
  return (
    <main>
      <Flex direction="column">
        <Box width="full">
          <Text fontWeight="bold" fontSize="4xl">
            Administración de Usuarios
          </Text>
          <Text color="#808080" fontSize="xl">
            Visualiza a todos los usuarios de FUBE organizados por sus
            respectivas áreas
          </Text>
        </Box>
        <Flex marginTop="2.5rem" gap="60px">
          <ObjectTabs tabs={tabs} tabContents={tabContents} />
          <Button
            bg="#2843B2"
            color="white"
            px="24px"
            py="16px"
            height="60px"
            rightIcon={<AddIcon />}
          >
            Crear Usuario
          </Button>
        </Flex>
      </Flex>
    </main>
  );
}
