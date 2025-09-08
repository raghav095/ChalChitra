class Apiresponse{
    constructor(statuscode , data , message = " success"){
        this.statuscode = statuscode
        this.dta = data
        this.message =message
        this.success = statuscode <400 

    }
}

export {Apiresponse}