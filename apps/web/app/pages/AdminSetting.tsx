"use client";

import { Lock, ShieldCheck, ChevronRight } from "lucide-react";

export default function AdminSettingPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#000000",
        padding: "35px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "35px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
            color: "#ffffff",
          }}
        >
          Settings
        </h1>

        <p
          style={{
            marginTop: "7px",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Manage your account and security settings
        </p>
      </div>

      {/* Security */}
      <div style={{ maxWidth: "750px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <ShieldCheck size={20} color="#f97316" />

          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            Security
          </h2>
        </div>

        {/* Password Card */}
        <div
          style={{
            backgroundColor: "#0f0f0f",
            border: "1px solid #2a2a2a",
            borderRadius: "14px",
            padding: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          {/* Left side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Lock Icon */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#2a170b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lock size={22} color="#f97316" />
            </div>

            {/* Password Text */}
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Password
              </h3>

              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "13px",
                  color: "#9ca3af",
                }}
              >
                Change your new account password
              </p>
            </div>
          </div>

          {/* Change Button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "9px 14px",
              borderRadius: "8px",
              border: "1px solid #333333",
              backgroundColor: "transparent",
              color: "#f97316",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Change
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}