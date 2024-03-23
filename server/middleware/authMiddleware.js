const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.secretKey, (err,decoded) => {
            if(decoded){
                console.log(decoded)
                req.body.userID = decoded.userID
                req.body.username = decoded.username
                next()
            }
            else {
                res.send({"message":"You are not authorised"})
            }
        })
    } 
    else {
        res.send({"message":"You are not authorised"})
    }
}

module.exports={
    auth
}