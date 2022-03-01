class ResponseToSend{
    constructor(isCorrect, body){
        this.successful=isCorrect
        this.data=body
    }
}

module.exports = ResponseToSend