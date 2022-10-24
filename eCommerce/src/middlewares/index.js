require('dotenv').config({path:'../.env'})
const authMiddleware = (req,res,next)=>{
    console.log(process.env);
    if(process.env.ADMIN=="true"){
        next();
    } else{
        res.send("No tiene permisos de admin para realizar esta acción.")
    }
}

module.exports = {authMiddleware};