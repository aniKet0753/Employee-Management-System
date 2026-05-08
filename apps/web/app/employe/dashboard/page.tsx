"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import { dummyEmployeeDashboardData } from "../../assets/assets";


export default function EmployeeDashboard() {
  const [ data, setdata] = useState<any>(null);


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() =>{
    setdata(dummyEmployeeDashboardData)
    
  },[])





  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }} />
    </div>
  );
}