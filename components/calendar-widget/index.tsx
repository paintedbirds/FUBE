import { CalendarRegularIcon } from '@/assets/icons/calendar-regular';
import { VStack, Text, Divider, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { NoEvents } from './no-events';

export const CalendarWidget = () => {
  const currentDate = useMemo(() => new Date(), []);
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
      }).format(currentDate),
    [currentDate]
  );

  return (
    <VStack
      background="white"
      borderRadius="5px"
      alignItems="flex-start"
      px={16}
      py={10}
      width="full"
      borderWidth="1px"
    >
      <HStack>
        <CalendarRegularIcon />
        <Text fontSize={18}>Eventos del dia de hoy ({date})</Text>
      </HStack>
      <Divider />
      <NoEvents currentDate={date} />
    </VStack>
  );
};
