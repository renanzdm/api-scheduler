import { Router, Request, Response, Send } from "express";
import test from "node:test";

const routers = Router()

routers.route('/').get(async (request: Request, response: Response) => {
    response.send('Rodando');
});


export { routers }  