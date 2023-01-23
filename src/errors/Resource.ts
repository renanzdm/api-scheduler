export interface Resource<T>{
    data?: T;
    message?: String | null; 

}


export class ResourceError<T> implements Resource<T>{
    message?: String | null;
    constructor( message: String | null) {
        this.message = message;
    }
}

export class ResourceSuccess<T> implements Resource<T>{
    data: T;
    message: String | null;
     constructor(data: T, message: String | null) {
        this.data = data;
        this.message = message;
    }
}

