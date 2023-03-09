import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../core/application/serviceInterfaces/IUserService';

export class UserController{
    constructor(
        private readonly userService: IUserService
    ){}

    getUsers = async (req: Request, res: Response, next: NextFunction)=>{
        const users = await this.userService.getUsers('Users'); 
        res.render('admin/users', {
                users: users,
                pageTitle: 'Users',
        });
    };

    getUserDetail = async (req: Request, res:Response, next: NextFunction)=>{
        const userId:number =Number(req.params.userId);

        const user=await this.userService.getUserById(userId,'Users');
        res.render('admin/edit-user',{
            pageTitle: 'Edit User',
            user:user
        });
    };

    deleteUser= async (req: Request, res:Response, next: NextFunction)=>{
        const userId:number=req.body.userId;
        this.userService.deleteUserById(userId,'Users');
        res.redirect('/admin/users');
    };

    editUser=(req: Request, res:Response, next: NextFunction)=>{
            const id:number=req.body.user_id;
            const first_name:string=req.body.first_name;
            const last_name:string=req.body.last_name;
            const number:string=req.body.number;
            const code:string=req.body.code;
            const status:string=req.body.status;
            const profile_picture:string=req.body.profile_picture;
            this.userService.updateUser(id,first_name,last_name,number,code,status,profile_picture,'Users');
            res.redirect('/admin/users')
    };
}