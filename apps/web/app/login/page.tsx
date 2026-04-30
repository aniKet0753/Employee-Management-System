"use client";
import React, { useState } from "react";

export default function Login() {
  const [hovered, setHovered] = useState<string | null>(null);

  const portals = [
    {
      key: "admin",
      label: "Admin Portal",
      desc: "Full system access & management",
      href: "/admin/login",
      icon: "⚙",
    },
    {
      key: "employee",
      label: "Employee Portal",
      desc: "View shifts, payroll & requests",
      href: "/employe/login",
      icon: "👤",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-28px) scale(1.05); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        .portal-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          text-decoration: none;
          color: #e8e8e8;
          position: relative;
          overflow: hidden;
        }
        .portal-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .portal-card:hover {
          border-color: rgba(249,115,22,0.55);
          background: rgba(249,115,22,0.05);
          box-shadow: 0 0 0 1px rgba(249,115,22,0.2), 0 8px 32px rgba(249,115,22,0.12);
          transform: translateY(-2px);
        }
        .portal-card:hover::before { opacity: 1; }

        .portal-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          transition: background 0.25s, border-color 0.25s;
        }
        .portal-card:hover .portal-icon {
          background: rgba(249,115,22,0.22);
          border-color: rgba(249,115,22,0.4);
        }

        .portal-arrow {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          margin-left: auto;
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .portal-card:hover .portal-arrow {
          background: #F97316;
          border-color: #F97316;
          color: #fff;
          transform: translateX(3px);
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div style={{
        width: "48%",
        position: "relative",
        background: "linear-gradient(155deg, #0f0f0f 0%, #111111 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
        overflow: "hidden",
        animation: "fadeLeft 0.75s ease both",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />

        {/* Orange radial glow */}
        <div style={{
          position: "absolute", top: "20%", left: "30%",
          width: 380, height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 68%)",
          animation: "floatOrb 8s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-60px",
          width: 240, height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
          animation: "floatOrb 11s 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />


        {/* Center text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
              animation: "pulseDot 2s ease-in-out infinite",
            }} />
          </div>

          <h1 style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(5rem, 3.2vw, 2.8rem)",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 18,
            letterSpacing: "-0.02em",
          }}>
            Employee<br />
            <span style={{ color: "#F97316"}}>Management</span><br />
            System
          </h1>

          <p style={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            maxWidth: 340,
            fontWeight: 300,
          }}>
            Streamline your workforce operations, track attendance, manage payroll, and empower your team securely.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: 1,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "64px 48px",
        position: "relative",
        animation: "fadeRight 0.75s 0.12s ease both",
      }}>
        {/* Subtle top-right decoration */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 200, height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Header */}
          <h2 style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#fff",
            marginBottom: 8,
            letterSpacing: "-0.01em",
            fontFamily:"monospace"
          }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#555", fontWeight: 400, marginBottom: 36 }}>
            Select your portal to securely access the system.
          </p>

          {/* Divider with label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div className="divider-line" />
            <span style={{ fontSize: "0.7rem", color: "#444", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.1em" }}>Choose Portal</span>
            <div className="divider-line" />
          </div>

          {/* Portal cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {portals.map((portal) => (
              <a key={portal.key} href={portal.href} className="portal-card">
                <div className="portal-icon">{portal.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#e8e8e8", marginBottom: 2 }}>
                    {portal.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#555" }}>
                    {portal.desc}
                  </div>
                </div>
                <span className="portal-arrow">→</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <p style={{ marginTop: 48, fontSize: "0.72rem", color: "#ffffff", textAlign: "center" }}>
            © 2026 GreatStack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}