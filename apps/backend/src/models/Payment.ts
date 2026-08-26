import mongoose,{Schema, Document} from "mongoose";

// export interface IPayment extends Document {
//   userId? : mongoose.Types.ObjectId;
//   amount: number;
//   currency: string;

//   razorpayOrderId: string;
//   razorPayPaymentId?: string
//   status: "CREATED"| "PAID" | "FAILED";

//   createdAT: Date;
//   updatedAt: Date;
// }

const razorPaymentSchema  = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  amount:{type: Number,default:0},
  currency:{type:String, default:"INR"},
  razorpayOderId:{type: String, required:true, unique:true},
  razorpayPaymentId:{type:String},
  status:{type:String,enum:["CREATED", "PAID", "FAILED"],
    default:"CREATED",},
}, { timestamps: true });

const RazorpayPayment  = mongoose.model("RazorPayment", razorPaymentSchema );

export default RazorpayPayment;