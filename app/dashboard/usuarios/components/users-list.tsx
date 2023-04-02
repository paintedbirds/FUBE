import { ObjectTableActionButtons } from '@/app/components/object-table/object-table-action-buttons';
import { MainActionButtonProps, Users } from '@/utils/types';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Avatar,
  VStack,
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';

export const UsersList = () => {
  const router = useRouter();

  const getActionButtons = (id: number): MainActionButtonProps[] => [
    {
      icon: <EditIcon />,
      onClick: () => router.push(`/dashboard/usuarios/editar-usuario/${id}`),
    },
    {
      icon: <DeleteIcon />,
      onClick: () => router.push(`/dashboard/usuarios/${id}`),
      color: 'red',
    },
    {
      icon: <ViewIcon />,
      onClick: () => router.push(`/dashboard/usuarios/${id}`),
      color: '#3182CE',
    },
  ];

  return (
    <TableContainer
      borderWidth="1px"
      borderRadius="lg"
      paddingTop="1.5rem"
      paddingX="2rem"
      marginTop="1.5rem"
    >
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th fontWeight={500} color="#2843B2">
              #ID
            </Th>
            <Th fontWeight={500} color="#2843B2" textTransform="capitalize">
              Usuario
            </Th>
            <Th fontWeight={500} color="#2843B2" textTransform="capitalize">
              Email
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody gap="3">
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>
                <HStack align="flex-start">
                  <Avatar
                    name={`${user.first_name} ${user.last_name}`}
                    src="https://bit.ly/broken-link"
                    size="sm"
                  />
                  <VStack width="100%" align="flex-start">
                    <Text fontSize="sm">{user.first_name}</Text>
                    <Text color="#808080" fontSize="sm">
                      {user.last_name}
                    </Text>
                  </VStack>
                </HStack>
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <ObjectTableActionButtons buttons={getActionButtons(user.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const users: Users = [
  {
    id: 1233,
    email: 'alegongon@gmail.com',
    first_name: 'Alejandro',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Gonzalez',
    password: '*********',
    user_permissions: [],
    username: 'ale.gongon',
  },
  {
    id: 1234,
    email: 'rm.derigo@gmail.com',
    first_name: 'Ruben',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Derigo',
    password: '*********',
    user_permissions: [],
    username: 'ruben.derigo',
  },
  {
    id: 1233,
    email: 'alegongon@gmail.com',
    first_name: 'Alejandro',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Gonzalez',
    password: '*********',
    user_permissions: [],
    username: 'ale.gongon',
  },
  {
    id: 1234,
    email: 'rm.derigo@gmail.com',
    first_name: 'Ruben',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Derigo',
    password: '*********',
    user_permissions: [],
    username: 'ruben.derigo',
  },
  {
    id: 1233,
    email: 'alegongon@gmail.com',
    first_name: 'Alejandro',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Gonzalez',
    password: '*********',
    user_permissions: [],
    username: 'ale.gongon',
  },
  {
    id: 1234,
    email: 'rm.derigo@gmail.com',
    first_name: 'Ruben',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Derigo',
    password: '*********',
    user_permissions: [],
    username: 'ruben.derigo',
  },
  {
    id: 1233,
    email: 'alegongon@gmail.com',
    first_name: 'Alejandro',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Gonzalez',
    password: '*********',
    user_permissions: [],
    username: 'ale.gongon',
  },
  {
    id: 1234,
    email: 'rm.derigo@gmail.com',
    first_name: 'Ruben',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Derigo',
    password: '*********',
    user_permissions: [],
    username: 'ruben.derigo',
  },
  {
    id: 1233,
    email: 'alegongon@gmail.com',
    first_name: 'Alejandro',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Gonzalez',
    password: '*********',
    user_permissions: [],
    username: 'ale.gongon',
  },
  {
    id: 1234,
    email: 'rm.derigo@gmail.com',
    first_name: 'Ruben',
    groups: [],
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_name: 'Derigo',
    password: '*********',
    user_permissions: [],
    username: 'ruben.derigo',
  },
];
