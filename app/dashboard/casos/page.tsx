'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

import { DataItem, MainActionButtonProps } from '@/types';
import { ObjectTable } from '@/components/object-table';
import { ObjectTabs } from '@/components/object-tabs';

const tabs: string[] = ['Todos'];

const tableHeads: string[] = ['#Caso', 'Encargado', 'Estado', 'Fecha ingreso'];

const data: DataItem[] = [
  {
    id: '010929',
    manager: 'Leandro Martinez',
    status: 'Administrativa',
    date: 'leamar@fube.com',
  },
];

const actionButtons: MainActionButtonProps[] = [
  { icon: <EditIcon />, onClick: () => alert('edit') },
  { icon: <ViewIcon />, onClick: () => alert('view'), color: '#3182CE' },
];

const tabContents: ReactNode[] = [
  // TODO: define content for the different tabs
  <ObjectTable
    key="1"
    tableHeads={tableHeads}
    data={data}
    actionButtons={actionButtons}
  />,
];

export default function CasosPage() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/dashboard/casos/registro');
  };

  return (
    <main>
      <Flex direction="column" gap="8">
        <Box width="full">
          <Text fontWeight="bold" fontSize="4xl">
            Seguimiento de Casos
          </Text>
          <Text color="#808080" fontSize="xl">
            Encuentra y realiza el seguimiento de todos los casos registrados en
            FUBE
          </Text>
        </Box>

        <Button
          marginInlineEnd="auto"
          background="#2843B2"
          color="white"
          rightIcon={<AddIcon />}
          onClick={handleRegisterClick}
        >
          Registrar caso
        </Button>
        <ObjectTabs tabs={tabs} tabContents={tabContents} />
      </Flex>
    </main>
  );
}
