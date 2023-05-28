'use client';

import { AddIcon } from '@/assets/icons/add';
import { AddEventIcon } from '@/assets/icons/add-event';
import { AddUserIcon } from '@/assets/icons/add-user';
import { CalendarWidget } from '@/components/calendar-widget';
import {
  ObjectCardButton,
  ObjectCardButtonProps,
} from '@/components/object-card-button';
import { VStack, Text, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

const buttons: ObjectCardButtonProps[] = [
  {
    label: 'Registrar un nuevo caso',
    icon: <AddIcon />,
    path: "/dashboard/casos/registro"
  },
  {
    label: 'Añadir un nuevo evento',
    icon: <AddEventIcon />
  },
  {
    label: 'Crear nuevo usuario',
    icon: <AddUserIcon />,
    path: "/dashboard/usuarios/crear-usuario"
  },
];

export default function DashboardPage() {
  const { data } = useSession();
  const currentDate = useMemo(() => new Date(), []);
  const date = useMemo(() => new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate), [currentDate]);

  return (
    <main>
      <VStack>
        <VStack
          textAlign="start"
          background="white"
          paddingX="2rem"
          paddingY="2rem"
          borderRadius="5px"
          width="full"
          marginBottom="0.5rem"
          borderWidth="1px"
        >
          <Text fontSize={16} color="rgba(10, 10, 10, 0.5)" width="full">
            Hoy es {date}.
          </Text>
          <Text fontSize={24} width="full" fontWeight="bold">
            Bienvenido de vuelta <Text as="span" color="#2843B2">{data?.user.first_name ?? "Usuario"}</Text>.
          </Text>
          <Text fontSize={16} width="full">
            Actualmente estas registrado como un Abogado en el area Legal.
          </Text>
        </VStack>
        <HStack width="full" gap="3" alignItems="flex-start">
          {buttons.map((btn) => (
            <ObjectCardButton key={btn.label} {...btn} />
          ))}
          <CalendarWidget />
        </HStack>
      </VStack>
    </main>
  );
}
