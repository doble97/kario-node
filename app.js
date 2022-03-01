const express = require('express')
const rutas_user = require('./controllers/user-controller')
const rutas_deck = require('./controllers/deck-controller')
const app = express()
const cors = require('cors')
const ResponseToSend = require('./response/response')
const Custom_Exception = require('./exceptions/custon_Exception')

app.use(express.json())
app.use(cors())
app.use('/', (req, res, next)=>{
    console.log(req.method, req.url, req.hostname);
    next()
})
app.use('/', rutas_user )
app.use('/', rutas_deck )

app.use((error, req,res,next)=>{
    //let response = {status:false, msg:error.type, triggerError: error.body, urlError:req.url}
    let response = new ResponseToSend(false,null)
    if(error.type=="entity.parse.failed"){
        response.data = new Custom_Exception('JSON no valido',error.type, req.url)
    }else{
        response.data= error
    }
    res.status(400).json(response)
})

app.listen(7777,()=>{
    console.log('Listening on port 7777..');
})