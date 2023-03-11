
import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, Send, NextFunction } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserController } from "../controller/UserController.js";
import { UserRepository, UserRepositoryImpl } from "../repositories/UserRepository.js";
import { JsonWebTokenServiceImpl } from '../utils/Utils.js'
import { HourController } from "../controller/HourController.js";
import { HourRepository, HourRepositoryImpl } from "../repositories/HourRepository.js";
import { ServiceController } from "../controller/ServiceController.js";
import { ServiceRepository, ServiceRepositoryImpl } from "../repositories/ServiceRepository.js";
import { ScheduleRepository, ScheduleRepositoryImpl } from "../repositories/ScheduleRepository.js";
import { ScheduleControlelr as ScheduleController } from "../controller/ScheduleController.js";


const routers = Router();
const prismaClient: PrismaClient = new PrismaClient()
const authRepository: UserRepository = new UserRepositoryImpl(prismaClient)
const hourRepository:HourRepository = new HourRepositoryImpl(prismaClient)
const serviceRepository:ServiceRepository = new ServiceRepositoryImpl(prismaClient)
const scheduleRepository:ScheduleRepository = new ScheduleRepositoryImpl(prismaClient)

const authController: AuthController = new AuthController(authRepository)
const userController: UserController = new UserController(authRepository)
const hourController:HourController = new HourController(hourRepository)
const serviceController:ServiceController = new ServiceController(serviceRepository)
const scheduleController:ScheduleController = new ScheduleController(scheduleRepository)
const jsonToken: JsonWebTokenServiceImpl = new JsonWebTokenServiceImpl()

routers.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path != '/signUp' && req.path != '/sign' && req.path != '/refreshToken') {
        if (req.headers['authorization'] == null || !jsonToken.verifyToken(req.headers['authorization'])) {
            res.status(403).send('Não Autorizado');
            return
        } 
        next()
        return
    } 
    next()
});

routers.route('/getServices').get(serviceController.getServices)
routers.route('/getHours').get(hourController.getHours)
routers.route('/getSchedules').get(scheduleController.getSchedules)
///////////////////////
routers.route('/signUp').post(authController.signUp)
routers.route('/sign').post(authController.signIn)
routers.route('/refreshToken').post(authController.refreshToken)
routers.route('/getUserById').post(userController.getUserById)
routers.route('/saveHours').post(hourController.saveHours)
routers.route('/saveServices').post(serviceController.saveService)
routers.route('/saveSchedule').post(scheduleController.saveSchedule)



export { routers }  