"use client"
import { useState } from "react"
import {dummyPayslipData} from "../assets/assets"
import { dummyEmployeeData } from "../assets/assets";
import { Spline, Split } from "lucide-react";
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
    <h2>Payslips</h2>
    <p>Generate and manage employee payslips</p>
    <div >
      <table style={{width: "100%", borderCollapse: "collapse",}}>
        <thead style={{color:"white"}}>
          <tr>
           <th style={{ padding: "12px 8px" }}>EMPLOYEE</th>
           <th style={{ padding: "12px 8px" }}>PERIOD</th>
           <th style={{ padding: "12px 8px" }}>BASIC SALARY</th>
           <th style={{ padding: "12px 8px" }}>NET SELEARY</th>
           <th style={{ padding: "12px 8px" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dummyPayslipData.map((slip)=>(
            <tr key={slip.id}>
              <td>{extractName(slip.employeeId)}</td>
              <td>{formateperiod(slip.month, slip.year)}</td>
              <td style={{ paddingLeft: "40px" }}>{slip.basicSalary}</td>
              <td>${slip.netSalary}</td>
              <td><button><Download style={{maxHeight:"15px", maxWidth:'15px', marginRight:"2px", alignItems:"center"}}/>Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}