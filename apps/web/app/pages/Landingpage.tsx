import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Design tokens
 * ink        #0B0D10  — near-black base
 * panel      #14171C  — card surface on dark
 * cream      #F2ECDC  — light base
 * teal       #1F8A70  — primary accent ("badge issued")
 * tealBright #2FCDA5  — glow / highlight
 * text on dark: #E7E5DE   muted on dark: #9A9A93   ink on cream: #1C1B17   muted on cream: #6B6355
 * Display: 'Space Grotesk'  Body: 'Inter'  Mono (IDs/codes): 'IBM Plex Mono'
 */

const stats = [
  { icon: "◎", color: "#2FCDA5", bg: "rgba(47,205,165,0.14)", value: "1012", delta: "+16%", up: true, label: "Badges issued" },
  { icon: "◉", color: "#f59e0b", bg: "rgba(245,158,11,0.14)", value: "102", delta: "-22%", up: false, label: "Badges revoked" },
  { icon: "□", color: "#60a5fa", bg: "rgba(96,165,250,0.14)", value: "23", delta: "+19%", up: true, label: "On leave" },
  { icon: "◌", color: "#f472b6", bg: "rgba(244,114,182,0.14)", value: "200", delta: "-30%", up: false, label: "Applications" },
];

const menuItems = ["Dashboard", "Employees", "Access Log", "Calendar", "Leaves", "Payroll", "Documents"];
const bars = [55, 70, 90, 100, 75, 45, 60];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const scheduleItems = [
  { tag: "Critical", tagColor: "#f59e0b", border: "#f59e0b", name: "Team Briefing", desc: "Discuss priorities for the week", meta: "Ethan Miller · 09:00 – 09:30" },
  { tag: "Urgent", tagColor: "#2FCDA5", border: "#2FCDA5", name: "Compensation Review", desc: "Review and update salary structures", meta: "Emily Johnson · 10:30 – 12:00" },
];

const features = [
  { color: "#2FCDA5", bg: "rgba(47,205,165,0.12)", title: "Check-in, check-out", desc: "Employees clock in and out from their badge. Hours, breaks and overtime are logged automatically — no paper sheets, no manual entry.", preview: "bars" },
  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", title: "Payroll, automated", desc: "Pay runs on schedule, factoring in logged hours, leave and overtime, and reconciles before it reaches a bank account.", preview: "ticker" },
  { color: "#60a5fa", bg: "rgba(96,165,250,0.12)", title: "Leave management", desc: "Requests route to the right approver automatically, with team coverage visible before anyone says yes.", preview: "calendar" },
  { color: "#f472b6", bg: "rgba(244,114,182,0.12)", title: "Onboarding, badged", desc: "Every new hire gets the same clean path — documents, access and equipment set up before their first check-in.", preview: "checklist" },
];

const stages = [
  { tag: "Import", title: "Bring your team in", desc: "From a spreadsheet or your HRIS — every employee gets a record in about ten minutes." },
  { tag: "Scope", title: "Set clearance & policy", desc: "Leave types, approval chains, pay schedules and access tiers — configured once, applied to everyone." },
  { tag: "Issue", title: "Badges go live", desc: "Check-in, check-out, payroll and requests flow automatically. You step in only on exceptions." },
];

const roleAccess = [
  { role: "Employee", clearance: "L1", desc: "Can check in and out, view their own shifts and payslips, and submit leave requests. Nothing beyond their own record." },
  { role: "Manager", clearance: "L2", desc: "Everything an employee can do, plus visibility into their team's attendance and the ability to approve requests." },
  { role: "Admin", clearance: "L3", desc: "Full organization access — headcount, payroll runs, access control, and audit history for every badge issued." },
];

const securityPoints = [
  { title: "Role-based access", desc: "Every account is scoped to a role at creation. People only ever see and do what their clearance allows." },
  { title: "Verified check-in", desc: "Attendance is tied to the employee's own badge, so records reflect who was actually clocked in, and when." },
  { title: "Audit trail", desc: "Every check-in, approval and payroll run is logged, so admins can trace exactly what happened and who did it." },
];

