import User from '../../domain/entities/users'
import { IBaseRepository } from '../../../infrastructure/repositoryInterfaces/IBaseRepository';
import { IUserService } from '../serviceInterfaces/IUserService';

export class UserService implements IUserService{
    constructor(private userRepository: IBaseRepository<User>){}
    
    getUsers=async(tableName : string): Promise<User[]>=>{
        return await this.userRepository.fetchAll(tableName);
    }

    getUserById=async(id : number, tableName : string):Promise<User | null>=>{
        return await this.userRepository.findById(id,tableName);
    }

    deleteUserById=async(id: number, tableName : string):Promise<Boolean>=>{
        return await this.userRepository.deleteById(id,tableName);
    }

    updateUser=async(id: number,first_name: string,last_name: string,number: string,status: string,profile_picture: string, tableName : string):Promise<Boolean>=>{
        const user= new User(id,first_name,last_name,number,status,profile_picture);
        return await this.userRepository.updateById(tableName,user,{id:id});
    }
}