require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./router/users")
const bookRouter = require("./router/books")
const cors = require("cors")
const corObj =  {
                'allowedHeaders': ['Authorization', 'Content-Type'],
                'origin': '*',
                'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
                'preflightContinue': false
                }
app.use(cors(corObj))
app.use(express.json())
app.use("/user",userRouter)
app.use("/books",bookRouter)

app.listen(process.env.SERVER_PORT,function(){
    console.log("Application started... at "+process.env.SERVER_PORT)
})