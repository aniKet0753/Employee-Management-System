"use client";
import Sidebar from "../../component/sidebar";
import AttandasnceComponent from "../../component/Attendance";
import { useEffect, useState } from "react";
import {dummyAttendanceData} from "../../assets/assets"
import axios from "axios";

type AttendanceRecord = {
   _id: string;
  employeeId: string;
  data: string;
  checkIn: string;
  checkOut?: string;
  workingHours: number;
  type: string;
  status: string;
  dayType:string
};

type AttendanceProps = {
  history: AttendanceRecord[];
};

export default function Attandance() {
  const [loading , setloading] = useState(true);
  const [isDeleted, setDelete] = useState(false);
  const [data, setdata]= useState<any>(null);
  const [error,setError]= useState("")
   

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);  

  useEffect(() => {
    const fetchAttandance = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in");
          setloading(false);
          return;
        }

        const response = await axios.get<AttendanceProps>(
         `${process.env.NEXT_PUBLIC_API_URL}/api/attendance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Dashboard data:", response.data);

        setdata(response.data.history);

      } catch (error: any) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
          "Failed to load dashboard"
        );

      } finally {
        setloading(false);
      }
    };

    fetchAttandance();
  }, []);

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