import { Prisma, PrismaClient } from "@prisma/client";
import { Resource, ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { HourModel } from "../model/HourModel.js";

export interface HourRepository {
    getHours(): Promise<Resource<HourModel[]>>;
    saveHours(hourModel: HourModel): Promise<Resource<HourModel>>;
}

export class HourRepositoryImpl implements HourRepository {
    private prismaClient: PrismaClient;
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }
    async getHours(): Promise<Resource<HourModel[]>> {
        try {
            const result = await this.prismaClient.hours.findMany()
            return new ResourceSuccess(result, 'Success');
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }

    }

    async saveHours(hourModel: HourModel): Promise<Resource<HourModel>> {
        try {
            const result = await this.prismaClient.hours.create({
                data: {
                    hora: hourModel.hora
                }
            })
            return new ResourceSuccess(new HourModel(
                {
                    id: result.id,
                    hora: result.hora
                }
            ), 'Success');

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }

    }
}