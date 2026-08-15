import type { Request, Response } from "express";
import User from "../models/Users.js";
import Employee from "../models/employee.js";
import type { AuthRequest } from "../middleware/auth.js";
export const getprofiledata = async (req:AuthRequest, res:Response)=>{
  const email = req.user!;
  try{
    const responce= await Employee.findOne({email:email.email})
    if(!responce){
      return res.status(404).json({
        error:"user not found"
      })
    }
    res.status(200).json({
      success:true,
      data:responce
    })
    console.log(responce)
  }catch(error){
    res.status(505).json({
      error
    })
  }
}

export const updateprofiledata = async ( req: AuthRequest, res: Response) => {
  try {
    const { email } = req.user!;
    const updateEmployee = await Employee.findOneAndUpdate(
      { email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updateEmployee,
    });

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};