const bd = require('../data/user')
const middlewares = require('../utilities/middlewares')
const routes = require('express').Router()
//CRUD USER
routes.put('/create-user', middlewares.validateUser, (req, res) => {
    let user = req.body
    bd.createUser(user)
        .then(result => {
            console.log('CREADO', result);
            res.send(result)
        })
        .catch(err => {
            res.json(err)
        })
})

routes.get('/user', (req, res) => {
    console.log('/user');
    res.send('user get')
})
routes.get('/', (req, res) => {
    res.send('default')
})

module.exports = routes