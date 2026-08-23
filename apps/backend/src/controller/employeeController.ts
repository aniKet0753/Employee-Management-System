import type { Request, Response } from "express"
import Employee from "../models/employee.js"
import User from "../models/Users.js"
import mongoose from "mongoose"
import bcrypt, { hash } from "bcrypt";
import type { AuthRequest } from "../middleware/auth.js";
import { sendEmployeeEmail } from "../kafka/producer.js";

export const createUser = async (req:Request, res:Response) => {
  try {
    const user = await User.create(req.body);
    const userpassword =  await bcrypt.hash(user.password,10)
    user.password = userpassword;
    user.save()
    

    res.status(201).json({
      password: userpassword,
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// //get employee
// //get: api/employee
export const getEmployeees = async(req:AuthRequest,res:Response) => {

  try{
    const getemploye = await Employee.find().populate("userId");
    res.status(200).json(getemploye)
     console.log(getemploye);
  }catch(error:any){
    res.status(500).json({
      error:error.message,
    })
  }

}

// //create employee
// //post:  api/employee
export const createenmployee = async (req: AuthRequest,res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // Create User
    const userCreation = await User.create({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    // Create Employee using User's _id
    const employee = await Employee.create({
      userId: userCreation._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      basicSalary: req.body.basicSalary,
      allowances: req.body.allowances,
      deductions: req.body.deductions,
      employmentStatus: req.body.employmentStatus,
      joinDate: req.body.joinDate,
      isDeleted: req.body.isDeleted,
      bio: req.body.bio,
      department: req.body.department,
    });
    await sendEmployeeEmail({
      id: employee._id.toString(),
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: userCreation.role,
    });
    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
      userCreated: userCreation,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Not able to insert data",
      error,
    });
  }
};

// //update employee
// //pur: api/employee/:id

// export const updateemployee = async (req:Request, res:Response ) => {
//     const id = req.params.id;

//     if (!id || Array.isArray(id)) {
//         return res.send('No valid ID provided. Handling default behavior.');
//     }

//     try {
//         const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true,
//         });
// console.log(updatedEmployee)
//         if (!updatedEmployee) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Employee not found',
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: updatedEmployee,
//         });
//     } catch (error:any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
