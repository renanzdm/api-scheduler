import { Prisma, PrismaClient } from "@prisma/client";
import { Resource, ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ScheduleModel } from "../model/ScheduleModel.js";

export interface ScheduleRepository {
    saveSchedule(scheduleMode: ScheduleModel): Promise<Resource<ScheduleModel>>
    getSchedules(): Promise<Resource<ScheduleModel[]>>
}

export class ScheduleRepositoryImpl implements ScheduleRepository{
    private prismaClient: PrismaClient;
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }


  async  saveSchedule(scheduleMode: ScheduleModel): Promise<Resource<ScheduleModel>> {
        try {
            const result = await this.prismaClient.schedule.create({
                data: {
                    idUser:scheduleMode.idUser,
                    date:scheduleMode.date,
                    idHourEnd:scheduleMode.idHourEnd,
                    idHourInit:scheduleMode.idHourInit,
                    idService:scheduleMode.idService,
                    
                }
            })
            return new ResourceSuccess(new ScheduleModel({
                date:result.date,
                idHourEnd:result.idHourEnd,
                idHourInit:result.idHourInit,
                idService:result.idService,
                idUser:result.idUser,
                id:result.id
            }), 'Success');

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }
    }
   async getSchedules(): Promise<Resource<ScheduleModel[]>> {
        try {
            const result = await this.prismaClient.schedule.findMany()
            return new ResourceSuccess(result, 'Success');
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }
    }
}