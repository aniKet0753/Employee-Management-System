"use client";
import { useState } from "react";
import { Button } from "./button";

interface Navbarprops {
  onSignupClick: () => void;
  onSigninClick: () => void;
  onLogoutClick?: () => void;
}
  
export function Navbar({onSignupClick, onSigninClick, onLogoutClick }:Navbarprops) {
  const [active, setActive] = useState("Dashboard");
  const navItems = ["Dashboard", "Employees", "Attendance", "Payroll", ];
   
  return (
    <div style={{ padding: "2px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "12px", background: "rgba(20, 20, 20, 0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.25)", boxShadow:"0 8px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.4)", position: "sticky", top: "10px", paddingTop: "1px", zIndex: 100, }}>
      <img src="./logo.png" alt="logo" style={{width:"90px", height:"80px"}}/>
      <div style={{ display: "flex", gap: "20px" }}>
        {navItems.map((item) => (
          <span key={item}
            onClick={() => setActive(item)}
            style={{ fontFamily:"monospace", cursor: "pointer", fontSize: "19px", fontWeight: active === item ? "600" : "400", color: active === item ? "#ffbf00" : "#ffffff", transition: "0.2s" }}>
            {item}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{gap:"10px",position:"relative", display:"flex"}}>
        <Button label="SignUp" height="50px" width="90px"   loading={false} backgroundColor="#F97316" onClick={onSignupClick} />
        <Button label="SignIn" height="50px" width="90px" loading={false} backgroundColor="rgba(255,255,255,0.06)" onClick={onSigninClick} />
      </div>
      </div>
    </div>
  );
}