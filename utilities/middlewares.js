const security = require("./security")

module.exports = {
    validateUser: (req, res, next) => {
        let user = req.body
        if (!(user.email && user.password && user.name && user.surname)) {
            return res.status(400).json({ status: false, msg: 'Error faltan parametros' })
        }
        next()
    },
    validateLogin: (req, res, next) => {
        let user = req.body
        // let token = req.headers.authorization.split(" ")[1];
        // if (token) {
        //     security.checkToken(token)
        //         .then(result => {
        //             res.locals.user = result

        //         })
        //         .catch(err => {
        //             res.json(err)
        //         })
        // }
        if (!(user.email && user.password)) {
            return res.status(400).json({ status: false, msg: 'Error, faltan parametros' });
        }
        next()

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
    createUserDto: (user) => {
        delete user.password
        return user
    },

}
