import { Prisma, PrismaClient } from "@prisma/client";
import { Resource, ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ServiceModel } from "../model/ServiceModel.js";

export interface ServiceRepository {
    saveService(service: ServiceModel): Promise<Resource<ServiceModel>>
    getServices(): Promise<Resource<ServiceModel[]>>
}

export class ServiceRepositoryImpl implements ServiceRepository {
    private prismaClient: PrismaClient;
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }
    async saveService(service: ServiceModel): Promise<Resource<ServiceModel>> {
        try {
            const result = await this.prismaClient.services.create({
                data: {
                    description: service.description,
                    duration: service.duration,
                    name: service.name,
                }
            })
            return new ResourceSuccess(new ServiceModel({
                description: result.description,
                duration: result.duration,
                name: result.name,
                id: result.id}), 'Success');

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }
    }

    async getServices(): Promise<Resource<ServiceModel[]>> {
        try {
            const result = await this.prismaClient.services.findMany()
            return new ResourceSuccess(result, 'Success');
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`)
        }
    }
}