export class AuthController {
    authRepository;
    constructor(repo) {
        this.authRepository = repo;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request, response) {
        const { name, email, password } = request.body;
        const res = await this.authRepository.saveUser(name, email, password);
        console.log();
        response.send({
            data: {
                'data': res.data,
                'error': res.error
            }
        });
    }
}
//# sourceMappingURL=AuthController.js.map