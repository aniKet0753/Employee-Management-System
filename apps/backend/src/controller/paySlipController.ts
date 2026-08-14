import type { Request, Response } from "express";
import User from "../models/employee.js";
import PaySlip from "../models/PaySlip.js";
import Employee from "../models/employee.js";
import type { AuthRequest } from "../middleware/auth.js";

export const generatePaySlip = async (req: Request, res: Response) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;

    const NetSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);
    const isAdmin = req.body.role === "ADMIN";
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied, this is for Admin only" });
    }
    const payslip = await PaySlip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary: NetSalary,
    });
    return res
      .status(201)
      .json({ message: "Pay slip generated successfully", payslip });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error generating pay slip", error });
  }
};

//get payslip for both employee and admin
export const getPaySlip = async (req: AuthRequest, res: Response) => {
  try {
    const {email} = req.user!;
    const isAdmin = req.user!.role === "ADMIN";
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if(isAdmin){
    const payslips = await PaySlip.find()
    return res.status(200).json({ payslips });
    }else{
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      const payslips = await PaySlip.find({ employeeId: employee._id });
      return res.status(200).json({ payslips });
    }
  }catch (error) {
    return res.status(500).json({ message: "Error fetching pay slip", error });
  }
}

//get playsliip by id
export const getPaySlipById = async (req: Request, res: Response) => {
  try{
    const isAdmin = req.body.role === "ADMIN";
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied, this is for Admin only" });
    }
    const Payslip = await PaySlip.findById(req.params.id).populate("employeeId").lean(); 
    return res.status(200).json({ Payslip });
  }catch (error) {
    return res.status(500).json({ message : "Error while fetching the data by id", error})
  }
}