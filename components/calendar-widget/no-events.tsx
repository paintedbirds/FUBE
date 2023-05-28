import { NoEventsIcon } from '@/assets/icons/no-events';
import { VStack, Text } from '@chakra-ui/react';

interface NoEventsProps {
  currentDate: string;
}

export const NoEvents = ({ currentDate }: NoEventsProps) => {
  return (
    <VStack
      justifyContent="flex-start"
      alignItems="center"
      width="full"
      height="300px"
      paddingTop="2rem"
      color="#0A0A0AB2"
    >
      <NoEventsIcon />
      <Text fontSize={16} lineHeight="21.6px">
        No hay eventos disponibles.
      </Text>
      <Text textAlign="center" width="230px" fontSize={14} color="#0A0A0A80">
        Actualmentes no hay eventos disponibles en el dia de hoy ({currentDate}
        ).
      </Text>
    </VStack>
  );
};
