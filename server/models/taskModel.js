const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    userID: String,
    username: String,
    created_at: { type: Date, default: Date.now },
},{
    versionKey: false
})

const TaskModel = mongoose.model("task", taskSchema)

module.exports = {
    TaskModel
}
