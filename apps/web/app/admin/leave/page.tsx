"use client";
import AdminSidebar from "../../component/AdminSidebar";
import Sidebar from "../../component/sidebar";
import AdminLeavePage from "../../pages/AdminLeave";
import { useEffect, useState } from "react";

export default function AdminEmployeePage() {
  const [loading , setloading] = useState(true);


  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  useEffect(() =>{
    setloading(false);
  },[])

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <AdminSidebar />
      {loading ? (
  <p style={{fontSize:"50px", fontFamily:"Roboto", color:"white"}}>
    Loading.... 
  </p>
) : (
  <AdminLeavePage />
)}
    </div>
    
  );
}