"use client";
import axios from "axios";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Payslip = {
  _id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  createdAt: string;
};

export default function Payslips() {
  const router = useRouter()
  const [data, setData] = useState<Payslip[]>([]);
  useEffect(()=>{

  const fetchpayslip = async ()=>{
      try{
    const token = localStorage.getItem("token")
    if(!token){
      console.log("this is an eroor token require");
    }
    const responce = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/payslip`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    console.log("responce ",responce.data);
    setData(responce.data.payslips);
  }catch(error){
    console.log("error",error)
  }
}
  fetchpayslip()
},[])

const formatPeriod = (month: number, year: number) => {
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day:"numeric"
  });
};

const formateDate = (data:string) =>{
  return new Date(data).toLocaleDateString("en-US",{
    month:"short",
    year:"numeric",
    day:"numeric"
  })
}

function printpayslip() {
  setTimeout(() => {
    router.push(`/employe/payslip/printpayslip/${`employeeId`}`)
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
          {data?.map((payslip)=>(
            <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)",fontFamily:"sans-serif" , color:"white"}} key={payslip._id}>
              <td style={{padding:"14px 16px", fontWeight:600}}>{formatPeriod(
                    payslip.month,
                    payslip.year
                  )}</td>
              <td style={{padding:"14px 16px", fontWeight:600}}>{payslip.basicSalary.toLocaleString("en-IN")}</td>
              <td style={{padding:"14px 16px", fontWeight:600}}>{payslip.netSalary.toLocaleString("en-IN")}</td>
              <td><button onClick={printpayslip} style={{display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:500, padding:"5px 12px", borderRadius:"6px", background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#d1d5db", cursor:"pointer"}}><Download style={{height:"13px", width:"13px", fontFamily:"sans-serif"}}/>Downlode</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}