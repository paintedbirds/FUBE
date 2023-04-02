import { useEffect, useState } from 'react';
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

import { ObjectTableActionButtons } from '@/app/components/object-table/object-table-action-buttons';
import { getUsers } from '@/networking/services';
import { MainActionButtonProps, Users } from '@/utils/types';

const fetchUsers = async () => {
  try {
    const response = await getUsers();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const UsersList = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data as Users));
  }, []);

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
          {users.length > 0 ? (
            users.map((user) => (
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
                  <ObjectTableActionButtons
                    buttons={getActionButtons(user.id)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr><Td>Sin usuarios</Td></Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
