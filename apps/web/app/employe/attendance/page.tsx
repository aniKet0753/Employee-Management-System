"use client";
import Sidebar from "../../component/sidebar";
import AttandasnceComponent from "../../component/Attendance";
import { useEffect, useState } from "react";

export default function Attandance() {
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
  <AttandasnceComponent  />
)}
    </div>
    
  );
}