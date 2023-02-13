import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserController } from "../controller/UserController.js";
import { UserRepositoryImpl } from "../repositories/UserRepository.js";
import { JsonWebTokenServiceImpl } from '../utils/Utils.js';
const routers = Router();
const prismaClient = new PrismaClient();
const authRepository = new UserRepositoryImpl(prismaClient);
const authController = new AuthController(authRepository);
const userController = new UserController(authRepository);
const jsonToken = new JsonWebTokenServiceImpl();
routers.use((req, res, next) => {
    if (req.path != '/signUp' && req.path != '/sign' && req.path != '/refreshToken') {
        if (req.headers['authorization'] == null || !jsonToken.verifyToken(req.headers['authorization'])) {
            console.log("aqui");
            res.status(403).send('Não Autorizado');
            return;
        }
        next();
        return;
    }
    next();
});
routers.route('/signUp').post(authController.signUp);
routers.route('/sign').post(authController.signIn);
routers.route('/refreshToken').post(authController.refreshToken);
routers.route('/getUserById').post(userController.getUserById);
export { routers };
//# sourceMappingURL=Routes.js.map