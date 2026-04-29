import React from "react";
import { Navbar } from "@repo/ui/navbar";
import  MainContent  from "./pages/Landingpage"

export default function LandingPage() {


  return (
    //Navbar
    <div style={{position:"sticky", top:"10px"}}>
        <div>
        <Navbar />
        </div>
      {/* Main content */}
      <div style={{minHeight:"100vh", minWidth:"100vw",backgroundColor:"black"}}>
        <MainContent />
      </div>
    </div>
  );
}
