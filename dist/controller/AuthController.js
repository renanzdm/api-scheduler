import { ResourceSuccess, ResourceError } from '../errors/Resource.js';
import { hash, compare } from 'bcrypt';
import { UserModel } from '../model/UserModel.js';
import { JsonWebTokenServiceImpl } from '../utils/Utils.js';
export class AuthController {
    constructor(repo) {
        this.jsonToken = new JsonWebTokenServiceImpl();
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    async signUp(request, response) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
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
                    name: (_c = (_b = user.data) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '',
                    email: (_e = (_d = user.data) === null || _d === void 0 ? void 0 : _d.email) !== null && _e !== void 0 ? _e : '',
                    id: (_g = (_f = user.data) === null || _f === void 0 ? void 0 : _f.id) !== null && _g !== void 0 ? _g : 0,
                });
                response.status(201).send(new ResourceSuccess(userResponse, 'Cadastrado com Sucesso'));
            }
            if (result instanceof ResourceError) {
                response.status(400).send(result);
            }
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
    async signIn(request, response) {
        try {
            const { email, password } = request.body;
            if (!(email && password)) {
                response.status(400).send(new ResourceError('Todos os campos são obrigatorios'));
                return;
            }
            const result = await this.authRepository.getUserByEmail(email);
            if (result instanceof ResourceSuccess) {
                if (await compare(password, result.data.password)) {
                    //Create token// 
                    const token = this.jsonToken.signToken({ user_id: result.data.id, user_email: result.data.email, user_name: result.data.name }, "20s");
                    const refreshToken = this.jsonToken.signToken({ user_id: result.data.id, user_email: result.data.email, user_name: result.data.name }, '3h');
                    response.status(200).send(new ResourceSuccess({
                        'token': token,
                        'refreshToken': refreshToken
                    }, 'Login realizado com sucesso'));
                }
                else {
                    response.status(400).send(new ResourceError('Senha Inválida'));
                }
            }
            if (result instanceof ResourceError) {
                response.status(400).send(new ResourceError('Login não encontrado'));
            }
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
    async refreshToken(request, response) {
        const { refreshToken } = request.body;
        try {
            const jwtValid = this.jsonToken.verifyToken(refreshToken);
            if (jwtValid) {
                const { user_id, user_email, user_name } = this.jsonToken.decodeToken(refreshToken);
                // Create new token// 
                const newToken = this.jsonToken.signToken({ user_id: user_id, user_email: user_email, user_name: user_name }, "20s");
                const newRefreshToken = this.jsonToken.signToken({ user_id: user_id, user_email: user_email, user_name: user_name }, "3h");
                response.status(200).send(new ResourceSuccess({
                    'token': newToken,
                    'refreshToken': newRefreshToken
                }, 'Token reautenticado'));
            }
            response.status(403).send(new ResourceError('Não foi possivel se autenticar'));
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
}
//# sourceMappingURL=AuthController.js.map