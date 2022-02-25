const pool = require('../bbdd/index')
module.exports = {
    createDeck: (deck, idUser)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let query = 'insert into deck_of_cards(name,fk_user,fk_language) values(?,?,?)'
                    conn.query(query,[deck.name, idUser, deck.fk_language])
                        .then(row=>{
                            resolve({status:true, data:{
                                msg:'Baraja creada',
                                id: row.insertId,
                                nameDeck: deck.name,
                                fk_language: deck.fk_language
                            }})
                        })
                        .catch(err=>{
                            reject(err)
                        })
                    conn.release()
                })
                .catch(err=>{
                    reject(err)
                })
        })
    },
    deleteDeck: (idDeck, idUser)=>{
        return new Promise((resolve,reject)=>{
            pool.getConnection()
                .then(conn=>{
                    let query = 'delete from deck_of_cards where id=? and fk_user=?'
                    conn.query(query,[idDeck, idUser])
                        .then(row=>{
                            resolve({status:true, data:{msg:'Baraja eliminada'}})
                        })
                        .catch(err=>{
                            reject({status:true, })
                        })
                })
                .catch(err=>{
                    reject({status:false,msg:err})
                })
        })
    }
}