const footerCols = [
  { heading: "Product", links: ["Features", "Security"] },
  { heading: "Company", links: ["About", "Contact"] },
  { heading: "Resources", links: ["Docs", "Help center", "Status"] },
];

const FONTS = "'Space Grotesk', sans-serif";
const BODY = "'Inter', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

/* ---------- Scroll reveal wrapper ---------- */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}
function Reveal({ children, delay = 0, style = {} }: RevealProps) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface MiniPreviewProps {
  type: string;
  color: string;
}
function MiniPreview({ type, color }: MiniPreviewProps) {
  if (type === "bars") {
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40, width: "100%" }}>
        {[40, 65, 50, 90, 70, 100, 55].map((h, i) => (
          <div key={i} className="rl-bar" style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: color, opacity: 0.85 } as React.CSSProperties} />
        ))}
      </div>
    );
  }
  if (type === "ticker") {
    return (
      <div>
        <div style={{ fontFamily: FONTS, fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>$48,230</div>
        <div style={{ fontFamily: MONO, fontSize: "0.65rem", color, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <span className="rl-glow-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
          PROCESSED THIS CYCLE
        </div>
      </div>
    );
  }
  if (type === "calendar") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, width: 140 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: [3, 4, 10].includes(i) ? color : "rgba(255,255,255,0.06)", opacity: [3, 4, 10].includes(i) ? 0.85 : 1 }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {["Offer signed", "ID verified", "Badge issued"].map((t, i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.68rem", color: i < 2 ? "#ccc" : "#666" }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: i < 2 ? color : "transparent", border: i < 2 ? "none" : "1px solid #444", display: "grid", placeItems: "center", fontSize: 9, color: "#0a0a0a", fontWeight: 700 }}>
            {i < 2 ? "✓" : ""}
          </span>
          {t}
        </div>
      ))}
    </div>
  );
}

/** Signature element: the ID badge card, reused (at different scales) across the page */
interface BadgeCardProps {
  compact?: boolean;
  floaty?: boolean;
}
function BadgeCard({ compact = false, floaty = false }: BadgeCardProps) {
  return (
    <div
      className={floaty ? "rl-badge-float" : undefined}
      style={{
        background: "#14171C",
        border: "1px solid #2FCDA544",
        borderRadius: 18,
        padding: compact ? 18 : 26,
        width: compact ? 220 : "100%",
        maxWidth: compact ? 220 : 360,
        boxShadow: "0 0 0 1px rgba(47,205,165,0.06), 0 20px 60px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2FCDA5, transparent)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: compact ? 14 : 20 }}>
        <span style={{ fontFamily: MONO, fontSize: compact ? "0.55rem" : "0.62rem", color: "#6b7280", letterSpacing: "0.08em" }}>ROSTERLY ACCESS</span>
        <span style={{ fontFamily: MONO, fontSize: compact ? "0.55rem" : "0.62rem", color: "#2FCDA5", letterSpacing: "0.04em" }}>EMP-7042</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: compact ? 14 : 18 }}>
        <div style={{ width: compact ? 38 : 48, height: compact ? 38 : 48, borderRadius: "50%", border: "1px solid #2FCDA566", display: "grid", placeItems: "center", fontSize: compact ? 16 : 20, color: "#2FCDA5", flexShrink: 0 }}>
          ◈
        </div>
        <div>
          <div style={{ fontFamily: FONTS, fontWeight: 700, fontSize: compact ? "0.85rem" : "1.05rem", color: "#fff", letterSpacing: "-0.01em" }}>YOUR NAME</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <span className="rl-glow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#2FCDA5", display: "inline-block" }} />
            <span style={{ fontSize: compact ? "0.65rem" : "0.75rem", color: "#9ca3af" }}>L2 clearance</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: compact ? 22 : 28, opacity: 0.7 }}>
        {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3].map((w, i) => (
          <div key={i} style={{ width: w, height: "100%", background: "#e5e7eb" }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Buttons ---------- */
interface ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function ButtonPrimary({ children, style = {} }: ButtonProps) {
  const router = useRouter()
  const [hover, setHover] = useState(false);
  return (
    <button
    onClick={()=>{
      router.push("/signup")
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "14px 30px",
        background: "#2FCDA5",
        border: "none",
        borderRadius: 10,
        color: "#0B0D10",
        fontSize: "0.92rem",
        fontFamily: FONTS,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: hover ? "0 0 40px rgba(47,205,165,0.5)" : "0 0 28px rgba(47,205,165,0.35)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function ButtonGhost({ children, style = {} }: ButtonProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "14px 30px",
        background: hover ? "rgba(255,255,255,0.06)" : "transparent",
        border: `1px solid ${hover ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.18)"}`,
        borderRadius: 10,
        color: "#fff",
        fontSize: "0.92rem",
        fontFamily: FONTS,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ---------- Feature card ---------- */
interface FeatureItem {
  color: string;
  bg: string;
  title: string;
  desc: string;
  preview: string;
}
function FeatureCard({ f }: { f: FeatureItem }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#14171C",
        border: `1px solid ${hover ? f.color + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover ? "0 24px 50px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div>
        <h3 style={{ fontFamily: FONTS, fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{f.title}</h3>
        <p style={{ fontSize: "0.85rem", color: "#9A9A93", lineHeight: 1.65, margin: 0, maxWidth: 320 }}>{f.desc}</p>
      </div>
      <div style={{ background: "#191C22", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16, minHeight: 72, display: "flex", alignItems: "center" }}>
        <MiniPreview type={f.preview} color={f.color} />
      </div>
    </div>
  );
}

/* ---------- Stage card ---------- */
interface StageItem {
  tag: string;
  title: string;
  desc: string;
}
function StageCard({ s }: { s: StageItem }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hover ? "#1F8A70" : "#ddd2b6"}`,
        borderRadius: 16,
        padding: "26px 24px",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 20px 40px rgba(31,138,112,0.15)" : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.1em", color: "#1F8A70", fontWeight: 500, textTransform: "uppercase" }}>{s.tag}</span>
      <h3 style={{ fontFamily: FONTS, fontSize: "1.05rem", fontWeight: 700, color: "#1C1B17", margin: "10px 0" }}>{s.title}</h3>
      <p style={{ fontSize: "0.85rem", color: "#6B6355", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
    </div>
  );
}

/* ---------- Role access card ---------- */
interface RoleItem {
  role: string;
  clearance: string;
  desc: string;
}
function RoleCard({ r }: { r: RoleItem }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#14171C",
        border: `1px solid ${hover ? "#2FCDA555" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "28px 26px",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover ? "0 24px 50px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ fontFamily: FONTS, fontWeight: 700, fontSize: "1.05rem", color: "#fff", margin: 0 }}>{r.role}</h3>
        <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: "#2FCDA5", border: "1px solid #2FCDA555", padding: "3px 8px", borderRadius: 20 }}>{r.clearance}</span>
      </div>
      <p style={{ fontSize: "0.85rem", color: "#9A9A93", lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
    </div>
  );
}

/* ---------- Security point ---------- */
interface SecurityItem {
  title: string;
  desc: string;
}
function SecurityCard({ s }: { s: SecurityItem }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "24px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        transform: hover ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2FCDA5", flexShrink: 0, marginTop: 4 }} />
        <div>
          <h3 style={{ fontFamily: FONTS, fontWeight: 700, fontSize: "1rem", color: "#fff", margin: "0 0 6px" }}>{s.title}</h3>
          <p style={{ fontSize: "0.85rem", color: "#9A9A93", lineHeight: 1.65, margin: 0, maxWidth: 480 }}>{s.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily: BODY, background: "#0B0D10", color: "#E7E5DE", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        @keyframes rl-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .rl-badge-float { animation: rl-float 6s ease-in-out infinite; }

        @keyframes rl-glow-pulse {
          0%, 100% { opacity: 0.55; box-shadow: 0 0 0 0 rgba(47,205,165,0.5); }
          50% { opacity: 1; box-shadow: 0 0 0 4px rgba(47,205,165,0); }
        }
        .rl-glow-dot { animation: rl-glow-pulse 2.2s ease-in-out infinite; }

        @keyframes rl-bar-grow {
          from { height: 0%; }
        }
        .rl-bar { animation: rl-bar-grow 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        html { scroll-behavior: smooth; }

        @media (prefers-reduced-motion: reduce) {
          .rl-badge-float, .rl-glow-dot, .rl-bar { animation: none; }
          html { scroll-behavior: auto; }
        }

        @media (max-width: 860px) {
          .rl-features-grid, .rl-stages-grid, .rl-pricing-grid, .rl-role-grid { grid-template-columns: 1fr !important; }
          .rl-nav-links { display: none !important; }
          .rl-dash-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>


      {/* ===== HERO — split panel ===== */}
      <section style={{ display: "flex", flexWrap: "wrap", minHeight: "88vh" }}>
        {/* left: dark */}
        <div style={{ flex: "1 1 480px", position: "relative", padding: "60px 56px 60px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", top: "-120px", right: "-100px", width: 460, height: 460, borderRadius: "50%", background: "#2FCDA522", filter: "blur(120px)", pointerEvents: "none" }} />

          <Reveal>
            <p style={{ position: "relative", zIndex: 1, fontFamily: MONO, color: "#2FCDA5", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="rl-glow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#2FCDA5", display: "inline-block" }} />
              ID · ACCESS · PAYROLL
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ position: "relative", zIndex: 1, fontFamily: FONTS, fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", marginBottom: 22, maxWidth: 560 }}>
              Every hire gets a badge before they get a desk.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ position: "relative", zIndex: 1, maxWidth: 460, color: "#9A9A93", fontSize: "1rem", lineHeight: 1.75, marginBottom: 36 }}>
              One account, scoped to a role the moment it's created. Employees check in and out from their badge, managers see their team, admins see everything — and every action is on the record.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
              <ButtonPrimary >Issue my badge →</ButtonPrimary>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[{ v: "Role-based", l: "access, by default" }, { v: "Real-time", l: "check-in / check-out" }, { v: "Full", l: "audit trail" }].map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: FONTS, fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>{s.v}</div>
                  <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right: cream */}
        <div style={{ flex: "1 1 420px", background: "#F2ECDC", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 40px" }}>
          <Reveal delay={200} style={{ width: "100%", maxWidth: 380 }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a8172", marginBottom: 14 }}>
                Live preview
              </p>
              <h2 style={{ fontFamily: FONTS, fontWeight: 700, fontSize: "1.4rem", color: "#1C1B17", marginBottom: 8, letterSpacing: "-0.01em" }}>
                See what employees see.
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#6B6355", lineHeight: 1.65, marginBottom: 28 }}>
                Role picked at signup. Clearance, dashboard and permissions follow automatically — nothing to configure by hand.
              </p>
              <BadgeCard floaty />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PRODUCT PREVIEW STRIP ===== */}
      <section style={{ padding: "0 24px 60px", marginTop: 50 }}>
        <Reveal style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ height: 430, background: "#14171C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#111318" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FONTS, fontWeight: 700, fontSize: "0.85rem" }}>
                
              </div>
              <span style={{ fontSize: "0.85rem", color: "#888" }}>
                Welcome back, <span style={{ color: "#2FCDA5", fontWeight: 600 }}>Admin</span>
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                {["← Attendance", "+ Add Employee"].map((label, i) => (
                  <button key={label} style={{ padding: "6px 14px", fontSize: "0.72rem", borderRadius: 8, cursor: "pointer", fontFamily: BODY, background: i === 1 ? "#2FCDA5" : "transparent", border: i === 1 ? "1px solid #2FCDA5" : "1px solid rgba(255,255,255,0.15)", color: i === 1 ? "#0B0D10" : "#ccc", fontWeight: i === 1 ? 600 : 400 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ width: 160, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.07)", padding: "16px 0" }}>
                <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", padding: "0 14px 10px" }}>Menu</div>
                {menuItems.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", fontSize: "0.72rem", cursor: "pointer", color: item === "Dashboard" ? "#fff" : "#777", background: item === "Dashboard" ? "rgba(47,205,165,0.1)" : "transparent", borderLeft: item === "Dashboard" ? "2px solid #2FCDA5" : "2px solid transparent" }}>
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {stats.map((s) => (
                    <div key={s.label} style={{ background: "#191C22", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, marginBottom: 8, background: s.bg, color: s.color, display: "grid", placeItems: "center", fontSize: 12 }}>{s.icon}</div>
                      <div>
                        <span style={{ fontFamily: FONTS, fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{s.value}</span>
                        <span style={{ fontSize: "0.6rem", fontWeight: 600, marginLeft: 6, color: s.up ? "#2FCDA5" : "#ef4444" }}>{s.delta}</span>
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "#666", marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="rl-dash-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: "#191C22", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#ddd" }}>Employee Tracker</span>
                      <span style={{ fontSize: "0.65rem", color: "#666" }}>This week ▾</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70 }}>
                      {bars.map((h, i) => (
                        <div key={i} className="rl-bar" style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: "#2FCDA5", opacity: 0.85, animationDelay: `${i * 60}ms` } as React.CSSProperties} />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      {days.map((d) => (
                        <span key={d} style={{ flex: 1, textAlign: "center", fontSize: "0.55rem", color: "#666" }}>{d}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: "#191C22", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#ddd" }}>Upcoming Schedule</span>
                      <span style={{ fontSize: "0.65rem", color: "#666" }}>Today ▪</span>
                    </div>
                    {scheduleItems.map((s) => (
                      <div key={s.name} style={{ padding: 8, borderRadius: 7, background: "#22262e", marginBottom: 7, borderLeft: `2px solid ${s.border}` }}>
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
        </Reveal>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: "40px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2FCDA5", fontWeight: 500, marginBottom: 14 }}>
              Everything, connected
            </p>
            <h2 style={{ fontFamily: FONTS, fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>
              Four systems. One badge.
            </h2>
            <p style={{ color: "#9A9A93", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Check-in and check-out, payroll, leave and onboarding stop living in separate tabs — they read from the same team record, live.
            </p>
          </div>
        </Reveal>

        <div className="rl-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <FeatureCard f={f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SECURITY ===== */}
 <section style={{ padding: "40px 24px 110px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2FCDA5", fontWeight: 500, marginBottom: 16 }}>
            Security
          </p>
          <h2 style={{ fontFamily: FONTS, fontWeight: 800, fontSize: "clamp(2rem, 4.4vw, 2.8rem)", color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>
            Built to be secure and easy to manage.
          </h2>
        </Reveal>
        <div>
          {securityPoints.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <SecurityCard s={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== STAGES (cream break) ===== */}
      <section style={{ padding: "100px 24px", background: "#F2ECDC" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ textAlign: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#1F8A70", fontWeight: 500, marginBottom: 14 }}>
              Setup
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 style={{ fontFamily: FONTS, fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1C1B17", textAlign: "center", marginBottom: 64, letterSpacing: "-0.01em" }}>
              Live in an afternoon, not a quarter
            </h2>
          </Reveal>

          <div className="rl-stages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {stages.map((s, i) => (
              <Reveal key={s.tag} delay={i * 110}>
                <StageCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ===== FOOTER ===== */}
       <footer style={{ padding: "88px 32px 44px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }} className="rl-features-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: FONTS, fontWeight: 700, fontSize: "1.3rem", marginBottom: 18 }}>
              </div>
              <p style={{ fontSize: "1rem", color: "#8b8f97", lineHeight: 1.75, maxWidth: 300 }}>
                Attendance, payroll and access, run from one badge.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#fff", marginBottom: 22 }}>{col.heading}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {col.links.map((l) => (
                    <span
                      key={l}
                      style={{ fontSize: "0.98rem", color: "#9A9A93", cursor: "pointer", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A93")}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", color: "#6b7280", flexWrap: "wrap", gap: 16 }}>
            <span>© 2026 Rosterly. All rights reserved.</span>
            <div style={{ display: "flex", gap: 28 }}>
              <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>Privacy</span>
              <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>Terms</span>
              <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}