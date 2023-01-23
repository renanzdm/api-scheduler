import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserRepositoryImpl } from "../repositories/UserRepository.js";
const routers = Router();
///
const prismaClient = new PrismaClient();
const authRepository = new UserRepositoryImpl(prismaClient);
const authController = new AuthController(authRepository);
///
routers.route('/save_user').post(authController.signUp);
export { routers };
//# sourceMappingURL=Routes.js.map