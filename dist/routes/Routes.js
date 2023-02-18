import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserController } from "../controller/UserController.js";
import { UserRepositoryImpl } from "../repositories/UserRepository.js";
import { JsonWebTokenServiceImpl } from '../utils/Utils.js';
import { HourController } from "../controller/HourController.js";
import { HourRepositoryImpl } from "../repositories/HourRepository.js";
import { ServiceController } from "../controller/ServiceController.js";
import { ServiceRepositoryImpl } from "../repositories/ServiceRepository.js";
import { ScheduleRepositoryImpl } from "../repositories/ScheduleRepository.js";
import { ScheduleControlelr as ScheduleController } from "../controller/ScheduleController.js";
const routers = Router();
const prismaClient = new PrismaClient();
const authRepository = new UserRepositoryImpl(prismaClient);
const hourRepository = new HourRepositoryImpl(prismaClient);
const serviceRepository = new ServiceRepositoryImpl(prismaClient);
const scheduleRepository = new ScheduleRepositoryImpl(prismaClient);
const authController = new AuthController(authRepository);
const userController = new UserController(authRepository);
const hourController = new HourController(hourRepository);
const serviceController = new ServiceController(serviceRepository);
const scheduleController = new ScheduleController(scheduleRepository);
const jsonToken = new JsonWebTokenServiceImpl();
routers.use((req, res, next) => {
    if (req.path != '/signUp' && req.path != '/sign' && req.path != '/refreshToken') {
        if (req.headers['authorization'] == null || !jsonToken.verifyToken(req.headers['authorization'])) {
            res.status(403).send('Não Autorizado');
            return;
        }
        next();
        return;
    }
    next();
});
routers.route('/getServices').get(serviceController.getServices);
routers.route('/getHours').get(hourController.getHours);
routers.route('/getSchedules').get(scheduleController.getSchedules);
///////////////////////
routers.route('/signUp').post(authController.signUp);
routers.route('/sign').post(authController.signIn);
routers.route('/refreshToken').post(authController.refreshToken);
routers.route('/getUserById').post(userController.getUserById);
routers.route('/saveHours').post(hourController.saveHours);
routers.route('/saveServices').post(serviceController.saveService);
routers.route('/saveSchedule').post(scheduleController.saveSchedule);
export { routers };
//# sourceMappingURL=Routes.js.map