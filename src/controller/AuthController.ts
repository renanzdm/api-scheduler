import {PrismaClient} from '@prisma/client';
class AuthController {
    private prismaClient:PrismaClient;
    constructor(prismaClient:PrismaClient){
        this.prismaClient=prismaClient;
    }
    public async signUp(name:String, email:String, password:String) {
        const allUsers = await this.prismaClient.allUsers();
    }

}