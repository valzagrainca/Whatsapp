import express from 'express';
import { UserController } from '../UI/controllers/UserController';
import { UserService } from '../core/application/services/UserService';
import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
import User from '../core/domain/entities/users';
import { IBaseRepository } from '../infrastructure/repositoryInterfaces/IBaseRepository';
import { IUserService } from '../core/application/serviceInterfaces/IUserService';
import db from '../infrastructure/dbConnection/database';

const router = express.Router();
const userRepository: IBaseRepository<User>=new BaseRepository<User>(db);
const userService:IUserService = new UserService(userRepository);
const userController=new UserController(userService);


router.get('/users', userController.getUsers);

router.get('/edit-user/:userId',userController.getUserDetail);

router.post('/edit-user', userController.editUser);

router.post('/delete-user',userController.deleteUser);

export default router;