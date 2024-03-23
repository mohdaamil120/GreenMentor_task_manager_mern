const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, required: true , maxlength: 50},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
},{
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}
