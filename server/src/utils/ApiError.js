
// api error format class ----------------------------
export class ApiError extends Error{
    constructor(
        statusCode,
        message = "",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode;
        this.errors = errors
        this.success = false

        if(stack){
            this.stack = ""
        }

        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
