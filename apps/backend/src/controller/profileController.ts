import type { Request, Response } from "express";
import User from "../models/Users.js";
import Employee from "../models/employee.js";
import { stringify } from "querystring";

export const getprofiledata = async (req:Request, res:Response)=>{
  const email = req.body;
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

export const updateprofiledata = async (req:Request, res:Response)=>{
  const userdata = req.body.email;
  try{

  }catch(error){

  }
}