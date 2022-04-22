const security = require("./security")
const Custom_Exception = require('../exceptions/custon_Exception')
module.exports = {
    validateUser: (req, res, next) => {
        let user = req.body
        if (!(user.email && user.password && user.name && user.surname)) {
            throw new Custom_Exception('Faltan parametros en la petición enviada','Error Parameter', req.url)
        }
        next()
    },
    validateLogin: (req, res, next) => {
        let user = req.body
        if (!(user.email && user.password)) {
            throw new Custom_Exception('Error, faltan parametros','Error Parameter',req.url)
        }
        next()

    },
    validateToken: (req, res, next) => {
        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            security.checkToken(token)
                .then(result => {
                    res.locals.user = result
                    console.log('RESULTA TOKEN-->',result);
                    next()
                })
                .catch(err => {
                    res.json('err')
                })
        }
        else{
            res.json({status:false, msg:'No se ha enviado el token'})
        }
    },
    validateDeck: (req,res, next)=>{
        let deck = req.body
        if(deck.name && deck.fk_language){
            res.locals.deck=deck
            next()
            return
        }
        res.status(200).json({status:false, msg:'Faltan parametros para crear la baraja'})
    },
    checkPass: (req, res, next) => {
        let user = req.body
        bd.getUser(user.email)
            .then(result => {
                hash = result.data[0].password || ''
                if (security.decipher(hash) == user.password) {
                    middlewares.createUserDto(result.data[0])
                    res.status(200).json(result);
                    return
                }
                res.status(400).json({ status: false, msg: 'Contraseña o correo incorrecto' })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    validateDeleteDeck: (req,res,next)=>{
        let data = {idUser:req.params.idUser, idDeck: req.query.idDeck}
        if(!(data.idUser && data.idDeck)){

        }
    },

    createUserDto: (user) => {
        delete user.password
        return user
    },

}
