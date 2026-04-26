"use client";
import { useState } from "react";

export function Navbar() {
  const [active, setActive] = useState("Dashboard");

  const navItems = ["Dashboard", "Employees", "Attendance", "Payroll", "Reports"];

  return (
    <div
      style={{
        padding: "25px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: "10px",
        margin: "10px",
        zIndex: 100,
      }}
    >
      {/* Logo / Brand */}
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        EMS<span style={{ color: "#4f46e5" }}>Pro</span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        {navItems.map((item) => (
          <span
            key={item}
            onClick={() => setActive(item)}
            style={{
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: active === item ? "600" : "400",
              color: active === item ? "#4f46e5" : "#333",
              transition: "0.2s",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Search */}
        <input
          placeholder="Search employee..."
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "13px",
          }}
        />

        {/* Profile */}
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#4f46e5",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          AK
        </div>
      </div>
    </div>
  );
}