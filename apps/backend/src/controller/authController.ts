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
      res.status(400).json({
        error: "Email and passsword not found",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found in DB",
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
    });
  } catch (error) {
    res.status(500).json({
      message: "server crash",
    });
  }
};

//session
