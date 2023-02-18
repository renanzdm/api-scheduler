import { Prisma } from "@prisma/client";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ScheduleModel } from "../model/ScheduleModel.js";
export class ScheduleRepositoryImpl {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async saveSchedule(scheduleMode) {
        try {
            const result = await this.prismaClient.schedule.create({
                data: {
                    idUser: scheduleMode.idUser,
                    date: scheduleMode.date,
                    idHourEnd: scheduleMode.idHourEnd,
                    idHourInit: scheduleMode.idHourInit,
                    idService: scheduleMode.idService,
                }
            });
            return new ResourceSuccess(new ScheduleModel({
                date: result.date,
                idHourEnd: result.idHourEnd,
                idHourInit: result.idHourInit,
                idService: result.idService,
                idUser: result.idUser,
                id: result.id
            }), 'Success');
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
    async getSchedules() {
        try {
            const result = await this.prismaClient.schedule.findMany();
            return new ResourceSuccess(result, 'Success');
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
}
//# sourceMappingURL=ScheduleRepository.js.map