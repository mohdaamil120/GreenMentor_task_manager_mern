const mongoose = require("mongoose")
require("dotenv").config()

// MongoDb Atlas
const connection = mongoose.connect(process.env.mongoURL)

// Local mongoDB
// const connection = mongoose.connect(process.env.LOCALDB)


module.exports = {
    connection
}
