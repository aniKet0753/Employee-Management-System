"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type LeaveData = {
  _id: string;
  employeeId: string;
  type: "SICK" | "CASUAL" | "EARNED" | "ANNUAL";
  startDate: string;
  endDate: string;
  reason: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
};

type LeaveResponse = {
  sickLeave: number;
  casualLeave: number;
  AnuallLaeve: number;
  leavedata: LeaveData;
};

export default function EmployeeLeaving() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data,setData]= useState<LeaveResponse | null>(null)

useEffect(()=>{
  const getleave  = async () =>{
    try{
  const token = localStorage.getItem("token");
  if(!token){
   setError("You are not logged in");
          setLoading(false);
          return;
  }
    const responce = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/leaveapplication`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    console.log("leave application data", responce.data)
    setData(responce.data)
  }catch(error){
    console.error("Dashboard error:", error);
  }finally{
   setLoading(false)
  }
  }
  getleave();
  },[])

  const formatDate = (data: string) => {
    return new Date(data).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const typeBadgeStyle: Record<string, React.CSSProperties> = {
    ANNUAL: { background: "rgba(59,76,202,0.2)", color: "#7b8ff5" },
    CASUAL: { background: "rgba(16,185,129,0.15)", color: "#34d399" },
    SICK:   { background: "rgba(251,146,60,0.15)", color: "#fb923c" },
  };

  const statusBadgeStyle: Record<string, React.CSSProperties> = {
    APPROVED: { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" },
    REJECTED: { background: "rgba(239,68,68,0.15)",  color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" },
    PENDING:  { background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" },
  };

  const stats = [
    {
      label: "Sick Leave",
      count: data?.sickLeave,
      icon: "🌡️",
      iconBg: "rgba(251,146,60,0.15)",
    },
    {
      label: "Casual Leave",
      count: data?.casualLeave,
      icon: "☂️",
      iconBg: "rgba(59,76,202,0.2)",
    },
    {
      label: "Annual Leave",
      count: data?.AnuallLaeve,
      icon: "✈️",
      iconBg: "rgba(59,76,202,0.2)",
    },
  ];

  return (
    <div style={{ padding: "36px 40px", background: "#0d1117", height:"90%", width:"100%", }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px",fontFamily:"sans-serif" }}>
        <div>
          <h1 style={{
            fontSize: "32px", fontWeight: 800, color: "#ffffff",
            margin: 0, marginBottom: "6px", letterSpacing: "-0.5px",
          }}>
            Leave Management
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Your leave history and requests
          </p>
        </div>
        <button style={{
          background: "#3b4cca", color: "white", border: "none",
          borderRadius: "10px", padding: "10px 20px", fontSize: "13px",
          fontWeight: 600, cursor: "pointer",
        }}>
          + Apply for Leave
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px",fontFamily:"sans-serif" }}>
        {stats.map(({ label, count, icon, iconBg }) => (
          <div key={label} style={{
            background: "#161b27", borderRadius: "16px",
            border: "1px solid #1f2937",
            padding: "24px", display: "flex", alignItems: "center", gap: "16px",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: iconBg, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "22px", flexShrink: 0,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "6px" }}>{label}</div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>taken</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div style={{
        background: "#161b27", borderRadius: "16px",
        border: "1px solid #1f2937", overflow: "hidden", fontFamily:"sans-serif"
      }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid #1f2937" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
            Leave History
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1f2937" }}>
              {["Type", "Dates", "Reason", "Status"].map((h) => (
                <th key={h} style={{
                  padding: "12px 28px", textAlign: "left",
                  fontSize: "11px", fontWeight: 600, color: "#6b7280",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.leavedata ? (
              <tr
    key={data.leavedata._id}
    style={{
      borderBottom: "1px solid #1a2030",
      transition: "background 0.15s",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "#1a2030")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "transparent")
    }
  >
    <td style={{ padding: "18px 28px" }}>
      <span
        style={{
          display: "inline-flex",
          padding: "4px 12px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          ...typeBadgeStyle[data.leavedata.type],
        }}
      >
        {data.leavedata.type}
      </span>
    </td>

    <td
      style={{
        padding: "18px 28px",
        fontSize: "14px",
        color: "#e5e7eb",
        fontWeight: 500,
      }}
    >
      {formatDate(data.leavedata.startDate)}
      {" - "}
      {formatDate(data.leavedata.endDate)}
    </td>

    <td
      style={{
        padding: "18px 28px",
        fontSize: "14px",
        color: "#9ca3af",
      }}
    >
      {data.leavedata.reason}
    </td>

    <td style={{ padding: "18px 28px" }}>
      <span
        style={{
          display: "inline-flex",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          ...statusBadgeStyle[data.leavedata.status],
        }}
      >
        {data.leavedata.status}
      </span>
    </td>
  </tr>
) : (
  <tr>
    <td
      colSpan={4}
      style={{
        padding: "30px",
        textAlign: "center",
        color: "#6b7280",
      }}
    >
      No leave applications found.
    </td>
  </tr>)}
       </tbody>
        </table>
      </div>

    </div>
  );
}