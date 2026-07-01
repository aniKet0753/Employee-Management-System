"use client";
import { Download } from "lucide-react";
import {dummyPayslipData} from "../assets/assets"
import { useRouter } from "next/navigation";
  const employeeIds = "69b41439f8a807df391d7b52"; // Replace with logged-in user's ID




const EmployeePyslip = dummyPayslipData.filter(
  (iteam)=>
    iteam.employeeId === employeeIds
)

console.log(EmployeePyslip );
export default function Payslips() {
  const router = useRouter()

const formateDate = (data:string) =>{
  return new Date(data).toLocaleDateString("en-US",{
    month:"short",
    year:"numeric",
    day:"numeric"
  })
}

function printpayslip() {
  setTimeout(() => {
    router.push(`/employe/payslip/printpayslip/${employeeIds}`)
  }, 1000);
}

  return (
    <div style={{ backgroundColor: "rgb(10, 13, 20)", height: "100%", width: "100%", padding: "20px" }}>
      <h1 style={{color:"white" , marginLeft:"10px", marginBottom:"0px", fontFamily:"sans-serif"}}>Payslips</h1>
      <p style={{color:"white" , marginTop:"3px",marginLeft:"10px", fontFamily:"sans-serif"}}>Your Payslip history</p>
      <table  style={{ width: "100%", borderCollapse: "collapse", marginTop:"30px", marginLeft:"30px"}}>
        <thead style={{color:"white"}}>
         <tr> 
          <td >PERIOD</td>
          <td>BASIC SALARY</td>
          <td>NET SELARY</td>
          <td>ACTIONS</td>
         </tr> 
        </thead>
        <tbody>
          {EmployeePyslip.map((payslips)=>(
            <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)",fontFamily:"sans-serif" , color:"white"}} key={payslips._id}>
              <td style={{padding:"14px 16px", fontWeight:600}}>{formateDate(payslips.createdAt)}</td>
              <td style={{padding:"14px 16px", fontWeight:600}}>{payslips.basicSalary}</td>
              <td style={{padding:"14px 16px", fontWeight:600}}>{payslips.netSalary}</td>
              <td><button onClick={printpayslip} style={{display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:500, padding:"5px 12px", borderRadius:"6px", background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#d1d5db", cursor:"pointer"}}><Download style={{height:"13px", width:"13px", fontFamily:"sans-serif"}}/>Downlode</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}