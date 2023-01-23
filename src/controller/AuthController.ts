import { Request, Response, Send } from 'express';
import { ResourceSuccess, ResourceError } from '../errors/Resource.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { hash, hashSync, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { UserModel } from '../model/UserModel.js';

export class AuthController {
    private authRepository: UserRepository;
    constructor(repo: UserRepository) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request: Request, response: Response) {
        const { name, email, password } = request.body;
        if (!(email && password && name)) {
            response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
            return;
        }
        const result = await this.authRepository.getUserByEmail(email);

        if (result instanceof ResourceSuccess) {
            if (result.data?.email == email) {
                response.status(409).send(new ResourceError('Este e-mail já está em uso'));
                return;
            }
            const encryptedPassword = await hash(password, 10);
            const user = await this.authRepository.saveUser(name, email, encryptedPassword);
            const userResponse = new UserModel(
                user.data?.name ?? '',
                user.data?.email ?? '',
                user.data?.id ?? 0,
            )
            response.status(201).send(new ResourceSuccess(
                userResponse,
                'Cadastrado com Sucesso'
            ));
        }
        if (result instanceof ResourceError) {
            response.status(400).send(new ResourceError('Erro ao buscar pelo email'));
        }


    }

    async signIn(request: Request, response: Response) {
        const { email, password } = request.body;
        if (!(email && password)) {
            response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
            return;
        }
        const result = await this.authRepository.getUserByEmail(email);
        if (result instanceof ResourceSuccess) {
            if (await compare(password, result.data.password)) {
                //Create token// 
                const token = jwt.sign(
                    { user_id: result.data.id, user_email: result.data.email, user_name: result.data.name },
                    env.TOKEN_KEY!,
                    {
                        expiresIn: "2h",
                    });
                const userResponse = new UserModel(
                    result.data.name,
                    result.data.email,
                    result.data.id,
                    token);
                response.status(200).send(new ResourceSuccess(
                    userResponse,
                    'Login realizado com sucesso'
                ));
            } else {
                response.status(400).send("Senha Inválida");
            }

        }
        if (result instanceof ResourceError) {
            response.status(400).send(new ResourceError('Login não encontrado'));
        }
    }



}