
export type Users = User[];

export interface User {
  area?: string;
  user_type?: string;
  date_joined?: string;
  email: string;
  first_name: string;
  groups: string[];
  id: number;
  is_active?: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login?: string;
  last_name: string;
  password: string;
  user_permissions: string[];
  username: string;
}
