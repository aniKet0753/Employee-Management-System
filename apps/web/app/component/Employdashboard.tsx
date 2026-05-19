"use client";
import React from "react";
import { Calendar1Icon, DollarSignIcon, FileTextIcon} from 'lucide-react';
import { dummyEmployeeDashboardData } from "../assets/assets";

type dummyEmployeeDashboardData = {
  data: any;
};

export default function EmployeeDashboard ({data}: dummyEmployeeDashboardData) {
  console.log("Data in EmployeeDashboard component:", data);
  const emp = data.employee;
  const card = [
    {
      icon: <Calendar1Icon  color="white"/>,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month"
    },
    {
      icon: <FileTextIcon  color="white"/>,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval"
    },{
       icon: <DollarSignIcon  color="white"/>,
      value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payment"
    }
  ]
  return (
    <div>
    <div style={{paddingLeft: "20px",color: "white", fontFamily: "-moz-initial", }}>
      <h2 style={{ color: "white",  fontSize: "30px", marginBottom:"6px"}}> Welcome {emp?.firstName} {emp?.lastName}</h2>
      <p style={{  color: "white", fontSize: "18px", marginTop:"0px"}}>{emp?.position} {emp?.department || " NO DEPARTMENT "}</p>
      <div> 
        {card.map((item) => (
          <div key={item.title} style={{display: "inline-block",gap:"", backgroundColor: "#2c2c2c", borderRadius: "8px", padding: "20px", marginRight: "20px", width: "200px"}}>
            <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>{item.icon}</div>
            <h3 style={{ color: "white", fontSize: "24px", margin: "0" }}>{item.value}</h3>
            <p style={{ color: "gray", fontSize: "14px", margin: "0" }}>{item.title}</p>
            <p style={{ color: "lightgray", fontSize: "12px", margin: "0" }}>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
    </div>

  )}
