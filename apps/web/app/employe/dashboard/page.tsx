"use client";
import { useEffect } from "react";
import Sidebar from "../../component/sidebar";

export default function EmployeeDashboard() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }} />
    </div>
  );
}