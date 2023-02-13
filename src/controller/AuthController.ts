import { Request, Response, Send } from 'express';
import { ResourceSuccess, ResourceError } from '../errors/Resource.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { hash, hashSync, compare } from 'bcrypt';
import { UserModel } from '../model/UserModel.js';
import { JsonWebTokenServiceImpl } from '../utils/Utils.js'
import { JwtPayload } from 'jsonwebtoken';

export class AuthController {
    private authRepository: UserRepository;
    private jsonToken: JsonWebTokenServiceImpl = new JsonWebTokenServiceImpl()
    constructor(repo: UserRepository) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    async signUp(request: Request, response: Response) {
        try {
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
                    {
                        name: result.data?.name ?? '',
                        email: result.data?.email ?? '',
                        id: result.data?.id ?? 0,
                    }
                )
                response.status(201).send(new ResourceSuccess(
                    userResponse,
                    'Cadastrado com Sucesso'
                ));
            }
            if (result instanceof ResourceError) {
                response.status(400).send(new ResourceError('Erro ao buscar pelo email'));
            }
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));

        }
    }

    async signIn(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            if (!(email && password)) {
                response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
                return;
            }
            const result = await this.authRepository.getUserByEmail(email);
            if (result instanceof ResourceSuccess) {
                if (await compare(password, result.data.password)) {
                    //Create token// 
                    const token = this.jsonToken.signToken(
                        { user_id: result.data.id, user_email: result.data.email, user_name: result.data.name },
                        "20s",
                    );
                    const refreshToken = this.jsonToken.signToken(
                        { user_id: result.data.id, user_email: result.data.email, user_name: result.data.name },
                        '3h');
                    response.status(200).send(new ResourceSuccess(
                        {
                            'token': token,
                            'refreshToken': refreshToken
                        },
                        'Login realizado com sucesso'
                    ));
                } else {
                    response.status(400).send("Senha Inválida");
                }

            }
            if (result instanceof ResourceError) {
                response.status(400).send(new ResourceError('Login não encontrado'));
            }
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));

        }
    }

    async refreshToken(request: Request, response: Response) {
        const { refreshToken } = request.body;
        try {
            const jwtValid:Boolean  = this.jsonToken.verifyToken(refreshToken);
            if (jwtValid) {
                const { user_id, user_email, user_name } = this.jsonToken.decodeToken(refreshToken) as JwtPayload
                // Create new token// 
                const newToken = this.jsonToken.signToken(
                    { user_id: user_id, user_email: user_email, user_name: user_name },
                    "20s");
                const newRefreshToken = this.jsonToken.signToken(
                    { user_id: user_id, user_email: user_email, user_name: user_name },
                    "3h",
                    );
                response.status(200).send(new ResourceSuccess(
                    {
                        'token': newToken,
                        'refreshToken': newRefreshToken
                    },
                    'Token reautenticado'
                ));
            }
            response.status(403).send(new ResourceError('Não foi possivel se autenticar'));

        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
}