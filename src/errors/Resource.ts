export interface Resource<T>{
    error?: String | null;
    data?: T;
    message?: String | null; 

}


export class ResourceError<T> implements Resource<T>{
    error: String | null; 
    constructor( error: String | null) {
        this.error = error;
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

