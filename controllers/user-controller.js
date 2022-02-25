const bd = require('../data/user')
const middlewares = require('../utilities/middlewares')
const routes = require('express').Router()
const security = require('../utilities/security')
//CRUD USER
routes.post('/create-user', middlewares.validateUser, (req, res) => {
    let user = req.body
    user.password = security.cipher(user.password)
    console.log('password', user.password);
    bd.createUser(user)
        .then(insertId=> {
            user = {...middlewares.createUserDto(user) }
            let token = security.createToken(user)
            let response = {status:true, data: {id: insertId, ...user, token}}
            res.json(response)
        })
        .catch(err => {
            console.log('mal', err);
            res.json(err)
        })
})

routes.post('/login',middlewares.validateLogin, (req,res)=>{
    let user = req.body
    bd.getUser(user.email)
        .then(result=>{
            if(result.data){
                //console.log('RESULTADO', result, req.body, user);
                hash = result.data.password || ''
                if (security.decipher(hash) == user.password){
                    middlewares.createUserDto(result.data)
                    let token = security.createToken(result.data)
                    result.data = {...result.data,token}
                    res.status(200).json(result);
                    return
                }
                res.status(400).json({status:false, msg:'Contraseña o correo incorrecto'})
            }else{
                res.status(200).json({status:false,msg:'No existe el usuario'})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err)
        })
})

routes.post('/check', (req,res)=>{
    let {token} =req.body
    console.log('check,',token);
    let verify = security.checkToken(token)
    res.send(verify)
})


module.exports = routes