const express = require("express")
const {UserModel} = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { auth } = require("../middleware/authMiddleware")


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

userRouter.get("/profile", auth, async(req,res)=>{
    try {
        // Get the user ID from the request body
        const userId = req.body.userID;
    
        // Find the user based on the ID
        const user = await UserModel.findById(userId).select("-password");
    
        // If user found, send user details in response
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({ "message": "User not found" });
        }
      } catch (err) {
        res.status(400).send({ "message": "Server Error", "error": err });
      }
})


// Update profile route
userRouter.patch("/profile", auth, async (req, res) => {
    try {
      const userId = req.body.userID;
      const { username, email } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      ).select("-password");
      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ "message": "User not found" });
      }
    } catch (err) {
      res.status(400).send({ "message": "Server Error", "error": err });
    }
  });

module.exports = {
    userRouter
}