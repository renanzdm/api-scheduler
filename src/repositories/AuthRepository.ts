import { Prisma, PrismaClient } from "@prisma/client";
import { ResourceError, ResourceSuccess,Resource } from "../errors/Resource.js";
export class AuthRepositoryImpl implements AuthRepository {
    private prismaClient: PrismaClient;
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
        
    }
    async saveUser(name: string, email: string, password: string): Promise<Resource<String>> {
        try {
             await  this.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    passworod: password
                }
            });
            return new ResourceSuccess('Succes', null);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);

        }

    }
}

export interface AuthRepository {
    saveUser(name: string, email: string, password: string): Promise<Resource<String>>;
}