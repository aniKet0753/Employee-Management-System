import type { Request, Response } from "express";
import PaySlip from "../models/PaySlip.js";
import LeaveApplication from "../models/Leaveapplication.js";
import Employee from "../models/employee.js";
import Attandance from "../models/Attendance.js";
import { DEPARTMENTS } from "../constants/departments.js";
import type { AuthRequest } from "../middleware/auth.js";


// get dashoboard for employee and admin
export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.user!;
    const isAdmin = req.user!.role === "ADMIN";

    if(isAdmin){
      const  [totalEmployees, totalLeaves, totalPaySlips] = await Promise.all([
        Employee.countDocuments(),
        LeaveApplication.countDocuments({status: "APPROVED"}),
        PaySlip.countDocuments(),
        Attandance.countDocuments({
          date: {
            $gte : new Date(new Date().setHours(0,0,0,0)),
            $lt: new Date(new Date().setHours(24,0,0,0))
          },
        }),
      ]);
      return res.status(200).json({ role:"ADMIN" ,totalEmployees,totalDepartmenrs: DEPARTMENTS.length, totalLeaves, totalPaySlips });
    }else{
      const employee = await Employee.findOne({email})
      
      if(!employee) return res.status(404).json({ error: "Employee not found" })
        const today = new Date();
        const [PendingLeaves,latestPayslip,currentMonthAttendance] = await Promise.all([
          LeaveApplication.countDocuments({employeeId:employee._id,status:"PENDING"}),
          PaySlip.countDocuments({employeeId:employee._id}).sort({createdAt: -1}).lean(),
        Attandance.countDocuments({
          employeeId: employee._id,
          date:{
            $gte: new Date(today.getFullYear(),today.getMonth(),1),
            $lt: new Date(today.getFullYear(),today.getMonth()+1,1),
          }
        })
      ])
      return res.status(200).json({
        role:"EMPLOYEE",
        PendingLeaves,
        latestPayslip,
        currentMonthAttendance,
        firstName:employee.firstName,
        lastName:employee.lastName,
        position:employee.position,
        department:employee.department

      })
    }
  }catch (error) {
  console.error("DASHBOARD ERROR:", error);

  return res.status(500).json({
    message: "Error fetching dashboard data",
    error: error instanceof Error ? error.message : error,
  });
}

  }