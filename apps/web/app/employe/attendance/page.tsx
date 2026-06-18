"use client";
import Sidebar from "../../component/sidebar";
import AttandasnceComponent from "../../component/Attendance";
import { useEffect, useState } from "react";
import {dummyAttendanceData} from "../../assets/assets"

export default function Attandance() {
  const [loading , setloading] = useState(true);
  const [isDeleted, setDelete] = useState(false);
  const [data, setdata]= useState<any>(null);
   

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);  

  useEffect(() =>{
    setdata(dummyAttendanceData)
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
  <AttandasnceComponent  data={data}/>
)}
    </div>
    
  );
}