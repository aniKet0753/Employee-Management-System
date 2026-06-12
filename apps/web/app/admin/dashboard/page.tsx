"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../../component/AdminSidebar";
import { dummyEmployeeDashboardData } from "../../assets/assets";


export default function AdminDashboard() {
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
      <AdminSidebar />
      <div />
      <div style={{color:"white" , marginLeft:"20px" , marginTop:"20px", fontFamily:"Roboto"}}>Admin Dashboard</div>
      {loading && <p  style={{fontSize:"50px" , fontFamily:"Roboto",color:"white"}}>Loading....</p>}
    </div>
    
  );
}