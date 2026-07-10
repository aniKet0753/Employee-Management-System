
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { getEmployeees } from "./controller/employeeController.js";
import { createenmployee } from "./controller/employeeController.js"
import {createUser } from "./controller/employeeController.js"

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/",getEmployeees)
app.post("/api/employee",createenmployee)
app.post("/user",createUser)

const PORT = process.env.PORT;

await connectDB()
app.listen(PORT, () =>{
  console.log(`Backend server running on ${PORT}`);
})