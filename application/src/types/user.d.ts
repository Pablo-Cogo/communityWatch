export enum userRole {
  admin = 0,
  employee = 1,
  user = 2,
}

export interface User {
  _id?: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: userRole;
  userImage?: string;
}

export interface LoginProps {
  userEmail: string;
  userPassword: string;
}
