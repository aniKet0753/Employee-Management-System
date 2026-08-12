import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import { error } from "console";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email: string;
  };
}

export const middleware = (req:AuthRequest, res:Response, next:NextFunction)=>{
  try{
  const authHeader= req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({
      error:"unauthorized"
    })
  }
      const token = authHeader.split(" ")[1];
      if(!token){
        return res.status(402).json({
          error:'please provide token inside header'
        })
      }
      const jwtsecrete=process.env.JWT;
      if(!jwtsecrete){
        return res.status(401).json({
          error:"please provide jwt secreate"
        })
      }
      const isverified = jwt.verify(token,jwtsecrete) as {
         userId: string;
         role: string;
         email: string;
      };
        req.user = isverified;
        next()
      
    }catch (error) {
  console.error("JWT VERIFICATION ERROR:", error);

  return res.status(401).json({
    message: "Invalid or expired token",
    error: error instanceof Error ? error.message : error,
  });
}
}