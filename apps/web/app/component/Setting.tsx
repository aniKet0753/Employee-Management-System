"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type Profile = {
  _id: string;
  firstName: string;
  lastName: string;
  department:string,
  bio:string,
  position:string,
  image: string | null;
};

export default function EmployeeSettings() {
  const [data, setdata] = useState<Profile | null>(null);
  const [passwordModal, setPasswordModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave(){
    return console.log("save butoon clicked");
  }

useEffect(()=>{
  const settings = async ()=>{
    try{ 
      const token = localStorage.getItem("token");
     if(!token){
      return console.log("token is not gicen")
    }
    const responce = await axios.get("http://localhost:3001/api/users",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const profile = responce.data.data;
    setdata(profile)
    setFirstName(profile.firstName || "")
    setLastName(profile.lastName || "")
    setDepartment(profile.department || "")
    setPosition(profile.position || "")
    setBio(profile.bio || "")


  }catch(error){
    console.log("catch error",error)
  }
 }
  settings()
},[])

  const inputStyle = {
    border: "1px solid #2a2d3a",
    borderRadius: 8,
    padding: "7px 12px",
    fontSize: 13,
    color: "#ffffff",
    backgroundColor: "#22253a",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: "#8b92a5",
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      overflow: "hidden",
      padding: "24px 32px",
      backgroundColor: "#0d0f14",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      boxSizing: "border-box" as const,
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>

      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.3px" }}>Settings</h1>
        <p style={{ fontSize: 13, color: "#8b92a5", margin: "3px 0 0" }}>Manage your account and preferences</p>
      </div>

      {/* Public Profile Card */}
      <div style={{ backgroundColor: "#1a1d27", borderRadius: 12, padding: "18px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)", flex: "0 0 auto" }}>

        {/* Card Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #2a2d3a" }}>
          <span style={{ color: "#6c63ff", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", margin: 0 }}>Public Profile</h2>
        </div>

        {/* Full Name + Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Ankit kumar"
              value={`${firstName} ${lastName}`.trim()}
              onChange={(e) => {
                const parts = e.target.value.split(" ");
                setFirstName(parts[0] || "");
                setLastName(parts.slice(1).join(" "));
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={labelStyle}>Department</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        </div>

        {/* Position */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
          <label style={labelStyle}>Position</label>
          <input
            style={inputStyle}
            type="text"
            placeholder=""
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
          <label style={labelStyle}>Bio</label>
          <textarea
            style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
            placeholder="Write a brief bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
          <p style={{ fontSize: 11, color: "#5a6070", margin: "2px 0 0" }}>This are your basic informations.</p>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{ backgroundColor: saved ? "#22c55e" : "#6c63ff", color: "#ffffff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            onClick={handleSave}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Password Card */}
      <div style={{ backgroundColor: "#1a1d27", borderRadius: 12, padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "#22253a", display: "flex", alignItems: "center", justifyContent: "center", color: "#6c63ff", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", margin: 0 }}>Password</p>
            <p style={{ fontSize: 12, color: "#8b92a5", margin: "2px 0 0" }}>Update your account password</p>
          </div>
        </div>
        <button
          style={{ backgroundColor: "#22253a", color: "#c0c5d4", border: "1px solid #2a2d3a", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}
          onClick={() => setPasswordModal(true)}
        >
          Change
        </button>
      </div>

      {/* Password Modal */}
      {passwordModal && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          onClick={() => setPasswordModal(false)}
        >
          <div
            style={{ backgroundColor: "#1a1d27", borderRadius: 14, padding: "28px", width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", margin: "0 0 20px" }}>Change Password</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              <label style={labelStyle}>Current Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              <label style={labelStyle}>New Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
              <button
                style={{ backgroundColor: "#22253a", color: "#c0c5d4", border: "1px solid #2a2d3a", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
                onClick={() => setPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "#6c63ff", color: "#ffffff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onClick={() => setPasswordModal(false)}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}