const pool = require('../bbdd/index')
module.exports = {
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let query = 'INSERT INTO users(email, password, name, surname) VALUES (?,?,?,?)'
                    conn.query(query, [user.email, user.password, user.name, user.surname])
                        .then(row => {
                            console.log('row ',row);
                            resolve(row.insertId)
                        })
                        .catch(err => {
                            let { errno } = err
                            reject({ status: false, errno: errno, msg: errno == 1062 ? 'Usuario ya existe' : 'Error' })
                        })
                    conn.release()
                })
                .catch(err => {
                    reject({ status: false, msg: 'Error de conexion' })
                })
        })
    },
    getUser: (email) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let query = 'SELECT * FROM users WHERE email = ?'
                    conn.query(query, [email])
                        .then(row => {
                            resolve({status:true, data: row[0]})
                        })
                        .catch(err => {
                            console.log(err);
                            reject('Error query' )
                        })
                    conn.release();
                })
                .catch(err => {
                    reject('Error de conexion')
                })
        })
    },
}