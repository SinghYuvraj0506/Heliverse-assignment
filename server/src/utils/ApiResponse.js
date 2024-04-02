
// api response format class ----------------------------
export class ApiResponse{
    constructor(
        statusCode,
        data = {},
        message = ""
    ){
        this.statusCode = statusCode;
        this.data = data
        this.message = message
        this.success = true
    }
}