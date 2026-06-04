"use client";
import React from "react";
import { Calendar1Icon, DollarSignIcon, FileTextIcon} from 'lucide-react';
import { dummyEmployeeDashboardData } from "../assets/assets";
import {useRouter} from "next/navigation";

type dummyEmployeeDashboardData = {
  data: any;
};



export default function EmployeeDashboard ({data}: dummyEmployeeDashboardData) {
  const router = useRouter();

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
      <div style={{display:"flex", gap:"40px"}}> 
        {card.map((item) => (
          <div key={item.title} onClick={() =>router.push(item.path)} style={{cursor: "pointer", background: "linear-gradient(145deg, rgb(38,38,38), rgb(28,28,28))", border: "1px solid rgba(255,255,255,0.08)",borderRadius: "18px", padding: "22px", width: "260px", transition: "0.3s ease", boxShadow: "0 8px 20px rgba(0,0,0,0.25)", }}  >
            <div style={{display: "flex", alignItems: "center", marginBottom: "7px" }}>{item.icon}
            <h3 style={{ color: "white", fontSize: "24px", margin: "0", marginLeft: "5px" }}>{item.value}</h3></div>
            <p style={{ color: "gray", fontSize: "14px", margin: "0", fontFamily:"sans-serif" }}>{item.title}</p>
            <p style={{ color: "lightgray", fontSize: "12px", margin: "0", fontFamily:"sans-serif" , fontWeight:"bold" }}>{item.subtitle}</p>
          </div>
        ))}
      </div>
    <div style={{marginLeft: "20px", display: "flex",gap: "20px", marginTop: "28px", }}>
  <button onClick={() => router.push("/employe/attendance")} style={{ background: "linear-gradient(90deg, #5b4bff, #6f63ff)", color: "white", border: "none", padding: "14px 28px", borderRadius: "12px", fontSize: "16px",fontWeight: "600", cursor: "pointer", boxShadow: "0 6px 16px rgba(91,75,255,0.35)",transition: "0.3s ease", }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow =
        "0 10px 22px rgba(91,75,255,0.45)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0px)";
      e.currentTarget.style.boxShadow =
        "0 6px 16px rgba(91,75,255,0.35)";
    }} >
    Mark Attendance →
  </button>

  <button onClick={() => router.push("/employe/leaves")}
    style={{background: "transparent",color: "#d1d5db",border: "1px solid rgba(255,255,255,0.15)",padding: "14px 28px", borderRadius: "12px", fontSize: "16px",fontWeight: "500", cursor: "pointer",transition: "0.3s ease"}}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "rgba(255,255,255,0.05)";
      e.currentTarget.style.border =
        "1px solid rgba(255,255,255,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.border =
        "1px solid rgba(255,255,255,0.15)";
    }}> Apply for Leave
  </button>
   </div>
    </div>
    </div>
  )}
