import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../core/application/serviceInterfaces/IUserService';
import {createToken, validateToken} from '../util/jwt';

export class AuthController{
    constructor(
        private readonly userService: IUserService
    ){}
    
    getLogin=(req:Request, res:Response, next:NextFunction)=>{
        res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login'
        });
    }
    postLogin=async (req:Request, res:Response, next:NextFunction)=>{
        const phone=req.body.phone;
        const code=req.body.code;
        const user=await this.userService.getUserByPhoneNumber(phone,'Users');
        if(user!=null){
            if(user.code===code){
                const accessToken= createToken(user);

                res.cookie("access-token", accessToken, {
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true
                })
                
                res.redirect(`/userchats/${user.id}`);
            }
            else{
                res.json("Error username or password");
            }
        }
        else{
            res.json("Error username or password");
        }
        
    }

    getSignUp=(req:Request, res:Response, next:NextFunction)=>{
        res.render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup'
        });
    }

    postSignUp=async (req:Request, res:Response, next:NextFunction)=>{
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const phone:string=req.body.phone;
        const status=req.body.status;
        const profilePicture=req.body.profilePicture;
        const code=req.body.code;
        const confirmCode=req.body.confirmCode;

        if(await this.userService.getUserByPhoneNumber(phone,'Users')!=null){
            console.log('exists');
        }
        else{
            await this.userService.insertUser(firstName,lastName,phone,code,status,profilePicture,'insert_into_userstbl');
            res.redirect('/');
        }
    }
}