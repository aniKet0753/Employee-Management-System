"use client";
import { useState } from "react";
import axios from "axios"
type Role = "ADMIN" | "EMPLOYEE";

export default function SignUp() {
  const [form, setForm] = useState({
    role: "EMPLOYEE",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", form);
    // router.push(form.role === "admin" ? "/admin" : "/employee");
  };

  const isAdmin = form.role === "ADMIN";
  const accent = isAdmin ? "#B8862F" : "#14746B";
  const badgeName = form.email.split("@")[0];
  const displayName = badgeName
    ? badgeName.charAt(0).toUpperCase() + badgeName.slice(1)
    : "YOUR NAME";
  const badgeId = isAdmin ? "ADM-2381" : "EMP-7042";

  const signupfunc = async ()=>{
    try{
    const responce = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`,{
      email:form.email,
      password:form.password,
      role:form.role
    });
    
    console.log("signup details: ", responce);
    alert("Signup successful!");
  }catch(error){
    console.error(error);
  }
}

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        * { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #A9A196; }
        input:focus { border-color: ${accent} !important; box-shadow: 0 0 0 3px ${accent}22; }
        .role-opt { transition: color 0.2s ease; }
        .role-opt[data-active="true"] { color: #1E2230; }
        .role-opt[data-active="false"] { color: #A9A196; }
        .badge-card { transition: border-color 0.25s ease; }
        .submit-btn { transition: transform 0.15s ease, background 0.2s ease; }
        .submit-btn:hover { transform: translateY(-1px); }
        .submit-btn:active { transform: translateY(0); }

        @media (max-width: 880px) {
          .sp-left { display: none !important; }
          .sp-right { padding: 32px 24px !important; }
        }
      `}</style>

      {/* left: ink panel with live badge */}
      <div className="sp-left" style={styles.leftPanel}>
        <div style={styles.gridOverlay} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={styles.eyebrow}>ID · ACCESS · PAYROLL</p>
          <h1 style={styles.heading}>
            Every hire gets a badge
            <br />
            before they get a desk.
          </h1>
          <p style={styles.description}>
            One account, scoped the moment it&apos;s created. Admins get the
            controls, employees get their shifts, payroll and requests —
            nothing more, nothing less.
          </p>

          {/* signature element: live badge preview */}
          <div
            className="badge-card"
            style={{ ...styles.badgeCard, borderColor: accent }}
          >
            <div style={{ ...styles.badgeStripe, backgroundColor: accent }} />
            <div style={styles.badgeTop}>
              <span style={styles.badgeSystem}>EMPLOYEE MANAGEMENT SYSTEM</span>
              <span style={{ ...styles.badgeId, color: accent }}>{badgeId}</span>
            </div>

            <div style={styles.badgeBody}>
              <div style={{ ...styles.badgePhoto, borderColor: accent }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke={accent} strokeWidth="1.6" />
                  <path
                    d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"
                    stroke={accent}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p style={styles.badgeName}>{displayName}</p>
                <p style={styles.badgeRole}>
                  <span
                    style={{ ...styles.badgeDot, backgroundColor: accent }}
                  />
                  {isAdmin ? "Administrator" : "Employee"} clearance
                </p>
              </div>
            </div>

            <div style={styles.barcode}>
              {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2].map(
                (w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}px`, backgroundColor: "#3A3F4E" }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* right: paper panel with form */}
      <div className="sp-right" style={styles.rightPanel}>
        <div style={styles.formWrap}>
          <p style={styles.formEyebrow}>GET STARTED</p>
          <h2 style={styles.welcome}>Create your account</h2>
          <p style={styles.subtext}>
            Pick a role — we&apos;ll set up the right badge for you.
          </p>

          {/* role toggle */}
          <div style={styles.roleToggle}>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "EMPLOYEE" })}
              className="role-opt"
              data-active={!isAdmin}
              style={{
                ...styles.roleOptBtn,
                backgroundColor: !isAdmin ? "#F5F0E4" : "transparent",
                boxShadow: !isAdmin ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
              }}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "ADMIN" })}
              className="role-opt"
              data-active={isAdmin}
              style={{
                ...styles.roleOptBtn,
                backgroundColor: isAdmin ? "#F5F0E4" : "transparent",
                boxShadow: isAdmin ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
              }}
            >
              Admin
            </button>
          </div>
          <p style={styles.roleHint}>
            {isAdmin
              ? "Full system access: manage staff, payroll and settings."
              : "View your shifts, payroll and submit requests."}
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

             <div style={styles.field}>
              <label style={styles.label}>ROLE</label>
              <input
                type="role"
                name="role"
                placeholder="ADMIN OR EMPLOYEE"
                value={form.role}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              onClick={signupfunc}
              style={{ ...styles.button, backgroundColor: accent }}
            >
              Issue my badge →
            </button>
          </form>

          <p style={styles.footer}>© 2026 GreatStack. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    backgroundColor: "#F5F0E4",
    color: "#1E2230",
  },

  /* left panel */
  leftPanel: {
    flex: 1,
    position: "relative",
    backgroundColor: "#12151F",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "64px",
    overflow: "hidden",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#8A93A6",
    marginBottom: "20px",
  },
  heading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "38px",
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: "16px",
    maxWidth: "460px",
  },
  description: {
    color: "#9199AA",
    fontSize: "15px",
    lineHeight: 1.65,
    maxWidth: "400px",
    marginBottom: "40px",
  },

  /* signature badge card */
  badgeCard: {
    width: "340px",
    backgroundColor: "#171B26",
    border: "1px solid #2A2F3D",
    borderRadius: "14px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  badgeStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
  },
  badgeTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
    marginTop: "4px",
  },
  badgeSystem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "9px",
    letterSpacing: "1px",
    color: "#6B7284",
  },
  badgeId: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    fontWeight: 500,
  },
  badgeBody: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "22px",
  },
  badgePhoto: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backgroundColor: "#0F131C",
  },
  badgeName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "17px",
    fontWeight: 700,
    margin: "0 0 4px 0",
    letterSpacing: "0.3px",
  },
  badgeRole: {
    fontSize: "12px",
    color: "#9199AA",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    display: "inline-block",
  },
  barcode: {
    display: "flex",
    gap: "2px",
    height: "26px",
    alignItems: "stretch",
  },

  /* right panel */
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  formWrap: {
    width: "100%",
    maxWidth: "400px",
  },
  formEyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#8B8266",
    marginBottom: "10px",
  },
  welcome: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "30px",
    fontWeight: 700,
    marginBottom: "8px",
  },
  subtext: {
    color: "#6B6455",
    fontSize: "14px",
    marginBottom: "24px",
  },

  roleToggle: {
    position: "relative",
    display: "flex",
    backgroundColor: "#ECE4D2",
    borderRadius: "10px",
    padding: "3px",
    marginBottom: "10px",
  },
  roleOptBtn: {
    flex: 1,
    position: "relative",
    zIndex: 1,
    border: "none",
    background: "transparent",
    borderRadius: "8px",
    padding: "10px 0",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  roleHint: {
    fontSize: "12px",
    color: "#8B8266",
    marginBottom: "22px",
    lineHeight: 1.5,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#8B8266",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #D9CFB8",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#1E2230",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#ffffff",
    cursor: "pointer",
    marginTop: "8px",
  },
  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#A9A196",
    marginTop: "32px",
  },
};