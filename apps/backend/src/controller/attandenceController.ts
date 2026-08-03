import type { Request, Response } from "express";
import Employee from "../models/employee.js";
import Attandance from "../models/attendance.js";


export const clockInOut = async (req: Request, res: Response) =>{
  const { email } = req.body;
  const employee = await Employee.findOne({email:email});
    if(!email){
    res.status(400).json({
      success:false,
      message:"Email is required"
    })
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
  const existingAttendance = await Attandance.findOne({ employeeId: employee?._id, data: today });
  const now = new Date();
  if(!existingAttendance){
    const isLate = now.getHours()>= 9 && now.getMinutes() > 0;
    const attendance = await Attandance.create({
      employeeId: employee?._id,
      data: today,
      checkIn: now,
      status: isLate ? "ABSENT" : "PRESENT",
    })
    return res.status(200).json({
      success:true,
      type:"checkin", 
      data: attendance
    })
  }else if(!existingAttendance.checkOut){
    const checkInTime = new Date(existingAttendance.checkIn).getTime();
    const duffms = now.getTime() - checkInTime;
    const durationInHours = duffms / (1000 * 60 * 60);
    existingAttendance.checkOut = now;

   const workinghour = parseFloat(durationInHours.toFixed(2));
   let datatype = "Half day";
  // Map calculated working duration to the application's dayType union
  // Allowed values for dayType are: "WEEKDAY" | "WEEKEND" | "HOLIDAY"
  // Default to WEEKDAY; if the date falls on weekend mark as WEEKEND.
  let dayTypeUnion: "WEEKDAY" | "WEEKEND" | "HOLIDAY" = "WEEKDAY";
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    dayTypeUnion = "WEEKEND";
  }
   if(workinghour >= 8){
    datatype = "Full day"
   }else if(workinghour >= 6){
    datatype = "three quarter day"
  }else if(workinghour >= 4){
    datatype = "Half day"
  }else{
    datatype = "Less than half day"
  }
  existingAttendance.workingHours = workinghour;
  // store human-readable label in `datatype` and typed union in `dayType`
  existingAttendance.dayType = dayTypeUnion;
  await existingAttendance.save();
  return res.status(200).json({
    success:true,
    type:"checkout",
    data: existingAttendance
  })
}
}

export const getAttandance = async (req: Request, res: Response) =>{
  const { email } = req.body;
  const employee = await Employee.findOne({email:email});
  if(!email){
    res.status(400).json({
      success:false,
      message:"Email is required"
    })
  }
  try{
    const limit = parseInt(req.query.limit as string) || 30;
    const history = await Attandance.find({employeeId:employee?._id}).sort({data:-1}).limit(limit);
    return res.json({
      success:true,
      history,
      employeeId:employee?._id
    })
    // const checkinDate= new Date();
    // const checkintime =  new Date().toLocaleTimeString("en-Us",{
    //   hour:"2-digit",
    //   minute:"2-digit",
    //   second:"2-digit"
    // })
    // const formatedDate = checkinDate.toLocaleDateString("en-Us",{
    //   month:"2-digit",
    //   day:"2-digit",
    //   year:"numeric"
    // })
    // return res.status(200).json({
    //   sucess:true,
    //   checkinDate:formatedDate,
    //   checkinTime:checkintime
    // })
  }catch(error){
    res.status(500).json({
      error
    })
  }

}