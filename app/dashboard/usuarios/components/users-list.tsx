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
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { ObjectTableActionButtons } from '@/components/object-table/object-table-action-buttons';
import { getUsers } from '@/networking/services';
import { MainActionButtonProps, User } from '@/utils/types';
import { useEffect, useState } from 'react';

export const UsersList = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  useEffect(() => {
    setMounted(true);
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

  // TODO: remove when user feedback be implemented
  if (isError) {
    return <span>Error to fetch users.</span>;
  }

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
          {mounted &&
            (isLoading ? (
              <Tr width="100%">
                <Td>
                  <Skeleton height="50px" />
                </Td>
                <Td>
                  <Skeleton height="50px" />
                </Td>
                <Td>
                  <Skeleton height="50px" />
                </Td>
                <Td>
                  <Skeleton height="50px" />
                </Td>
              </Tr>
            ) : users && users.data.length > 0 ? (
              users.data
                .filter(
                  (user: User) =>
                    user.first_name && user.last_name && user.is_active
                )
                .map((user: User) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>
                      <HStack align="flex-start">
                        <Avatar
                          name={`${user.first_name} ${user.last_name}`}
                          size="md"
                        />
                        <Flex
                          direction="column"
                          width="100%"
                          align="flex-start"
                        >
                          <Text fontSize="sm">{user.first_name}</Text>
                          <Text color="#808080" fontSize="sm">
                            {user.last_name}
                          </Text>
                        </Flex>
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
              <Tr>
                <Td>Sin usuarios</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
