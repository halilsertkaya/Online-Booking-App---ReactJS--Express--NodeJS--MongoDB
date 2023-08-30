import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute   from  "./root/auth.js"
import usersRoute  from  "./root/users.js"
import hotelsRoute from  "./root/hotels.js"
import roomsRoute  from  "./root/rooms.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()
mongoose.set('strictQuery', true); // fix for console log strictquery def warning

const baglan = async ()=>{

try{
await mongoose.connect(process.env.MONGO);
console.log("Connected to mongoDB.")
} catch (error){
throw error
}

};

mongoose.connection.on("disconnected", ()=>{
 console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected", ()=>{
 console.log("mongoDB connected!")
})

//midwares


/// fix for json postes
app.use(cookieParser())
app.use(express.json())
///
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);



app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message: errorMessage,
    stack: err.stack,
    })
})


app.listen(8888, ()=>{
    baglan()
console.log("Connected to backend!.")   
})