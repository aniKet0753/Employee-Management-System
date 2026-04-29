import React from "react";

const stats = [
  { icon: "◎", color: "#F97316", bg: "rgba(249,115,22,0.15)", value: "1012", delta: "+16%", up: true, label: "New Employee" },
  { icon: "◉", color: "#60a5fa", bg: "rgba(59,130,246,0.15)",  value: "102",  delta: "-22%", up: false, label: "Resign Employee" },
  { icon: "□", color: "#4ade80", bg: "rgba(34,197,94,0.15)",   value: "23",   delta: "+19%", up: true, label: "Employee on Leave" },
  { icon: "◌", color: "#fb7185", bg: "rgba(244,63,94,0.15)",   value: "200",  delta: "-30%", up: false, label: "New Application" },
];

const menuItems = ["Dashboard","Employees","Attendances","Calendar","Leaves","Payroll","Documents"];

const bars = [55, 70, 90, 100, 75, 45, 60];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const scheduleItems = [
  { tag: "Critical", tagColor: "#F97316", border: "#F97316", name: "Team Briefing", desc: "Discuss priorities for the week", meta: "Ethan Miller · 09:00 AM – 09:30 AM" },
  { tag: "Urgent",   tagColor: "#facc15", border: "#facc15", name: "Compensation Review", desc: "Review and update salary structures", meta: "Emily Johnson · 10:30 AM – 12:00 PM" },
];

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0a", color: "#e8e8e8", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* ── NAV ── */}
     

      {/* ── HERO ── */}
      <section style={{ position: "relative", textAlign: "center", padding: "72px 24px 0", overflow: "hidden" }}>
        
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }} />
        
        {/* Orange glow */}
        <div style={{
          position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 400, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.2) 0%, transparent 70%)"
        }} />

        {/* Pill badge */}

        {/* Headline */}
        <h1 style={{
          position: "relative", zIndex: 1,
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 5.2rem)", lineHeight: 1.05,
          letterSpacing: "-0.02em", color: "#fff", marginBottom: 20
        }}>
          Efficiency Management
        </h1>

        {/* Subtitle */}
        <p style={{
          position: "relative", zIndex: 1,
          maxWidth: 500, margin: "0 auto 36px", color: "#888",
          fontSize: "1rem", lineHeight: 1.75
        }}>
          Optimize Operations, Elevate Performance. Unlock Your Team's Full Potential with Seamless Workflow Solutions.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", position: "relative", zIndex: 1, marginBottom: 56 }}>
          <button style={{
            padding: "14px 32px", background: "#F97316", border: "none", borderRadius: 50,
            color: "#fff", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer",
            boxShadow: "0 0 32px rgba(249,115,22,0.45)"
          }}>
            Try Free Version
          </button>
          <button style={{
            padding: "14px 32px", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50,
            color: "#fff", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer"
          }}>
            Book Your Demo
          </button>
        </div>

        {/* ── DASHBOARD MOCKUP ── */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px 16px 0 0",
            overflow: "hidden",
            boxShadow: "0 -8px 60px rgba(249,115,22,0.12), inset 0 1px 0 rgba(255,255,255,0.07)"
          }}>

            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "#111"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>
                <div style={{ width: 22, height: 22, background: "#F97316", borderRadius: 5, display: "grid", placeItems: "center", fontSize: 11 }}>↗</div>
                Pagedone
              </div>
              <span style={{ fontSize: "0.85rem", color: "#888" }}>
                Welcome back, <span style={{ color: "#F97316", fontWeight: 600 }}>Ronald!</span>
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                {["← Attendance", "+ Add Employee"].map((label, i) => (
                  <button key={label} style={{
                    padding: "6px 14px", fontSize: "0.72rem", borderRadius: 8, cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    background: i === 1 ? "#F97316" : "transparent",
                    border: i === 1 ? "1px solid #F97316" : "1px solid rgba(255,255,255,0.15)",
                    color: i === 1 ? "#fff" : "#ccc",
                    fontWeight: i === 1 ? 600 : 400
                  }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ display: "flex" }}>

              {/* Sidebar */}
              <div style={{ width: 160, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.07)", padding: "16px 0" }}>
                <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", padding: "0 14px 10px" }}>Menu</div>
                {menuItems.map((item) => (
                  <div key={item} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "9px 14px", fontSize: "0.72rem", cursor: "pointer",
                    color: item === "Dashboard" ? "#fff" : "#777",
                    background: item === "Dashboard" ? "rgba(249,115,22,0.1)" : "transparent",
                    borderLeft: item === "Dashboard" ? "2px solid #F97316" : "2px solid transparent"
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {stats.map((s) => (
                    <div key={s.label} style={{
                      background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10, padding: 12
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 6, marginBottom: 8,
                        background: s.bg, color: s.color,
                        display: "grid", placeItems: "center", fontSize: 12
                      }}>{s.icon}</div>
                      <div>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</span>
                        <span style={{ fontSize: "0.6rem", fontWeight: 600, marginLeft: 6, color: s.up ? "#22c55e" : "#ef4444" }}>{s.delta}</span>
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "#666", marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart + Schedule */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

                  {/* Bar chart */}
                  <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#ddd" }}>Employee Tracker</span>
                      <span style={{ fontSize: "0.65rem", color: "#666" }}>This week ▾</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70 }}>
                      {bars.map((h, i) => (
                        <div key={i} style={{
                          flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0",
                          background: "#F97316", opacity: 0.85
                        }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      {days.map((d) => (
                        <span key={d} style={{ flex: 1, textAlign: "center", fontSize: "0.55rem", color: "#666" }}>{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#ddd" }}>Upcoming Schedule</span>
                      <span style={{ fontSize: "0.65rem", color: "#666" }}>Today ▪</span>
                    </div>
                    {scheduleItems.map((s) => (
                      <div key={s.name} style={{
                        padding: 8, borderRadius: 7, background: "#222",
                        marginBottom: 7, borderLeft: `2px solid ${s.border}`
                      }}>
                        <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.08em", color: s.tagColor, fontWeight: 600, marginBottom: 3 }}>● {s.tag}</div>
                        <div style={{ fontSize: "0.7rem", color: "#ddd", fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: "0.6rem", color: "#666", marginTop: 1 }}>{s.desc}</div>
                        <div style={{ fontSize: "0.58rem", color: "#555", marginTop: 4 }}>👤 {s.meta}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}