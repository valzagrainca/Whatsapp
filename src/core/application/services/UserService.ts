import User from '../../domain/entities/users'
import { IBaseRepository } from '../../../infrastructure/repositoryInterfaces/IBaseRepository';
import { IUserService } from '../serviceInterfaces/IUserService';

export class UserService implements IUserService{
    constructor(private userRepository: IBaseRepository<User>){}
    
    getUsers=async(): Promise<User[]>=>{
        return await this.userRepository.fetchAll('Users');
    }

    getUserById=async(id : number):Promise<User | null>=>{
        return await this.userRepository.findById(id,'Users');
    }

    deleteUserById=async(id: number):Promise<any>=>{
        return await this.userRepository.deleteById(id,'Users');
    }

    updateUser=async(id: number,first_name: string,last_name: string,number: string,status: string,profile_picture: string):Promise<any>=>{
        const user= new User(id,first_name,last_name,number,status,profile_picture);
        return await this.userRepository.updateById('Users',user,{id:id});
    }
}