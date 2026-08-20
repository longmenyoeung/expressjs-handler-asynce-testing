
class ApiError extends Error {
    constructor (statusCode, message, isOptional =true, stack= ''){
        super(message);
        this.statusCode = statusCode;
        this.isOptional = isOptional;
        if(stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Static factory methods
    static badRequest(msg = 'Bad Request') {
        return new ApiError(400, msg)
    }
    
    static internal(msg = 'Server internal error') {
        return new ApiError(500, msg)
    }

    static unauthorized(msg = 'Unauthorized'){
        return new ApiError(msg)
    }

    static notfound(msg= 'Resource not found.'){
        return new ApiError(404, msg);
    }

    static forbidden (msg = 'Forbidden'){
        return new ApiError(403, msg)
    }
}

module.exports = ApiError;