import type { Request, Response } from "express"
import Employee from "../models/employee.js"
import User from "../models/Users.js"
import mongoose from "mongoose"

export const createUser = async (req:Request, res:Response) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// //get employee
// //get: api/employee
export const getEmployeees = async(req:Request,res:Response) => {
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
export const createenmployee = async (req:Request, res:Response)=>{
  try{
      const employe= await Employee.create(req.body);
      console.log(employe)
      res.status(201).json({
        success: true,
        message:"Employee created sucessfully",
        data: employe,
      })
  }catch(error){
    res.status(500).json({
      success: false,
      message:"not able to inser data"
    })
  }


}


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
