const auth= (req,res,next)=>{
    const token = req.headers.authorization;;
    if(!token){
        res.status(403).send({message:'you must be logged in'});
    }
    next();
}

module.exports={
    auth
}