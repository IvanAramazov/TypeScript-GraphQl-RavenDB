export class CustomError{
    errorType: string;
    message:string;

    constructor(errorType: string, message:string) {
        this.errorType = errorType;
        this.message = message;
    }
}
