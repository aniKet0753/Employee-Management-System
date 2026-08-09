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

const logos = ["NORTHWIND", "VELOCIS", "ARBOR & CO", "HALCYON", "GRIDLINE", "MERIDIAN"];

const features = [
  {
    color: "#F97316", bg: "rgba(249,115,22,0.12)",
    title: "Attendance tracking",
    desc: "Clock-ins, shifts and overtime reconcile themselves — no spreadsheets, no chasing timesheets.",
    preview: "bars",
  },
  {
    color: "#4ade80", bg: "rgba(34,197,94,0.12)",
    title: "Payroll, automated",
    desc: "Runs on schedule, accounts for leave and overtime, and reconciles before it ever reaches a bank account.",
    preview: "ticker",
  },
  {
    color: "#60a5fa", bg: "rgba(59,130,246,0.12)",
    title: "Leave management",
    desc: "Requests route to the right approver automatically, with team coverage visible before you say yes.",
    preview: "calendar",
  },
  {
    color: "#fb7185", bg: "rgba(244,63,94,0.12)",
    title: "Onboarding checklists",
    desc: "Every new hire gets the same clean path — documents, access, equipment — nothing falls through.",
    preview: "checklist",
  },
];

const steps = [
  { n: "01", title: "Import your team", desc: "Bring employees in from a spreadsheet or connect your HRIS — takes about ten minutes." },
  { n: "02", title: "Set your policies", desc: "Leave types, approval chains, pay schedules. Configure once, applies to everyone automatically." },
  { n: "03", title: "Let it run", desc: "Attendance, payroll and requests flow through the system. You step in only on exceptions." },
];

const bigStats = [
  { value: "12,400+", label: "Teams running on Pagedone" },
  { value: "40%", label: "Less time spent on admin work" },
  { value: "99.9%", label: "Uptime over the last 12 months" },
];

const pricingPlans = [
  {
    name: "Starter", price: "$0", period: "/mo", highlight: false,
    desc: "For small teams getting off spreadsheets.",
    features: ["Up to 10 employees", "Attendance tracking", "Leave requests", "Email support"],
  },
  {
    name: "Team", price: "$49", period: "/mo", highlight: true,
    desc: "For growing teams that need payroll handled.",
    features: ["Up to 150 employees", "Automated payroll", "Approval workflows", "Priority support", "Custom reporting"],
  },
  {
    name: "Enterprise", price: "Custom", period: "", highlight: false,
    desc: "For organizations with complex structures.",
    features: ["Unlimited employees", "SSO & audit logs", "Dedicated account manager", "Custom integrations"],
  },
];

