import { ResourceSuccess, ResourceError } from '../errors/Resource.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { UserModel } from '../model/UserModel.js';
export class AuthController {
    constructor(repo) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    async signUp(request, response) {
        var _a, _b, _c, _d, _e, _f, _g;
        const { name, email, password } = request.body;
        if (!(email && password && name)) {
            response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
            return;
        }
        const result = await this.authRepository.getUserByEmail(email);
        if (result instanceof ResourceSuccess) {
            if (((_a = result.data) === null || _a === void 0 ? void 0 : _a.email) == email) {
                response.status(409).send(new ResourceError('Este e-mail já está em uso'));
                return;
            }
            const encryptedPassword = await hash(password, 10);
            const user = await this.authRepository.saveUser(name, email, encryptedPassword);
            const userResponse = new UserModel({
                name: (_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '',
                email: (_e = (_d = result.data) === null || _d === void 0 ? void 0 : _d.email) !== null && _e !== void 0 ? _e : '',
                id: (_g = (_f = result.data) === null || _f === void 0 ? void 0 : _f.id) !== null && _g !== void 0 ? _g : 0,
            });
            response.status(201).send(new ResourceSuccess(userResponse, 'Cadastrado com Sucesso'));
        }
        if (result instanceof ResourceError) {
            response.status(400).send(new ResourceError('Erro ao buscar pelo email'));
        }
    }
    async signIn(request, response) {
        const { email, password } = request.body;
        if (!(email && password)) {
            response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
            return;
        }
        const result = await this.authRepository.getUserByEmail(email);
        if (result instanceof ResourceSuccess) {
            if (await compare(password, result.data.password)) {
                //Create token// 
                const token = jwt.sign({ user_id: result.data.id, user_email: result.data.email, user_name: result.data.name }, env.TOKEN_KEY, {
                    expiresIn: "20s",
                });
                const refreshToken = jwt.sign({ user_id: result.data.id, user_email: result.data.email, user_name: result.data.name }, env.TOKEN_KEY, {
                    expiresIn: "3h",
                });
                response.status(200).send(new ResourceSuccess({
                    'token': token,
                    'refreshToken': refreshToken
                }, 'Login realizado com sucesso'));
            }
            else {
                response.status(400).send("Senha Inválida");
            }
        }
        if (result instanceof ResourceError) {
            response.status(400).send(new ResourceError('Login não encontrado'));
        }
    }
    async refreshToken(request, response) {
        const { refreshToken } = request.body;
        try {
            const jwtDecoded = jwt.verify(refreshToken, env.TOKEN_KEY);
            if (jwtDecoded) {
                const { user_id, user_email, user_name } = jwtDecoded;
                // Create new token// 
                const token = jwt.sign({ user_id: user_id, user_email: user_email, user_name: user_name }, env.TOKEN_KEY, {
                    expiresIn: "20s",
                });
                const refreshToken = jwt.sign({ user_id: user_id, user_email: user_email, user_name: user_name }, env.TOKEN_KEY, {
                    expiresIn: "3h",
                });
                response.status(200).send(new ResourceSuccess({
                    'token': token,
                    'refreshToken': refreshToken
                }, 'Token reautenticado'));
            }
            response.status(403).send(new ResourceError('Não foi possivel se autenticar'));
        }
        catch (error) {
            response.status(400).send(new ResourceError('Ocorreu um erro no Servidor'));
        }
    }
}
//# sourceMappingURL=AuthController.js.map