import { Router } from "express";
const routers = Router();
routers.route('/').get((request, response) => {
    response.send('Rodando');
});
export { routers };
//# sourceMappingURL=Routes.js.map