import { ResourceError, ResourceSuccess } from "../errors/Resource.js"
import { UserRepository } from "../repositories/UserRepository.js"
import { Request, Response, Send } from 'express'


export class UserController {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
        this.getUserById = this.getUserById.bind(this)
    }

    async getUserById(request: Request, response: Response) {
        try {
            const { id } = request.body
            const user = await this.userRepository.getUserById(id)
            
            if (user == null) {
                response.status(200).send(new ResourceError('Usuário não encontrado'))        
                return
            }
            response.status(200).send(user)
            return
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
            return
        }

    }




}