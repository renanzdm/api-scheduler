
import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, Send, NextFunction } from "express";
import { env } from "process";
import { AuthController } from "../controller/AuthController.js";
import { UserController } from "../controller/UserController.js";
import { UserRepository, UserRepositoryImpl } from "../repositories/UserRepository.js";
import { JsonWebTokenServiceImpl } from '../utils/Utils.js'
import { JwtPayload } from 'jsonwebtoken';


const routers = Router();
const prismaClient: PrismaClient = new PrismaClient();
const authRepository: UserRepository = new UserRepositoryImpl(prismaClient);
const authController: AuthController = new AuthController(authRepository);
const userController: UserController = new UserController(authRepository)

const jsonToken: JsonWebTokenServiceImpl = new JsonWebTokenServiceImpl()

routers.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path != '/signUp' && req.path != '/sign' && req.path != '/refreshToken') {
        if (req.headers['authorization'] == null || !jsonToken.verifyToken(req.headers['authorization'])) {
            console.log("aqui");
            res.status(403).send('Não Autorizado');
            return
        } 
        next()
        return
    } 
    next()
});

routers.route('/signUp').post(authController.signUp)
routers.route('/sign').post(authController.signIn)
routers.route('/refreshToken').post(authController.refreshToken)
routers.route('/getUserById').post(userController.getUserById)



export { routers }  