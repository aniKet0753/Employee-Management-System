import type { Request, Response } from 'express';
import LeaveApplication from "../models/Leaveapplication.js"
import Employee from "../models/employee.js"

//create leave 
//post 
export const leaveApplication = async (req: Request, res: Response)=>{
  const {email, type, startDate, endDate, reason } = req.body;

  if(!type || !startDate || !endDate || !reason){
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = await Employee.findOne({email: email});
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  if(new Date(startDate) < today || new Date(endDate) < today){
    return res.status(400).json({ message: "Start date and end date cannot be in the past" });
  }
  if(new Date(endDate) < new Date(startDate)){
    return res.status(400).json({ message: "End date cannot be before start date" });
  }
  const leave = await LeaveApplication.create({
    employeeId: employee._id,
    type,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    reason,
    status: "PENDING"
  });
  return res.status(201).json({ message: "Leave application submitted successfully", leave });
}

//get leave 
export const getleaveApplication = async (req: Request, res: Response)=>{
  const {email} = req.body;
  const findEmployee = await Employee.findOne({email});
  const isAdmin = req.body.role === "ADMIN";
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  const applications = await LeaveApplication.find()
  return res.status(200).json({ applications });
}



//update leave satus
