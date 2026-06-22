"use client"
import { Lock } from "lucide-react"
export default function AdminSettingPage(){

  return <div style={{width:'100%', backgroundColor:"white"}}>
    <h1>Setting</h1>
 
    <div style={{padding:"20px", backgroundColor:"yellow", height:'49px', width:'300px', borderRadius:"20px", marginLeft:'20px'}}>
      <div style={{display:"flex"}}>
       <Lock/><h2 style={{textAlign:"center"}}>Password</h2>
      </div>
    </div>
  </div>
}