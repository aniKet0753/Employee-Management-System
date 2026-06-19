"use client"
import {dummyPayslipData} from "../assets/assets"

export default function AdminPaySlip(){
  return <div style={{color:"white"}}>
    <h2>Payslips</h2>
    <p>Generate and manage employee payslips</p>
    <div>
      <table>
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
            <tr key={slip.id}><td>{slip.employee?.firstName}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}