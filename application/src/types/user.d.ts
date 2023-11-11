export interface LoginProps {
  userEmail: string;
  userPassword: string;
}

export interface AuthProps {
  userName: string;
  userEmail: string;
  userImage: string | null;
  isLogged: boolean;
  token: string;
}

export type UserProps = {
  userName: string;
  userEmail: string;
  userImage: string | null;
};

export interface ResponseAuthProps {
  userName: string;
  userEmail: string;
  userImage: string | null;
  isLogged: boolean;
}

export interface SignUpMailProps {
  userName: string;
  userEmail: string;
  personPhone?: string;
  userCpf?: string;
  userDate?: string;
  userPassword?: string;
  userConfirmPassword?: string;
  userImage?: string;
}

export interface SignUpMailMasksProps {
  userCpf?: string;
}

export enum UserRole {
  admin = 0,
  employee = 1,
  user = 2,
}

export interface User {
  id?: string;
  userName: string;
  userEmail: string;
  userPassword: string | null;
  userRole: UserRole;
  userImage?: string;
}
