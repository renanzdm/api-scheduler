import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { Prisma } from '@prisma/client';
import { UserModel } from "../model/UserModel.js";
export class UserRepositoryImpl {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async getUserByEmail(email) {
        var _a, _b, _c, _d;
        try {
            const user = await this.prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            return new ResourceSuccess(new UserModel({ name: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : '',
                email: (_b = user === null || user === void 0 ? void 0 : user.email) !== null && _b !== void 0 ? _b : '',
                id: (_c = user === null || user === void 0 ? void 0 : user.id) !== null && _c !== void 0 ? _c : 0,
                password: (_d = user === null || user === void 0 ? void 0 : user.password) !== null && _d !== void 0 ? _d : '' }), 'Success');
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ResourceError(error.message);
            }
            return new ResourceError(`${error}`);
        }
    }
    async saveUser(name, email, password) {
        var _a, _b, _c;
        try {
            const user = await this.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            return new ResourceSuccess(new UserModel({ name: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : '',
                email: (_b = user === null || user === void 0 ? void 0 : user.email) !== null && _b !== void 0 ? _b : '',
                id: (_c = user === null || user === void 0 ? void 0 : user.id) !== null && _c !== void 0 ? _c : 0,
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
//# sourceMappingURL=UserRepository.js.map