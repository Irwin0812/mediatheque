import 'reflect-metadata';

export interface IUser {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  is_admin: boolean;
}

export interface IUserCreate extends Omit<IUser, 'id'> {
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}
