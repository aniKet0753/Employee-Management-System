"use client";
import { useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import { Calendar, AlertCircle, Clock } from "lucide-react";

type AttendanceRecord = {
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string | number;
  dayType: string;
  status: string;
};

type AttendanceProps = {
  data?: AttendanceRecord[];
};

export default function Attendance({ data }: AttendanceProps) {
  const records: AttendanceRecord[] = data ?? dummyAttendanceData;
  const [CheckedIn, checkedOut] = useState(false);

  const daysPresent = records.filter((r) => r.status === "PRESENT").length;
  const lateArrivals = records.filter((r) => r.dayType === "Late").length;
  const avgWorkHrs = "8.5 Hrs"; // placeholder until real calc is wired up

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function checkinFunction() {
    console.log("this is clicked");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .attendance-table th {
          text-align: left;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .attendance-table td {
          padding: 14px 16px;
          font-size: 0.85rem;
          color: #e8e8e8;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .attendance-table tr:last-child td {
          border-bottom: none;
        }
        .status-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-present {
          background: rgba(34,197,94,0.12);
          color: #4ade80;
        }
        .status-absent {
          background: rgba(239,68,68,0.12);
          color: #f87171;
        }
        .daytype-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
        }
      `}</style>

      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          background: "#0a0d14",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            overflowY: "auto",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* header */}
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#fff",
                margin: 0,
              }}
            >
              Attendance
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.4)",
                marginTop: 6,
              }}
            >
              Track your work hours and daily check-ins
            </p>
          </div>

          {/* summary cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px",
                background: "#151a24",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(56,189,248,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Calendar size={20} color="#38bdf8" />
              </div>
              <div>
                <div
                  style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}
                >
                  Days Present
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {daysPresent}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px",
                background: "#151a24",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(249,115,22,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={20} color="#F97316" />
              </div>
              <div>
                <div
                  style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}
                >
                  Late Arrivals
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {lateArrivals}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px",
                background: "#151a24",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(45,63,160,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={20} color="#4d6fe0" />
              </div>
              <div>
                <div
                  style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}
                >
                  Avg. Work Hrs
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {avgWorkHrs}
                </div>
              </div>
            </div>
          </div>

          {/* recent activity table */}
          <div
            style={{
              background: "#151a24",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Recent Activity
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                className="attendance-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                    <th>Day Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: "#fff" }}>
                        {formatDate(rec.date)}
                      </td>
                      <td>{formatTime(rec.checkIn)}</td>
                      <td>{formatTime(rec.checkOut)}</td>
                      <td>{rec.workingHours}</td>
                      <td>
                        <span className="daytype-pill">{rec.dayType}</span>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${
                            rec.status === "PRESENT"
                              ? "status-present"
                              : "status-absent"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button onClick={checkinFunction}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#008000 ",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "14px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
           marginRight:"25px",
           zIndex: 1000,
          }}
        >
          Check In
        </button>
      </div>
    </>
  );
}
