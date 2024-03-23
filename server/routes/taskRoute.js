const express = require("express")
const {TaskModel} = require("../models/taskModel")
const { auth } = require("../middleware/authMiddleware")
// const jwt = require("jsonwebtoken")

const taskRouter = express.Router()


// CRUD operations for tasks
// All Routes are Restricted

// Get all task
taskRouter.get("/", auth, async(req,res) => {
    try {
        const tasks = await TaskModel.find({userID:req.body.userID})
        res.status(200).send(tasks)
    } catch (err) {
        res.status(400).send({"message":"Something wrong while getting task for perticular user","Error":err})
    }
})

// Add new Task
taskRouter.post("/create", auth, async(req,res) => {
    try {
        const task = new TaskModel(req.body)
        await task.save()
        res.status(200).send({"message":"A new task has been added"})
    } catch (err) {
        res.status(400).send({"message":"Something wrong while Adding new task for perticular user","Error":err})
    }
})

// Update perticular task
taskRouter.patch("/update/:taskID", auth, async(req,res) => {
    const {taskID} = req.params
    try {
        const task = await TaskModel.findOne({_id:taskID})
        if(req.body.userID === task.userID){
            await TaskModel.findByIdAndUpdate({_id :taskID}, req.body)
            res.status(200).send({"message":`Task with ID:${taskID} has been updated`})
        } else {
            res.status(200).send({"message":"You are not authorized"})
        }
    } catch (err) {
        res.status(400).send({"message":"Something wrong while Updating a task","Error":err})
    }
})

// Delete perticular task
taskRouter.delete("/delete/:taskID", auth, async(req,res) => {
    const {taskID} = req.params
    try {
        const task = await TaskModel.findOne({_id:taskID})
        if(req.body.userID === task.userID){
            await TaskModel.findByIdAndDelete({_id :taskID})
            res.status(200).send({"message":`Task with ID:${taskID} has been deleted`})
        } else {
            res.status(200).send({"message":"You are not authorized"})
        }
    } catch (err) {
        res.status(400).send({"message":"Something wrong while deleting a task","Error":err})
    }
})


module.exports = {
    taskRouter
}