import { Router } from "express";
import type { Request } from "express";
import type { Response } from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role_type } = req.body;
    if (!email || !password) {
     return res.status(400).json({
        error: "Email and passsword not found",
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found in DB",
      });
    }
     if (user.role !== role_type) {
       return res.status(403).json({
       message: "Invalid role selected"
     });
    }

    const isvalid = await bcrypt.compare(password, user.password); //comapre password from user model
    if (!isvalid) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };
    const secret = process.env.JWT;

    if (!secret) {
      throw new Error("JWT secret is missing");
    }

    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    return res.json({
      user: payload,
      token,
      message:"login successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "server crash",
    });
  }
};

//passowrd change 
export const changepassword= async (req:Request, res: Response)=>{
  try{
  const {email,password, newpassowrd}=req.body;
  const finduser= await User.findOne({email});
  console.log(finduser)
  if(!finduser){
    return res.status(401).json({
      error:"user not found"
    })
  }
  if(!email){
    return res.status(401).json({
      error:"user not found with this email"
    })
  }

  const  verified = await bcrypt.compare(password,finduser.password)

  if(!verified){
    return res.status(401).json({
      error:"password is not valid"
    })
  }
  if(verified){
    const createnewpassword = await bcrypt.hash(newpassowrd,10);
    finduser.password = createnewpassword;//new password ready to go on the place of old passowrd
    await finduser.save();//new passord saved succefully
    // await User.findByIdAndUpdate(userId)
    return res.status(200).json({
      createnewpassword:createnewpassword,
      sucess:true
    })
  }
}catch(error){
  res.status(500).json({
    error:"error occure while updating the password"
  })
}
}
