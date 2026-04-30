import React from "react";
import { Navbar } from "@repo/ui/navbar";
import  MainContent  from "./pages/Landingpage"

export default function LandingPage() {


  return (
    //Navbar
    <div >
        <div style={{position:"sticky", top:"10px",zIndex: 999, background: "rgba(161, 161, 161, 0)", backdropFilter: "blur(1px)", borderBottom: "1px solid rgba(106, 106, 106, 0)"}}>
        <Navbar />
        </div>
      {/* Main content */}
      <div style={{minHeight:"1000vh", backgroundColor:"black"}}>
        <MainContent />
      </div>
    </div>
  );
}
