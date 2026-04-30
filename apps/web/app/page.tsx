"use client";
import React from "react";
import { Navbar } from "@repo/ui/navbar";
import  MainContent  from "./pages/Landingpage";
import {useRouter} from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  function login() {
    router.push("/login");
  }
  function SignUP() {
    router.push("/signup");
  }
  function LogOut() {
    //remove token and render to lohgout state!
  }


  return (
    //Navbar
    <div >
        <div style={{position:"sticky", top:"10px",zIndex: 999, background: "rgba(161, 161, 161, 0)", backdropFilter: "blur(1px)", borderBottom: "1px solid rgba(106, 106, 106, 0)"}}>
        <Navbar onSigninClick={login} onSignupClick={SignUP} onLogoutClick={LogOut}/>
        </div>
      {/* Main content */}
      <div style={{minHeight:"1000vh", backgroundColor:"black"}}>
        <MainContent />
      </div>
    </div>
  );
}
