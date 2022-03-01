class Custom_Exception extends Error{
    constructor(message,nameError, route){
        super(message)
        this.nameError = nameError
        this.msg = message
        this.routeError=route
    }
}
module.exports = Custom_Exception