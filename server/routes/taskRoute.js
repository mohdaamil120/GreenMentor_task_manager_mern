const express = require("express")
const {TaskModel} = require("../models/taskModel")

const taskRouter = express.Router()


// CRUD operations for tasks
// All Routes are Restricted

// Get all task
taskRouter.get("/", async(req,res) => {
    
})

// Add new Task
taskRouter.post("/create", async(req,res) => {
   
})

// Update perticular task
taskRouter.patch("/update/:noteID", async(req,res) => {
 
})

// Delete perticular task
taskRouter.delete("/delete/:noteID", async(req,res) => {
   
})


module.exports = {
    taskRouter
}