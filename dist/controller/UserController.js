import { ResourceError } from "../errors/Resource.js";
export class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.getUserById = this.getUserById.bind(this);
    }
    async getUserById(request, response) {
        try {
            const { id } = request.body;
            const user = await this.userRepository.getUserById(id);
            if (user == null) {
                response.status(200).send(new ResourceError('Usuário não encontrado'));
                return;
            }
            response.status(200).send(user);
            return;
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
            return;
        }
    }
}
//# sourceMappingURL=UserController.js.map