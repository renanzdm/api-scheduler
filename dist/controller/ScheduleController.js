import { ResourceError } from "../errors/Resource.js";
import { ScheduleModel } from "../model/ScheduleModel.js";
export class ScheduleControlelr {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.saveSchedule = this.saveSchedule.bind(this);
        this.getSchedules = this.getSchedules.bind(this);
    }
    async saveSchedule(request, response) {
        try {
            const { idUser, idHourEnd, idHourInit, idService, date } = request.body;
            const serviceModel = new ScheduleModel({
                idUser: idUser,
                date: new Date(date),
                idHourEnd: idHourEnd,
                idHourInit: idHourInit,
                idService: idService
            });
            const result = await this.scheduleRepository.saveSchedule(serviceModel);
            response.status(201).send(result);
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
    async getSchedules(request, response) {
        try {
            const result = await this.scheduleRepository.getSchedules();
            response.status(200).send(result);
        }
        catch (error) {
            response.status(500).send(new ResourceError(`Ocorreu um erro no Servidor ${error}`));
        }
    }
}
//# sourceMappingURL=ScheduleController.js.map