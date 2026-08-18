"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import EmployeeDashboardComponent from "../../component/Employdashboard";
import axios from "axios";

type EmployeeDashboardData = {
  role: string;
  PendingLeaves: number;
  latestPayslip: number | null;
  currentMonthAttendance: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
};

export default function EmployeeDashboard() {
  const [data, setData] = useState<EmployeeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Dashboard data:", response.data);

        setData(response.data);

      } catch (error: any) {
        console.error("Dashboard error:", error);

        setError(
  error.response?.data?.message ||
  "Unable to load your dashboard."
);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />

 {loading ? (
  <p
    style={{
      fontSize: "50px",
      fontFamily: "Roboto",
      color: "white",
    }}
  >
    Loading....
  </p>
) : error ? (
  <p
    style={{
      fontSize: "30px",
      color: "red",
    }}
  >
    {error && (
  <div className="error-container">
    <p>{error}</p>
    <small>
      Please ask an admin to add you as an employee.
      For demo purposes, you can also sign up as an admin
      & add Yourself.
    </small>
  </div>
)}
  </p>
) : data ? (
  <EmployeeDashboardComponent data={data} />
) : null}
    </div>
  );
}