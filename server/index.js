import express, { response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'

const app = express()
app.use(cors({
    Credential : true,
    origin : process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 5000 || Process.env.PORT

app.get("/",(request,response)=>{
    ///server to client 

    response.json({
        message : "Server is running " + PORT
    })

})
connectDB().then(()=>{

    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
}
)
})