"use client";
import { useState } from "react";
import { dummyLeaveData, dummyEmployeeData } from "../assets/assets";

type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export default function AdminLeavePage() {
  const [leaveData, setLeaveData] = useState(dummyLeaveData);

  // Look up an employee's full name by id
  const getEmployeeName = (employeeId: string) => {
    const emp = dummyEmployeeData.find((e) => e.id === employeeId);
    console.log(emp)
    return emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";
  };

  const handleApprove = (id: string) => {
    setLeaveData((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "APPROVED" } : l))
    );
  };

  const handleReject = (id: string) => {
    setLeaveData((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "REJECTED" } : l))
    );
  };

  const statusStyles: Record<LeaveStatus, React.CSSProperties> = {
    APPROVED: { color: "#22c55e", background: "#16352455" },
    REJECTED: { color: "#ef4444", background: "#451a1a" },
    PENDING: { color: "#eab308", background: "#3a2e0a" },
  };

  const formatDate = (data: string) => {
    return new Date(data).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div style={{ padding: "24px", color: "white" , width:"100%"}}>
      <h1 style={{ fontSize: "24px", fontWeight: 600 }}>Leave Management</h1>
      <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
        Manage leave applications
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse",}}>
        <thead>
          <tr style={{ textAlign: "left", color: "#9ca3af", fontSize: "12px" }}>
            <th style={{ padding: "12px 8px" }}>EMPLOYEE</th>
            <th style={{ padding: "12px 8px" }}>TYPE</th>
            <th style={{ padding: "12px 8px" }}>DATES</th>
            <th style={{ padding: "12px 8px" }}>REASON</th>
            <th style={{ padding: "12px 8px" }}>STATUS</th>
            <th style={{ padding: "12px 8px" }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody style={{fontFamily:"sans-serif"}}>
          {leaveData.map((leave) => (
            <tr key={leave.id} style={{ borderTop: "1px solid #374151" }}>
              <td style={{ padding: "12px 8px" }}>
                {getEmployeeName(leave.employeeId)}
              </td>
              <td style={{ padding: "12px 8px" }}>{leave.type}</td>
              <td style={{ padding: "12px 8px" }}>
                {formatDate(leave.startDate)} To {formatDate(leave.endDate)}
              </td>
              <td style={{ padding: "12px 8px" }}>{leave.reason}</td>
              <td style={{ padding: "12px 8px" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    ...statusStyles[leave.status as LeaveStatus],
                  }}
                >
                  {leave.status}
                </span>
              </td>
              <td style={{ padding: "12px 8px" }}>
                {leave.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleApprove(leave.id)}
                      style={{ marginRight: "8px", cursor: "pointer" }}
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => handleReject(leave.id)}
                      style={{ cursor: "pointer", color: "#ef4444" }}
                    >
                      ❌
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}