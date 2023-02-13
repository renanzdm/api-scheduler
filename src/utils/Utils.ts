import jwt from "jsonwebtoken";
import { env } from "process";


export class JsonWebTokenServiceImpl implements JsonWebTokenService{
    decodeToken(token: string): jwt.JwtPayload | null {
        try {
            return jwt.decode(token) as jwt.JwtPayload
        } catch (error) {
            return null;
        }

    }
    signToken(data: object, expiresIn: string): string {
        const token = jwt.sign(data,env.TOKEN_KEY!,{expiresIn})
        return token
    }
    verifyToken(token: string): boolean {
        try {
           const tokenVerify = jwt.verify(token,env.TOKEN_KEY!)
           if(tokenVerify !=null){
            return true
           }
           return false;
        } catch (error) {
            return false; 
        }
    }


    
}



interface JsonWebTokenService{
    signToken(data: object,expiresIn:string):string
    verifyToken(token:string):boolean
    decodeToken(token:string):jwt.JwtPayload | null
}