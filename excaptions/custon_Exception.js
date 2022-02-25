class custom_Exception extends Error{
    constructor(msg,name, status_code){
        super(msg)
        this.name = name
        this.status_code = status_code
    }
}