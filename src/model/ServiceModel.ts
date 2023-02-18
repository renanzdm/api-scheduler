
export class ServiceModel {
    id?: number
    name: string
    description: string
    duration: string

    constructor({ id, name, description, duration }: { id?: number, name: string, description: string, duration: string }) {
        this.id = id
        this.name = name
        this.description = description
        this.duration = duration    
    }



}