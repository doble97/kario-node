const pool = require('../bbdd/index')
module.exports = {
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let query = 'INSERT INTO users(email, password, name, surname, created_at) VALUES (?,?,?,?,now())'
                    conn.query(query, [user.email, user.password, user.name, user.surname])
                        .then(row => {
                            resolve({ status: true, data: user })
                        })
                        .catch(err => {
                            let { errno } = err
                            reject({ status: false, errno: errno, msg: errno == 1062 ? 'Usuario ya existe' : 'Error' })
                            console.log('ERROR QUERY', err);
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
                            reject({ status: false, msg: 'Error bbbdd' })
                        })
                    conn.release();
                })
                .catch(err => {
                    reject({ status: false, msg: 'Error de conexion' })
                })
        })
    },
}