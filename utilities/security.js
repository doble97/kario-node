const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const {Buffer} = require('buffer')
const {SECURITY_SALT, SECURITY_IV} = require('../config/index')
const jwt = require('jsonwebtoken')
//const keyLength = crypto.randomBytes(32);
const initVector = Buffer.from(SECURITY_IV)
const key = Buffer.from(SECURITY_SALT)
module.exports = {
    cipher : (password)=> {
        //Encriptando el mensaje
        const cipher = crypto.createCipheriv(algorithm, key, initVector)
        let encryptedData = cipher.update(password, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData
    },
    decipher: (hash) =>{
        const dcipher = crypto.createDecipheriv(algorithm, key, initVector);
        let data = dcipher.update(hash, 'hex', 'utf-8');
        data += dcipher.final('utf-8');
        return data
    },
    createToken:(user)=>{
        console.log('USER CREADO TOKEN: ', user);
        let payload = {
            ...user
        }
        let token = jwt.sign(payload,SECURITY_SALT)
        return token
    },
    checkToken:(token)=>{
        return new Promise((resolve,reject)=>{
            try{
                let isValid = jwt.verify(token,SECURITY_SALT)
                resolve({status:true, data:{...isValid}})
            }
            catch (error){
                reject({status:false, msg:error.message})
            }
        })
    }

}
