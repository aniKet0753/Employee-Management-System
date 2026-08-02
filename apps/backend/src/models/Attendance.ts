import mongoose from "mongoose";

const attandanceSchema = new mongoose.Schema({
  employeeId: {type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true},
  data: {type: Date, required: true},
  checkIn: {type: Date, required: true},
  checkOut: {type: Date, required: false},
  status:{type: String, enum: ["PRESENT", "ABSENT"], default: "ABSENT"},
  workingHours: {type: Number, default: 0 },
  dayType: {type: String, enum: ["WEEKDAY", "WEEKEND", "HOLIDAY"], default: "WEEKDAY"},
},{timestamps:true})
attandanceSchema.index({ employeeId: 1, data: 1 }, { unique: true });

const Attandance = mongoose.model("Attandance", attandanceSchema)

export default Attandance;