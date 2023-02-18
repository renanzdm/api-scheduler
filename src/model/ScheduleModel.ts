export class ScheduleModel {
    id?: number
    idUser: number
    idService: number
    idHourInit: number
    idHourEnd: number
    date: Date

    constructor({ id, idUser, idService, idHourInit, idHourEnd, date }: { id?: number, idUser: number, idService: number, idHourInit: number, idHourEnd: number, date: Date }) {
        this.id = id
        this.idUser = idUser
        this.idService = idService
        this.idHourInit = idHourInit
        this.idHourEnd = idHourEnd
        this.date = date
    }


}