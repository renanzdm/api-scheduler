import { ServiceRepository } from "../repositories/ServiceRepository.js";
import { Request, Response } from "express";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ServiceModel } from "../model/ServiceModel.js";

export class ServiceController {
    private serviceRepository: ServiceRepository
    constructor(serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository
        this.saveService = this.saveService.bind(this)
        this.getServices = this.getServices.bind(this)
    }

    async saveService(request: Request, response: Response) {
        try {
            const { name, description, duration } = request.body
            const serviceModel = new ServiceModel({
                description: description,
                duration: duration,
                name: name
            })
            const result = await this.serviceRepository.saveService(serviceModel)
            response.status(201).send(result)
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }

    async getServices(request:Request,response:Response){
        try {
            const result = await this.serviceRepository.getServices()
            response.status(200).send(new ResourceSuccess(result  ,'Criado com Sucesso'));
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));

        }
    }



}