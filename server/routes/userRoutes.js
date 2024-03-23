const express = require("express")
const {UserModel} = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const userRouter = express.Router()


// Register route

userRouter.post("/register", async(req,res)=>{
    const {username, email, password} = req.body
    try {
        if( !username || !email || !password){
            return res.status(201).send({"message":"All Fields are mandatory"})
        }
        else {
            const isPresent = await UserModel.findOne({email})
            if(isPresent){
                return res.status(201).send({"message":"User is already present"})
            }
            else {
                bcrypt.hash(password,5,(err,hash)=>{
                    if(err){
                        res.status(201).send({"message":"Something wrong while hashing the passowrd"})
                    }
                    else {
                        const user = new UserModel({username,email,password:hash})
                        user.save()
                        res.status(200).send({"message":"A new user has been registered"})
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send({"msg":"something wrong in catch block for user", "Error":err})
    }
})

// Login route

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body
    try {

        if( !email || !password){
            return res.status(201).send({"message":"All fields are mandatory"})
        }
        else{
            const user = await UserModel.findOne({email})
            if(!user) {
                return res.status(201).send({"message":"Please Register first"})
            }
            else{
                bcrypt.compare(password, user.password, (err,result) => {
                    if(result){
                        const token = jwt.sign({ userID:user._id, username:user.username },process.env.secretKey,{expiresIn:"1d"})
                        res.status(200).send({"message":"Login Successfull!", "token":token})
                    } else {
                        res.status(201).send({"message":"Wrong Credentials"})
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send({"message":"Error in login catch while login ","Error": err} )
    }
})

// user profile

userRouter.get("/profile", (req,res)=>{
    
})


module.exports = {
    userRouter
}