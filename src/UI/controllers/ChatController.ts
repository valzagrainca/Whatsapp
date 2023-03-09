import { Request, Response, NextFunction } from 'express';
import { IChatService } from '../../core/application/serviceInterfaces/IChatService';

export class ChatController{
    constructor(private chatService:IChatService){}

    getUserChats=async(req:Request, res:Response, next:NextFunction)=>{
        const userId: number=Number(req.params.userId);
        const result=await this.chatService.getChats(userId,'get_user_chats');

        res.render('chats/userchats',{
            pageTitle: 'User Chat',
            user:result.user,
            chats:result.chats
        });
    }

    getMessages=async(req:Request, res:Response, next:NextFunction)=>{
        const chatId: number=Number(req.params.chatId);
        const messages=await this.chatService.getChats(chatId,'v_view_chat');
        res.json(messages);
    };
}
