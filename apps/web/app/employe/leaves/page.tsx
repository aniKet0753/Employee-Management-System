"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import EmployeeLeavingComponent  from "../../component/EmployeeLeaving";

export default function EmployeeLeaving() {
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
      <Sidebar />
      {loading ? (
  <p style={{fontSize:"50px", fontFamily:"Roboto", color:"white"}}>
    Loading.... 
  </p>
) : (
  <EmployeeLeavingComponent  />
)}
    </div>
    
  );
}