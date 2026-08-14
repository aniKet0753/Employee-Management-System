
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { getEmployeees } from "./controller/employeeController.js";
import { createenmployee } from "./controller/employeeController.js"
import {createUser } from "./controller/employeeController.js"
import { changepassword, login } from "./controller/authController.js";
import { middleware } from "./middleware/auth.js";
import { getprofiledata, updateprofiledata } from "./controller/profileController.js";
import { clockInOut, getAttandance } from "./controller/attandenceController.js";
import { getleaveApplication, leaveApplication, updateLeaveStatus } from "./controller/leaveController.js";
import { generatePaySlip, getPaySlip, getPaySlipById } from "./controller/paySlipController.js";
import {getDashboard } from "./controller/dashboardController.js"
// import { updateemployee } from "./controller/employeeController.js"


const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/",getEmployeees)
app.post("/api/employee",createenmployee)
app.post("/user",createUser)
// app.put("/api/employee/:id",updateemployee)
// app.delete("/api/employee/:id",deleteEmployee)
app.post("/login",login)
app.get("/api/users",getprofiledata)
app.post("/newpassword",middleware,changepassword)
app.put("/api/profile/update",updateprofiledata)
app.get("/api/attendance",middleware,getAttandance)
app.post("/api/attendance",middleware,clockInOut)
app.post("/api/leave",leaveApplication)
app.get("/api/leaveapplication",middleware,getleaveApplication)
app.put("/api/leave/:id",updateLeaveStatus)
app.get("/api/payslip",getPaySlip)
app.post("/api/payslip",generatePaySlip)
app.get("/api/employee/:id",getPaySlipById)
app.get("/api/dashboard",middleware,getDashboard)

const PORT = process.env.PORT;

await connectDB()
app.listen(PORT, () =>{
  console.log(`Backend server running on ${PORT}`);
})