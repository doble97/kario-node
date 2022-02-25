const deck = require('../data/deck');
const middlewares = require('../utilities/middlewares');

const routes = require('express').Router()

routes.post('/create-deck', middlewares.validateToken,middlewares.validateDeck ,(req, res)=>{
    deck.createDeck(res.locals.deck, res.locals.user.data.id)
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.send(err)
        })
})
routes.delete('/delete-deck/:idDeck', middlewares.validateToken,(req,res)=>{
    // delete-deck/1
    let idDeck=req.params.idDeck
    deck.deleteDeck(idDeck, res.locals.user.data.id)
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.send(err)
        })
})

module.exports = routes