import { Prisma } from "@prisma/client";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ServiceModel } from "../model/ServiceModel.js";
export class ServiceRepositoryImpl {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async saveService(service) {
        try {
            const result = await this.prismaClient.services.create({
                data: {
                    description: service.description,
                    duration: service.duration,
                    name: service.name,
                }
            });
            return new ResourceSuccess(new ServiceModel({
                description: result.description,
                duration: result.duration,
                name: result.name,
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
    async getServices() {
        try {
            const result = await this.prismaClient.services.findMany();
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
//# sourceMappingURL=ServiceRepository.js.map