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
    <div style={{color:"white" , marginLeft:"20px" , marginTop:"20px", fontFamily:"Roboto"}}>Employee Dashboard</div>
    <div style={{paddingLeft: "20px",color: "white", fontFamily: "-moz-initial", }}>
      <h2 style={{ color: "white",  fontSize: "30px", marginBottom:"6px"}}> Welcome {emp?.firstName} {emp?.lastName}</h2>
      <p style={{  color: "white", fontSize: "18px", marginTop:"0px"}}>{emp?.position} {emp?.department || " NO DEPARTMENT "}</p>
    </div>
    </div>

  )}
