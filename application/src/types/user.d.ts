export interface LoginProps {
  userEmail: string;
  userPassword: string;
}
export interface AuthProps {
  userName: string;
  userEmail: string;
  userImage: string | null;
  token: string;
}

export type UserProps = {
  userName: string;
  userEmail: string;
  userImage: string | null;
};
