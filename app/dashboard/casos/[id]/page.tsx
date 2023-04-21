'use client';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LegalAreaTabContent } from './components/legal-area-tab-content';

export default function CasePage() {
  return (
    <main>
      <VStack gap={4}>
        <HStack width="full" justifyContent="space-between">
          <VStack justifyContent="flex-start" width="auto">
            <Text fontSize={14} color="#00000080" width="full">
              Seguimiento de un caso
            </Text>
            <Text fontSize={24} fontWeight="semibold" width="full">
              Caso: XXXXX
            </Text>
          </VStack>
          <VStack justify="flex-start" width="auto">
            <Text fontSize={16} textAlign="start" width="full">
              Fecha ingreso: DD/MM/AAAA
            </Text>
            <Text fontSize={16} textAlign="start" width="full">
              Fecha fin: -/-/-
            </Text>
          </VStack>
        </HStack>
        <HStack width="full" gap={1}>
          <Text>Programa:</Text>
          <HStack spacing={4}>
            <Tag size="lg" borderRadius="full" variant="solid">
              <TagLabel>Programa 1</TagLabel>
              <ChevronDownIcon />
            </Tag>
          </HStack>
          <Icon />

          <Text>Subprograma:</Text>
          <HStack spacing={4}>
            <Tag size="lg" borderRadius="full" variant="solid">
              <TagLabel>En seguimiento</TagLabel>
              <ChevronDownIcon />
            </Tag>
          </HStack>
          <Icon />

          <Text>Estado:</Text>
          <HStack spacing={4}>
            <Tag size="lg" borderRadius="full" variant="solid">
              <TagLabel>Activo</TagLabel>
              <ChevronDownIcon />
            </Tag>
          </HStack>
          <Icon />
        </HStack>
        <Tabs width="full">
          <TabList>
            <Tab>Informacion del caso</Tab>
            <Tab>Área Legal</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>to validate...</p>
            </TabPanel>
            <TabPanel display="flex">
              <LegalAreaTabContent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </main>
  );
}
