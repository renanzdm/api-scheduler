import { Request, Response, Send } from 'express';
import { ResourceSuccess,ResourceError } from '../errors/Resource.js';
import { AuthRepository } from '../repositories/AuthRepository.js';
export class AuthController {
    private authRepository: AuthRepository;
    constructor(repo: AuthRepository) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request: Request, response: Response) {
        const {name, email, password} = request.body;
        const res = await this.authRepository.saveUser(name,email,password);
        console.log();
        
        response.send({
            data:{
                'data':res.data,
                'error':res.error
         }
        });
    }

}