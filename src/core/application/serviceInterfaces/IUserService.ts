import User from "../../domain/entities/users";

export interface IUserService {
  getUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User | null>;
  deleteUserById: (id: number) => Promise<boolean>;
  updateUser: (
    id: number,
    first_name: string,
    last_name: string,
    number: string,
    status: string,
    profile_picture: string
  ) => Promise<boolean>;
}
