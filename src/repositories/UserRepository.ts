import { ResourceError, ResourceSuccess, Resource } from "../errors/Resource.js";
import { PrismaClient, Prisma } from '@prisma/client';
import { UserModel } from "../model/UserModel.js";

export class UserRepositoryImpl implements UserRepository {
    private prismaClient: PrismaClient;
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }
    async getUserByEmail(email: string): Promise<Resource<UserModel>> {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            
            return new ResourceSuccess(new UserModel(
             { name:  user?.name ?? '',
              email:  user?.email ?? '',
               id: user?.id ?? 0,
               password: user?.password ?? ''}
            ), 'Success');
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }


    async saveUser(name: string, email: string, password: string): Promise<Resource<UserModel>> {
        try {
            const user = await this.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password:password
                    
                }
            });
            return new ResourceSuccess(new UserModel(
                { name:  user?.name ?? '',
                email:  user?.email ?? '',
                 id: user?.id ?? 0,
                 }
            ), 'Success');
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }

    }

}

export interface UserRepository {
    saveUser(name: string, email: string, password: string): Promise<Resource<UserModel>>;
    getUserByEmail(email: string): Promise<Resource<UserModel>>;
}