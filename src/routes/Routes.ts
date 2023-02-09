
import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, Send, NextFunction } from "express";
import { nextTick } from "process";
import { AuthController } from "../controller/AuthController.js";
import { UserRepository, UserRepositoryImpl } from "../repositories/UserRepository.js";
const routers = Router();



const prismaClient: PrismaClient = new PrismaClient();
const authRepository: UserRepository = new UserRepositoryImpl(prismaClient);
const authController: AuthController = new AuthController(authRepository);

routers.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path != '/signUp' && req.path != '/sign'&& req.path != '/refreshToken') {
        console.log(req.headers);
        if (req.headers['authorization'] == null) {
            res.status(403).send('Não Autorizado');
        }
        next();
    } else {
        next();
    }


});
routers.route('/signUp').post(authController.signUp)
routers.route('/sign').post(authController.signIn)
routers.route('/refreshToken').post(authController.refreshToken)



export { routers }  