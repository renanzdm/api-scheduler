import { Prisma } from "@prisma/client";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
export class AuthRepositoryImpl {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async saveUser(name, email, password) {
        try {
            await this.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    passworod: password
                }
            });
            return new ResourceSuccess('Succes', null);
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
}
//# sourceMappingURL=AuthRepository.js.map