const express = require("express")
const cors = require("cors")
const connectMongo = require("./config/connectMongo")
const userRouter = require("./routes/userRouter")
const urlRouter = require("./routes/urlRouter")
require("dotenv").config()



const app=express()

//Connect to MongoDB
connectMongo(process.env.MONGO_URI)


//middlewares
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())


//Routes
app.use("/api/user",userRouter)
app.use("/api/url",urlRouter)
app.get("/Health",(req,res)=>{
    res.status(200).send("Hello from server")
})


const port = 8000
app.listen(port,(()=>{
    console.log("Server Started")
}))