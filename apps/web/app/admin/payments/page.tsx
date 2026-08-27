"use client"
import  AdminSidebar from "../../component/AdminSidebar"
import { useEffect, useState } from "react";
import AdminPayment from "../../pages/AdminPayments"


export default function payments(){
    const [loading , setloading] = useState(true);
      useEffect(() =>{
    setloading(false);
  },[])
  
  return (
      <div style={{ height: "100vh", display: "flex" }}>
        <AdminSidebar />
        {loading ? (
    <p style={{fontSize:"50px", fontFamily:"Roboto"}}>
      Loading.... 
    </p>
  ) : (
    < AdminPayment/>
  )}
      </div>
  )   
}