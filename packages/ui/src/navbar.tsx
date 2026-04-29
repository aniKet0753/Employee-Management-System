"use client";
import { useState } from "react";
import { Button } from "./button"; 
  
export function Navbar() {
  const [active, setActive] = useState("Dashboard");
  const navItems = ["Dashboard", "Employees", "Attendance", "Payroll", ];

  return (
    <div style={{ padding: "2px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "12px", background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.25)", boxShadow:"0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)", position: "sticky", top: "10px", paddingTop: "1px", zIndex: 100, }}>
      <img src="./logo.png" alt="logo" style={{width:"90px", height:"80px"}}/>
      <div style={{ display: "flex", gap: "20px" }}>
        {navItems.map((item) => (
          <span key={item}
            onClick={() => setActive(item)}
            style={{ fontFamily:"monospace", cursor: "pointer", fontSize: "19px", fontWeight: active === item ? "600" : "400", color: active === item ? "#f2ff00" : "#ffffff", transition: "0.2s" }}>
            {item}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{gap:"10px",position:"relative", display:"flex"}}>
        <Button label="SignUp" height="50px" width="90px"   loading={false}   />
        <Button label="SignIn" height="50px" width="90px" loading={false}/>
      </div>
      </div>
    </div>
  );
}