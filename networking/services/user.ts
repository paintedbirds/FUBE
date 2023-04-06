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

export const getUsers = async () => {
  return (await httpClient.get<Users>('/users/')).data;
};

export const createUser = async (user: UsersRequestDto) => {
  return (await (httpClient.post<User>('/users/create/', user))).data;
};
