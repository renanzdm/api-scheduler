
import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, Send } from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthRepository, AuthRepositoryImpl } from "../repositories/AuthRepository.js";
const routers = Router();
///
const prismaClient: PrismaClient = new PrismaClient();
const authRepository: AuthRepository = new AuthRepositoryImpl(prismaClient);
const authController: AuthController = new AuthController(authRepository);
///

routers.route('/save_user').post(authController.signUp)

export { routers }  