"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    key: "employees",
    label: "Employees",
    href: "/admin/employee",
  },
  {
    key: "leave",
    label: "Leave",
    href: "/admin/leave",

  },
  {
    key: "payslips",
    label: "Payslips",
    href: "/admin/payslip",

  },
  {
    key: "settings",
    label: "Settings",
    href: "/admin/setting",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => setLoggingOut(false), 1500); // replace with real logout
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
          border: 1px solid transparent;
          font-family: 'DM Sans', sans-serif;
        }
        .admin-nav-item:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
        }
        .admin-nav-item.active {
          color: #fff;
          background: rgba(249,115,22,0.15);
          border-color: rgba(249,115,22,0.25);
          box-shadow: inset 3px 0 0 #F97316;
        }
        .admin-nav-item.active svg {
          color: #F97316;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          background: none;
          border: 1px solid transparent;
          color: rgba(255,255,255,0.35);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }
        .admin-logout-btn:hover {
          color: #ef4444;
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.15);
        }
        .admin-logout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{
        width: 260,
        overflow: "hidden",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d1117 0%, #0a0d14 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        animation: "fadeIn 0.5s ease both",
        flexShrink: 0,
      }}>

        {/* ── BRAND ── */}
        <div style={{
          padding: "28px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, #F97316, #ea6a08)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(249,115,22,0.35)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#fff", lineHeight: 1.2 }}>
                Employee MS
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* ── USER CARD ── */}
        <div style={{ padding: "16px 20px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 9,
              background: "linear-gradient(135deg, #1e2a6e, #2d3fa0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem", fontWeight: 700, color: "#fff",
              flexShrink: 0,
              border: "1px solid rgba(249,115,22,0.2)",
            }}>
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#e8e8e8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Admin User
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>
                Administrator
              </div>
            </div>
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              flexShrink: 0,
              animation: "pulseDot 2.5s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* ── NAVIGATION ── */}
        <div style={{ padding: "8px 20px", flex: 1 }}>
          <div style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: 10,
            paddingLeft: 4,
          }}>
            Navigation
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {adminNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`admin-nav-item${isActive ? " active" : ""}`}
                >
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── LOGOUT ── */}
        <div style={{
          padding: "8px 20px 15px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <button
            className="admin-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>

      </div>
    </>
  );
}