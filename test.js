
 const utilities = require('./utilities/security')
 const {SECURITY_SALT} = require('./config/index')
/* console.log(utilities.cipher('hola mundo'));
let hash = utilities.cipher('123456');
console.log(utilities.decipher(hash, '12345'))
/////
try{
    console.log(utilities.decipher('ec0f555dd8bbd85f63d8e45301f9e779', '123456'));
}catch(err){
    if (err.code == 'ERR_OSSL_EVP_BAD_DECRYPT'){
        console.log('Error en la desencriptacion');
    }
}*/
const jose = require('jose')
async function  createToken () {
    const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(Buffer.from(SECURITY_SALT))
    console.log(jwt)
    return jwt
}

createToken().then(result =>{
    console.log('bien');
})
.catch(err=>{
    console.log('error', err);
})