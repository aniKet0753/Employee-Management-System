
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/",(req,res)=>{
 res.send("server is running")
})

const PORT = process.env.PORT;

app.listen(PORT, () =>{
  console.log(`Backend server running on ${PORT}`);
})