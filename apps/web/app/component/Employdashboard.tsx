"use client";
import React from "react";
import { Calendar1Icon, DollarSignIcon, FileTextIcon} from 'lucide-react';
import { dummyEmployeeDashboardData } from "../assets/assets";
import navigation from "next/navigation";

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
      subtitle: "This month",
      path: "/attendance",
    },
    {
      icon: <FileTextIcon  color="white"/>,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
      path: "/leaves",
    },{
       icon: <DollarSignIcon  color="white"/>,
      value: data.latestPayslip ? `${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payment",
      path:"/payslip",
    }
  ]
  return (
    <div>
    <div style={{paddingLeft: "20px",color: "white", fontFamily: "-moz-initial", }}>
      <h2 style={{ color: "white",  fontSize: "30px", marginBottom:"6px"}}> Welcome {emp?.firstName} {emp?.lastName}</h2>
      <p style={{  color: "white", fontSize: "18px", marginTop:"0px"}}>{emp?.position} {emp?.department || " NO DEPARTMENT "}</p>
      <div style={{display:"flex", gap:"90px"}}> 
        {card.map((item) => (
          <div key={item.title} onClick={() => {item.path}} style={{cursor:"pointer",marginLeft:"30px",display: "inline-block",gap:"20px", backgroundColor: "rgb(44, 44, 44)", borderRadius: "8px", padding: "20px", marginRight: "20px", width: "200px"}}>
            <div style={{display: "flex", alignItems: "center", marginBottom: "7px" }}>{item.icon}
            <h3 style={{ color: "white", fontSize: "24px", margin: "0", marginLeft: "5px" }}>{item.value}</h3></div>
            <p style={{ color: "gray", fontSize: "14px", margin: "0", fontFamily:"inherit" }}>{item.title}</p>
            <p style={{ color: "lightgray", fontSize: "12px", margin: "0", fontFamily:"-moz-initial" , fontWeight:"bold" }}>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
    </div>

  )}
