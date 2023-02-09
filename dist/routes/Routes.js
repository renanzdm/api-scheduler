import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserRepositoryImpl } from "../repositories/UserRepository.js";
const routers = Router();
const prismaClient = new PrismaClient();
const authRepository = new UserRepositoryImpl(prismaClient);
const authController = new AuthController(authRepository);
routers.use((req, res, next) => {
    if (req.path != '/signUp' && req.path != '/sign' && req.path != '/refreshToken') {
        console.log(req.headers);
        if (req.headers['authorization'] == null) {
            res.status(403).send('Não Autorizado');
        }
        next();
    }
    else {
        next();
    }
});
routers.route('/signUp').post(authController.signUp);
routers.route('/sign').post(authController.signIn);
routers.route('/refreshToken').post(authController.refreshToken);
export { routers };
//# sourceMappingURL=Routes.js.map