import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    authenticated?: boolean;
    id?: number;
    admin?:boolean;
}
const secretKey = Buffer.from(
    <string>(process.env.ACCESS_TOKEN_SECRET_KEY),
    'base64'
  ).toString('ascii');

export const createToken = (user:any) => {
    const accessToken = sign({id:user.id},secretKey);

    return accessToken;
}

export const validateToken = (req:Request, res:Response, next:NextFunction) => {
    const accessToken = req.cookies["access-token"]
    const privateKey = Buffer.from(
        <string>(process.env.ACCESS_TOKEN_SECRET_KEY),
        'base64'
      ).toString('ascii');

    if(!accessToken){
        return res.status(400).json({error:"User not Authenticated!"});
    }
    try{
        const validToken = verify(accessToken,secretKey);
        if(validToken){
            (req as AuthenticatedRequest).authenticated = true;
            (req as AuthenticatedRequest).id = accessToken.id;
            return next();
        }
    }catch(err){
        return res.status(400).json({error:err});
    }
}