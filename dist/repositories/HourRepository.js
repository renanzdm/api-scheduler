import { Prisma } from "@prisma/client";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { HourModel } from "../model/HourModel.js";
export class HourRepositoryImpl {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async getHours() {
        try {
            const result = await this.prismaClient.hours.findMany();
            return new ResourceSuccess(result, 'Success');
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
    async saveHours(hourModel) {
        try {
            const result = await this.prismaClient.hours.create({
                data: {
                    hora: hourModel.hora
                }
            });
            return new ResourceSuccess(new HourModel({
                id: result.id,
                hora: result.hora
            }), 'Success');
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
}
//# sourceMappingURL=HourRepository.js.map