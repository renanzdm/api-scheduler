import { ScheduleRepository } from "../repositories/ScheduleRepository.js";
import { Request,Response } from "express";
import { ResourceError, ResourceSuccess } from "../errors/Resource.js";
import { ScheduleModel } from "../model/ScheduleModel.js";

export class ScheduleControlelr {
private scheduleRepository:ScheduleRepository
    constructor( scheduleRepository:ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.saveSchedule = this.saveSchedule.bind(this)
        this.getSchedules = this.getSchedules.bind(this)
    }


    async saveSchedule(request: Request, response: Response) {
        try {
            const { idUser, idHourEnd, idHourInit,idService,date } = request.body
            const serviceModel = new ScheduleModel({
                idUser:idUser,
                date:new Date(date),
                idHourEnd:idHourEnd,
                idHourInit:idHourInit,
                idService:idService
            })
            const result = await this.scheduleRepository.saveSchedule(serviceModel)
            response.status(201).send(result)
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }

    async getSchedules(request:Request,response:Response){
        try {
            const result = await this.scheduleRepository.getSchedules()
            response.status(200).send(result );
        } catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));

        }
    }


}