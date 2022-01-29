module.exports = {
    validateUser: (req,res,next)=>{
        let user = req.body
        console.log('MIDLWARA', user);
        console.log("resultdo middleware",!(user.email && user.password && user.name && user.surname));
        if(!(user.email && user.password && user.name && user.surname))
        {
            return res.status(400).json({status:false, msg:'Error faltan parametros'})
        }
        next()
    },


}
