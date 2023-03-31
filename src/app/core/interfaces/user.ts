import {IRoles} from "./roles";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userPermissions: any[];
  roles: IRoles[];
  projects: any[];
}

export interface QueryTable<T> {
  data: T[],
  totalCount: number,
  page: number,
  limit: number,
}
