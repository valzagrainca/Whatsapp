import express from 'express';
import { ChatService } from '../core/application/services/ChatService';
import { ChatController } from '../UI/controllers/ChatController';
import { IBaseRepository } from '../infrastructure/repositoryInterfaces/IBaseRepository';
import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
import Chat from '../core/domain/entities/chats';
import { IChatService } from '../core/application/serviceInterfaces/IChatService';
import User from '../core/domain/entities/users';
import db from '../infrastructure/dbConnection/database';

const router = express.Router();
const chatRepository: IBaseRepository<Chat>=new BaseRepository<Chat>(db);
const userRepository: IBaseRepository<User>=new BaseRepository<User>(db);
const chatService:IChatService = new ChatService(userRepository,chatRepository);
const chatController=new ChatController(chatService);

router.get('/',chatController.redirectToUsers);

router.get('/userchats/:userId',chatController.getUserChats);

router.get('/messages',chatController.getMessages);

export default router;