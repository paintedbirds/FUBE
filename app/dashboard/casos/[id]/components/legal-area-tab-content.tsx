import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Icon,
  Select,
  VStack,
  Text,
  HStack,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  TagLabel,
} from '@chakra-ui/react';

export const LegalAreaTabContent = () => (
  <HStack
    width="full"
    justify="space-between"
    alignItems="flex-start"
    paddingY="1rem"
  >
    <VStack minWidth="15%" gap={1}>
      <Text fontSize={18} fontWeight={700} width="full" marginBottom="0.5rem">
        Filtrar:
      </Text>

      <Text
        gap={2}
        width="full"
        display="flex"
        alignItems="center"
        color="rgba(10, 10, 10, 0.8)"
      >
        Casos
        <Icon />
      </Text>
      <Select>
        <option>Todos</option>
      </Select>

      <Text
        gap={2}
        width="full"
        display="flex"
        alignItems="center"
        color="rgba(10, 10, 10, 0.8)"
      >
        Etapas
        <Icon />
      </Text>
      <Select>
        <option>Todos</option>
      </Select>

      <Text
        gap={2}
        width="full"
        display="flex"
        alignItems="center"
        color="rgba(10, 10, 10, 0.8)"
      >
        Fases
        <Icon />
      </Text>
      <Select>
        <option>Todos</option>
      </Select>
    </VStack>
    <VStack minWidth="80%">
      <Accordion allowMultiple width="full">
        <AccordionItem
          borderRadius="20px"
          background="#F6F6F6"
          borderColor="white"
          padding="4px"
        >
          <AccordionButton _hover={{ borderRadius: '15px' }} zIndex="-1">
            <HStack justify="space-between" width="full">
              <VStack flex="1" textAlign="left">
                <Text fontSize={14} color="rgba(10, 10, 10, 0.5)" width="full">
                  Etapa 2
                </Text>
                <Text fontSize={18} width="full">
                  Coordinaciones
                </Text>
                <Text fontSize={14} color="rgba(10, 10, 10, 0.7)" width="full">
                  Fase: Preliminar
                </Text>
              </VStack>
              <Button rightIcon={<AddIcon />} variant="ghost" color="#2843B2" zIndex="1">
                Añadir
              </Button>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel>
            <TableContainer borderWidth="1px" borderRadius="20px" padding={2}>
              <Table variant="striped" size="sm">
                <Thead>
                  <Tr textTransform="capitalize">
                    <Th textTransform="capitalize">Juzgado</Th>
                    <Th textTransform="capitalize">Estado</Th>
                    <Th textTransform="capitalize">Notificación</Th>
                    <Th textTransform="capitalize">Acciónes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td minWidth="250px">
                      <Text minWidth="100wv">
                        Ejecución de Mandamiento de Aprehensión
                      </Text>
                    </Td>
                    <Td>
                      <Tag size="md" borderRadius="full" variant="solid">
                        <TagLabel>Suspendida</TagLabel>
                      </Tag>
                    </Td>
                    <Td>
                      <Text>12/01/2023</Text>
                      <Text>Recolección de datos primera cita</Text>
                    </Td>
                    <Td gap={3} width="full" display="flex" justifyContent="center">
                      <ViewIcon color="#2843B2" />
                      <EditIcon color="#2843B2" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Abordajes</Td>
                    <Td>
                      <Tag size="md" borderRadius="full" variant="solid">
                        <TagLabel>Pendiente</TagLabel>
                      </Tag>
                    </Td>
                    <Td>
                      <Text>13/01/2023</Text>
                      <Text>Denuncia</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Fiscalía</Td>
                    <Td>
                      <Tag size="md" borderRadius="full" variant="solid">
                        <TagLabel>Realizada</TagLabel>
                      </Tag>
                    </Td>
                    <Td>
                      <Text>14/01/2023</Text>
                      <Text>Evaluación</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  </HStack>
);
