import { ResourceSuccess, ResourceError } from '../errors/Resource.js';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { UserModel } from '../model/UserModel.js';
export class AuthController {
    constructor(repo) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request, response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { name, email, password } = request.body;
        if (!(email && password && name)) {
            response.status(400).send(new ResourceError('Todos os campos são obrigatorio'));
            return;
        }
        const userExists = await this.authRepository.getUserByEmail(email);
        if (((_a = userExists.data) === null || _a === void 0 ? void 0 : _a.email) == email) {
            response.status(409).send(new ResourceError('Este e-mail já está em uso'));
            return;
        }
        const encryptedPassword = await hash(password, 10);
        const user = await this.authRepository.saveUser(name, email, encryptedPassword);
        const token = jwt.sign({ user_id: (_b = user.data) === null || _b === void 0 ? void 0 : _b.id, user_email: (_c = user.data) === null || _c === void 0 ? void 0 : _c.email }, env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        const userResponse = new UserModel((_e = (_d = user.data) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '', (_g = (_f = user.data) === null || _f === void 0 ? void 0 : _f.email) !== null && _g !== void 0 ? _g : '', (_j = (_h = user.data) === null || _h === void 0 ? void 0 : _h.id) !== null && _j !== void 0 ? _j : 0, token);
        response.status(201).send(new ResourceSuccess(userResponse, 'Cadastrado com Sucesso'));
    }
}
//# sourceMappingURL=AuthController.js.map