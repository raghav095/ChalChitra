class Apierror extends Error{
    constructor(
        statuscode, 
        message= "galti hui hai terese",
        errors = [],
        stack=""
    ){
        super(message)
        this.statuscode= statuscode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack=  stack
        }
        else{
            Error.captureStackTrace(this, this.construture)
        }
    }
}

export {Apierror}