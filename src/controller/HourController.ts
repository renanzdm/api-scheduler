import { HourModel } from "../model/HourModel.js";
import { HourRepository } from "../repositories/HourRepository.js";
import { Request, Response} from "express";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";

export class HourController {
    private hourRepository: HourRepository
    constructor(hourRepository: HourRepository) {
        this.hourRepository = hourRepository
        this.saveHours = this.saveHours.bind(this)
        this.getHours = this.getHours.bind(this)
    }
    async saveHours(request: Request, response: Response) {
        try {
            const { hora } = request.body
            const date: Date = new Date(hora)
            const hourModel = new HourModel({
                 hora:date
            })
            const result = await this.hourRepository.saveHours(hourModel)
            response.status(201).send(result);
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }

    async getHours(request:Request,response:Response){
        try {
            const result = await this.hourRepository.getHours()
            response.status(200).send(new ResourceSuccess(result  ,'Criado com Sucesso'));
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));

        }
    }



}