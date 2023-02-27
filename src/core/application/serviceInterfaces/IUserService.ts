import User from "../../domain/entities/users";

export interface IUserService {
  getUsers: (tableName : string) => Promise<User[]>;
  getUserById: (id: number, tableName : string) => Promise<User | null>;
  deleteUserById: (id: number,tableName : string) => Promise<Boolean>;
  updateUser: (
    id: number,
    first_name: string,
    last_name: string,
    number: string,
    status: string,
    profile_picture: string,
    tableName : string
  ) => Promise<Boolean>;
}
