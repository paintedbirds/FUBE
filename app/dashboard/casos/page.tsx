'use client';

import { ReactNode } from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

import { DataItem, MainActionButtonProps } from '@/app/types';
import { ObjectTable } from '@/app/components/object-table';
import { ObjectTabs } from '@/app/components/object-tabs';

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
  return (
    <main>
      <Flex direction="column">
        <Box width="full">
          <Text fontWeight="bold" fontSize="4xl">
            Seguimiento de Casos:
          </Text>
          <Text color="#808080" fontSize="xl">
            Encuentra y realiza el seguimiento de todos los casos registrados en
            FUBE
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
            Registrar caso
          </Button>
        </Flex>
      </Flex>
    </main>
  );
}
