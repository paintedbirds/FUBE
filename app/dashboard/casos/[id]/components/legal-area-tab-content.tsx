import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  Select,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';

export const LegalAreaTabContent = () => (
  <HStack
    width="full"
    justify="space-between"
    alignItems="flex-start"
    paddingY="1rem"
  >
    <VStack width="20%" gap={1}>
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
    <VStack width="full" paddingInlineStart="2rem">
      <Accordion allowMultiple width="full">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Etapa 2
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Etapa 3
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  </HStack>
);
