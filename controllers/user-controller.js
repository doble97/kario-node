const bd = require('../data/user')
const Custom_Exception = require('../exceptions/custon_Exception')
const ResponseToSend = require('../response/response')
const middlewares = require('../utilities/middlewares')
const routes = require('express').Router()
const security = require('../utilities/security')
//CRUD USER
routes.post('/create-user', middlewares.validateUser, (req, res) => {
    let user = req.body
    user.password = security.cipher(user.password)
    console.log('password', user.password);
    let response = new ResponseToSend()
    bd.createUser(user)
        .then(insertId=> {
            user = {...middlewares.createUserDto(user) }
            let token = security.createToken(user)
            response.successful = true
            response.data = {id: insertId, ...user, token}
            res.json(response)
        })
        .catch(err => {
            response.successful = false
            response.data = new Custom_Exception(err.msg,'ErrorCreateUser', req.url)
            res.status(400).json(response)
        })

})

routes.post('/login',middlewares.validateLogin, (req,res)=>{
    let user = req.body
    let response = new ResponseToSend(false,null)
    bd.getUser(user.email)
        .then(result=>{
            if(result.data){
                //console.log('RESULTADO', result, req.body, user);
                hash = result.data.password || ''
                if (security.decipher(hash) == user.password){
                    middlewares.createUserDto(result.data)
                    let token = security.createToken(result.data)
                    response.successful = true
                    response.data = {...result.data,token}
                    res.status(200).json(response);
                    return
                }
                response.data=new Custom_Exception('Contraseña o correo incorrecto','Credenciales incorrectas',req.url)
                res.status(400).json(response)
            }else{
                response.data = new Custom_Exception('No existe el usuario','ErrorUser',req.url)
                res.status(200).json(response)
            }
        })
        .catch(err=>{
            response.data= new Custom_Exception(err,'ErrorLogin',req.url)
            res.status(400).json(response)
        })
})

routes.post('/check', (req,res)=>{
    let {token} =req.body
    console.log('check,',token);
    let verify = security.checkToken(token)
    res.send(verify)
})


module.exports = routes