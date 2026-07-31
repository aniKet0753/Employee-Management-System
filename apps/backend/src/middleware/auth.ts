import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import { error } from "console";

export const middleware = (req:Request, res:Response, next:NextFunction)=>{
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
      const isverified = jwt.verify(token,jwtsecrete);

      if(isverified){

        next()
      }
    }catch(error){
      res.status(500).json({
        messgae:"middleware verification failed"
      })
    }
}