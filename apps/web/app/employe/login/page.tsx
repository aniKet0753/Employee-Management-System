"use client";
import React, { useState } from "react";

export default function LoginAsEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

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
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #e8e8e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: #444; }
        .input-field:focus {
          border-color: rgba(139,92,246,0.6);
          background: rgba(139,92,246,0.04);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #8B5CF6;
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 28px rgba(139,92,246,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          background: #7c3aed;
          transform: translateY(-1px);
          box-shadow: 0 0 40px rgba(139,92,246,0.5);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          padding: 0 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          font-size: 16px;
        }
        .eye-btn:hover { color: #8B5CF6; }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #555;
          text-decoration: none;
          font-size: 0.82rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: #8B5CF6; }

        .forgot-link {
          color: #8B5CF6;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.75; }

        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
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
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        {/* Orbs */}
        <div style={{ position: "absolute", top: "18%", left: "25%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 68%)", animation: "floatOrb 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "-50px", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)", animation: "floatOrb 11s 3s ease-in-out infinite", pointerEvents: "none" }} />

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulseDot 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Employee Access</span>
          </div>

          <h1 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 800, fontSize: "clamp(4.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: "#fff", marginBottom: 18, letterSpacing: "-0.02em" }}>
            Employee<br />
            <span style={{ color: "#8B5CF6" }}>Self </span>
            Portal
          </h1>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 320, fontWeight: 300 }}>
            Secure employee access to view your shifts, payroll, leave requests, and personal HR information.
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
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Back link */}
          <a href="/login" className="back-link" style={{ color:"white", display: "inline-flex", marginBottom: 16 }}>
            ← Back to portals
          </a>

          {/* Heading */}
          <h2 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "1.9rem", color: "#fff", marginBottom: 6, letterSpacing: "-0.01em" }}>
            Employee Sign In
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#555", marginBottom: 36 }}>
            Enter your credentials to access your employee portal.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Employee ID / Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", color: "#888", marginBottom: 8, fontWeight: 500, letterSpacing: "0.03em" }}>
                EMPLOYEE ID / EMAIL
              </label>
              <input
                type="text"
                placeholder="EMP-0001 or you@company.com"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="input-field"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: "0.78rem", color: "#888", fontWeight: 500, letterSpacing: "0.03em" }}>
                  PASSWORD
                </label>
                <a href="/forgot-password" className="forgot-link">Forgot password?</a>
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14 ,marginTop:"4px"}}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner" />
                  Signing in...
                </>
              ) : (
                <>Sign In to Employee Portal →</>
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ marginTop: 40, fontSize: "0.72rem", color: "#ffffff", textAlign: "center" }}>
            © 2026 GreatStack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}