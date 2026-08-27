import Razorpay from "razorpay";
import type { Request,Response } from "express";
import  RazorpayPayment  from "../models/Payment.js";
import type {AuthRequest}  from "../middleware/auth.js";

export const razorpayment = async (req: AuthRequest, res:Response)=>{
  try{
    const {amount} = req.body;
    if(!amount || amount<=0){
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      })
    }
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!
    });

    const order = await razorpay.orders.create({
      amount:amount,
      currency:"INR",
      receipt: `receipt_${Date.now()}`
    })
    const paymnet = await RazorpayPayment.create({
    userId: req.user!.userId,
    amount: amount,
    currency:"INR",
    razorpayOderId:order.id,
    status: "CREATED"
    })
    return res.status(200).json({
      success: true,
      order:{
        id: order.id,
        adminId: paymnet.userId,
        amount:order.amount,
        currency:order.currency
      },
      razorpayPaymentId: paymnet._id
    })
  }catch(error){
    console.error("paymeny creation error: ",error);
    return res.status(500).json({
      success: false,
      message:"FAILD TO CREATE PAYMENT"
    })
  }
}
