"use client"
import { useState } from "react"
import {dummyPayslipData} from "../assets/assets"
import { dummyEmployeeData } from "../assets/assets";
import { Download } from "lucide-react";

export default function AdminPaySlip(){
  const [name, setname ]= useState(dummyPayslipData);

  const extractName = (employeeId: string)=>{
    const empName = dummyEmployeeData.find((e)=> e.id === employeeId)
    return empName ? `${empName.firstName} ${empName.lastName}` : "Unknown";
  }
  const formateDate = (data: string)=>{
    return new Date(data).toLocaleDateString("en-US",{
      month: "short",
      year: "numeric",
      day: "numeric"
    })
  }

  const formateperiod = (month: number , year: number)=>{
    return new Date(year , month -1 ).toLocaleString("en-US",{
      month : "long",
      year: "numeric"
    })
  }
//new Date(2026, 0) this represent as january so thats y i did month -1

  return <div style={{padding: "24px", color: "white" , width:"100%"}}>
    <h2 style={{fontSize:"22px", fontWeight:700, margin:"0 0 4px 0"}}>Payslips</h2>
    <p style={{fontSize:"13px", color:"#9ca3af", margin:"0 0 24px 0"}}>Generate and manage employee payslips</p>
    <div >
      <table style={{width: "100%", borderCollapse: "collapse",}}>
        <thead style={{fontFamily:"sans-serif"}}>
          <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
           <th style={{ padding: "10px 16px", textAlign:"left", fontSize:"11px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em" }}>EMPLOYEE</th>
           <th style={{ padding: "10px 16px", textAlign:"left", fontSize:"11px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em" }}>PERIOD</th>
           <th style={{ padding: "10px 16px", textAlign:"right", fontSize:"11px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em" }}>BASIC SALARY</th>
           <th style={{ padding: "10px 16px", textAlign:"right", fontSize:"11px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em" }}>NET SALARY</th>
           <th style={{ padding: "10px 16px", textAlign:"right", fontSize:"11px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dummyPayslipData.map((slip)=>(
            <tr key={slip.id} style={{borderBottom:"1px solid rgba(255,255,255,0.06)",fontFamily:"sans-serif"}}>
              <td style={{padding:"14px 16px", fontWeight:600}}>{extractName(slip.employeeId)}</td>
              <td style={{padding:"14px 16px", color:"#d1d5db"}}>{formateperiod(slip.month, slip.year)}</td>
              <td style={{padding:"14px 16px", textAlign:"right", color:"#9ca3af"}}>${slip.basicSalary.toLocaleString("en-US")}</td>
              <td style={{padding:"14px 16px", textAlign:"right", fontWeight:600}}>${slip.netSalary.toLocaleString("en-US")}</td>
              <td style={{padding:"14px 16px", textAlign:"right"}}>
                <button style={{display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:500, padding:"5px 12px", borderRadius:"6px", background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#d1d5db", cursor:"pointer"}}>
                  <Download style={{height:"13px", width:"13px", fontFamily:"sans-serif"}}/>Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}