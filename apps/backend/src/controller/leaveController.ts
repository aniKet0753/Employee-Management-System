import type { Request, Response } from 'express';
import LeaveApplication from "../models/Leaveapplication.js"
import Employee from "../models/employee.js"
import type { AuthRequest } from '../middleware/auth.js';

//create leave 
//post 
export const leaveApplication = async (req: AuthRequest, res: Response)=>{
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
export const getleaveApplication = async (req: AuthRequest, res: Response)=>{
  const {email} = req.user!;

  const isAdmin = req.user!.role === "ADMIN";
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!isAdmin) {
    const employee = await Employee.findOne({email})

    if(!employee) return res.status(404).json({ error: "Employee not found" })

    const [sickLeave, casualLeave, AnuallLaeve,leavedata]= await Promise.all([
         LeaveApplication.countDocuments({employeeId:employee._id,type: "SICK" }),
         LeaveApplication.countDocuments({employeeId:employee._id,type: "CASUAL" }),
         LeaveApplication.countDocuments({employeeId:employee._id,type: "EARNED" }),
         LeaveApplication.findOne({employeeId:employee._id})
        ]) 
  return res.status(200).json({
    sickLeave,
    casualLeave,
    AnuallLaeve,
    leavedata
    })
  }else{
  const applications = await LeaveApplication.find().populate("employeeId","firstName lastName")
  return res.status(200).json({ applications });
}
}



//update leave satus
export const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const leave = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return updated document
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};