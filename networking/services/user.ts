import { User, Users } from '@/utils/types';
import { httpClient } from '../http-client';

export interface UsersRequestDto {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  group_names: string[];
  perm_codenames: string[];
}

export const getUsers = () => {
  return httpClient.get<Users>('/users/');
};

export const getUserByID = (id: number) => {
  return httpClient.get<User>(`/users/${id}/`);
};

export const createUser = (user: UsersRequestDto) => {
  return httpClient.post('/users/create/', user);
};

export const updateUser  = async (id: number, user: UsersRequestDto) => {
  return httpClient.put<User>(`/users/${id}/`, user);
};

export const deleteUser = async (id: number) => {
  return httpClient.delete(`/users/${id}/`);
};
