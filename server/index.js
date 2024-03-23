const express = require("express")
const {connection} = require("./db") 
const { userRouter } = require("./routes/userRoutes")
const { taskRouter } = require("./routes/taskRoute")

// PORT
const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

// user routes when you hit (/users) it will take you through userRouter
app.use("/users",userRouter)

// tasks routes when you hit (/tasks) it will take you through taskRouter
app.use("/tasks",taskRouter)


// Runnig on port listen
app.listen(8080, async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Server is runnig at port ${PORT}`)
    } catch (err) {
        console.log("Error while connecting DB")      
    }
})


