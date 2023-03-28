'use client';

import { ReactNode, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { ObjectTabs } from '@/app/components/object-tabs';
import { ReporterForm } from './components/reporter-form';
import { FormTabsProvider } from './hooks/useFormTabs';
import { AggressorForm } from './components/aggressor-form';

const tabs: string[] = [
  'Denunciante',
  'Agresor',
  'NNA',
  'Familia',
  'Vivienda',
  'Complementaria',
  'FUBE',
];

const tabContents: ReactNode[] = [
  <ReporterForm key="denunciante" />,
  <AggressorForm key="agresor" />,
];

export default function CasosPage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <FormTabsProvider setTabIndex={setTabIndex} tabIndex={tabIndex}>
      <main>
        <Flex direction="column" marginBottom="100px">
          <Flex align="center" justify="space-between" paddingRight="60px">
            <Box width="full" maxWidth="60%">
              <Text fontWeight="bold" fontSize="4xl">
                Registro de Primera Cita de Caso:
              </Text>
              <Text color="#808080" fontSize="xl">
                Comienza a registrar una nueva cita para un caso. Todos los
                datos se guardarán automáticamente para que puedan continuarse
                en otro momento
              </Text>
            </Box>
            <Box>
              <Text color="gray">Nro de caso: XXXX/2023</Text>
              <Text color="gray">Fecha ingreso: 01/01/2023</Text>
              <Text color="gray">Fecha 1° entrevista: 01/01/2023</Text>
            </Box>
          </Flex>
          <Flex marginTop="2.5rem" gap="60px" minWidth="full">
            <ObjectTabs
              tabs={tabs}
              tabContents={tabContents}
              variant="enclosed"
              index={tabIndex}
              onChange={(index) => {
                setTabIndex(index);
              }}
            />
          </Flex>
        </Flex>
      </main>
    </FormTabsProvider>
  );
}