const footerCols = [
  { heading: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
  { heading: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { heading: "Resources", links: ["Docs", "Help center", "API reference", "Status"] },
];

function MiniPreview({ type, color }: { type: string; color: string }) {
  if (type === "bars") {
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40 }}>
        {[40, 65, 50, 90, 70, 100, 55].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: color, opacity: 0.85 }} />
        ))}
      </div>
    );
  }
  if (type === "ticker") {
    return (
      <div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>$48,230</div>
        <div style={{ fontSize: "0.65rem", color, marginTop: 4 }}>● Processed this cycle</div>
      </div>
    );
  }
  if (type === "calendar") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, width: 140 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: 3,
            background: [3, 4, 10].includes(i) ? color : "rgba(255,255,255,0.06)",
            opacity: [3, 4, 10].includes(i) ? 0.85 : 1,
          }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {["Offer signed", "ID verified", "Equipment shipped"].map((t, i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.68rem", color: i < 2 ? "#ccc" : "#666" }}>
          <span style={{
            width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
            background: i < 2 ? color : "transparent", border: i < 2 ? "none" : "1px solid #444",
            display: "grid", placeItems: "center", fontSize: 9, color: "#0a0a0a", fontWeight: 700,
          }}>{i < 2 ? "✓" : ""}</span>
          {t}
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0a", color: "#e8e8e8", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", textAlign: "center", padding: "72px 24px 0", overflow: "hidden" }}>

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }} />

        <div style={{
          position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 400, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.2) 0%, transparent 70%)"
        }} />

        <h1 style={{
          position: "relative", zIndex: 1,
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 5.2rem)", lineHeight: 1.05,
          letterSpacing: "-0.02em", color: "#fff", marginBottom: 20
        }}>
          Efficiency Management
        </h1>
        <p style={{
          position: "relative", zIndex: 1,
          maxWidth: 500, margin: "0 auto 36px", color: "#888",
          fontSize: "1rem", lineHeight: 1.75
        }}>
          Optimize Operations, Elevate Performance. Unlock Your Team's Full Potential with Seamless Workflow Solutions.
        </p>

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

        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            height: "450px",
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            boxShadow: "0 -8px 60px rgba(249,115,22,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>

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

            <div style={{ display: "flex" }}>

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

              <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>

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

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

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

      {/* ===== LOGO STRIP ===== */}
      <section style={{ padding: "56px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 28 }}>
          Trusted by operations teams at
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px 56px", maxWidth: 900, margin: "0 auto" }}>
          {logos.map((l) => (
            <span key={l} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.04em", color: "#555" }}>
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: "120px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#F97316", fontWeight: 600, marginBottom: 14 }}>
            Everything, connected
          </p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>
            Four systems. One source of truth.
          </h2>
          <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Attendance, payroll, leave and onboarding stop living in separate tabs — they read from the same team data, live.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#141414", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 20
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.65, margin: 0, maxWidth: 320 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
              <div style={{
                background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: 16, minHeight: 72, display: "flex", alignItems: "center"
              }}>
                <MiniPreview type={f.preview} color={f.color} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "100px 24px", background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#F97316", fontWeight: 600, marginBottom: 14 }}>
            Setup
          </p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#fff", textAlign: "center", marginBottom: 64, letterSpacing: "-0.01em" }}>
            Live in an afternoon, not a quarter
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 22, left: "16.6%", right: "16.6%", height: 1, background: "rgba(255,255,255,0.1)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ position: "relative", padding: "0 24px", textAlign: "center" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", background: "#141414",
                  border: "1px solid #F97316", display: "grid", placeItems: "center",
                  margin: "0 auto 24px", position: "relative", zIndex: 1,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#F97316"
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.65, maxWidth: 260, margin: "0 auto" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BIG STATS ===== */}
      <section style={{ padding: "90px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
          {bigStats.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3rem)", color: "#F97316", marginBottom: 10, letterSpacing: "-0.01em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#888" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section style={{ padding: "40px 24px 110px" }}>
        <div style={{
          maxWidth: 760, margin: "0 auto", background: "#141414",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20,
          padding: "56px 48px", textAlign: "center", position: "relative"
        }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "3rem", color: "#F97316", lineHeight: 1, marginBottom: 8 }}>“</div>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "1.35rem", color: "#fff", lineHeight: 1.5, marginBottom: 32, letterSpacing: "-0.01em" }}>
            We ran payroll for 90 people out of three spreadsheets for two years.
            Pagedone replaced all of it in a week, and nobody has asked me
            "did payroll go out" since.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "rgba(249,115,22,0.15)",
              color: "#F97316", display: "grid", placeItems: "center",
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem"
            }}>
              RM
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>Ronald Mensah</div>
              <div style={{ fontSize: "0.75rem", color: "#666" }}>Head of Ops, Halcyon</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section style={{ padding: "40px 24px 120px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#F97316", fontWeight: 600, marginBottom: 14 }}>
            Pricing
          </p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>
            Priced for the size of your team
          </h2>
          <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Start free. Upgrade when payroll gets real.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {pricingPlans.map((p) => (
            <div key={p.name} style={{
              background: p.highlight ? "#171310" : "#141414",
              border: p.highlight ? "1px solid #F97316" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "32px 28px",
              boxShadow: p.highlight ? "0 0 40px rgba(249,115,22,0.12)" : "none",
              position: "relative"
            }}>
              {p.highlight && (
                <span style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#F97316", color: "#fff", fontSize: "0.65rem", fontWeight: 700,
                  padding: "4px 14px", borderRadius: 20, letterSpacing: "0.04em"
                }}>
                  MOST POPULAR
                </span>
              )}
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 8 }}>
                {p.name}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: 20, lineHeight: 1.6, minHeight: 40 }}>
                {p.desc}
              </p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#fff" }}>{p.price}</span>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{p.period}</span>
              </div>
              <button style={{
                width: "100%", padding: "12px", borderRadius: 10, cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 600, marginBottom: 26,
                background: p.highlight ? "#F97316" : "rgba(255,255,255,0.06)",
                border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
                color: "#fff"
              }}>
                {p.name === "Enterprise" ? "Contact sales" : "Get started"}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.8rem", color: "#ccc" }}>
                    <span style={{ color: p.highlight ? "#F97316" : "#4ade80" }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ position: "relative", padding: "100px 24px", textAlign: "center", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 340, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)"
        }} />
        <h2 style={{
          position: "relative", zIndex: 1,
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "#fff",
          marginBottom: 18, letterSpacing: "-0.01em"
        }}>
          Stop running HR out of spreadsheets
        </h2>
        <p style={{ position: "relative", zIndex: 1, color: "#888", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Set up takes an afternoon. Most teams see their first payroll run go out clean within a week.
        </p>
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, justifyContent: "center" }}>
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
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "56px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, background: "#F97316", borderRadius: 5, display: "grid", placeItems: "center", fontSize: 11, color: "#fff" }}>↗</div>
                <span style={{ color: "#fff" }}>Pagedone</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.7, maxWidth: 260 }}>
                Attendance, payroll and leave, run from one place.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff", marginBottom: 16 }}>{col.heading}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((l) => (
                    <span key={l} style={{ fontSize: "0.82rem", color: "#777", cursor: "pointer" }}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: "0.75rem", color: "#555", flexWrap: "wrap", gap: 12
          }}>
            <span>© 2026 Pagedone. All rights reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>
              <span style={{ cursor: "pointer" }}>Privacy</span>
              <span style={{ cursor: "pointer" }}>Terms</span>
              <span style={{ cursor: "pointer" }}>Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}