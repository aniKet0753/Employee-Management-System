
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/",(req,res)=>{
 res.send("server is running")
})

const PORT = process.env.PORT;

await connectDB()
app.listen(PORT, () =>{
  console.log(`Backend server running on ${PORT}`);
})