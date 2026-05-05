"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";


export default function EmployeeDashboard() {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  if(loading) {
    return(
      <p>Loading..</p>
    )
  }

  if(!data){
    return (<p>Data not found </p>)
  }

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }} />
    </div>
  );
}