const express = require("express")
const {UserModel} = require("../models/userModel")

const userRouter = express.Router()


// Register route

userRouter.post("/register", (req,res)=>{
    //logic
})

// Login route

userRouter.post("/login", (req,res)=>{
    //logic
})

// user profile

userRouter.get("/profile", (req,res)=>{
    //logic
})


module.exports = {
    userRouter
}