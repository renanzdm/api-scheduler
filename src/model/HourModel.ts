export class HourModel {
    id?: Number
    hora: Date
    constructor({ id, hora }: { id?: Number, hora: Date }) {
        this.id = id
        this.hora = hora
    }


}