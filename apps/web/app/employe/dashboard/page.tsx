"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import { dummyEmployeeDashboardData } from "../../assets/assets";
import EmployeeDashboardComponent from "../../component/Employdashboard";

export default function EmployeeDashboard() {
  const [ data, setdata] = useState<any>(null);//added no type for now, can be changed later when we have the actual data structure
  const [loading , setloading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() =>{
    setdata(dummyEmployeeDashboardData)
    setloading(false);
  },[])

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />
      {loading ? (
  <p style={{fontSize:"50px", fontFamily:"Roboto", color:"white"}}>
    Loading....
  </p>
) : (
  <EmployeeDashboardComponent data={data} />
)}
    </div>
    
  );
}