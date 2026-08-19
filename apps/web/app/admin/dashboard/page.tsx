"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../../component/AdminSidebar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Pointer } from "lucide-react";
import { Route } from "next";

type admindata = {
  role: string;
  totalEmployees: number;
  totalDepartmenrs: number;
  totalLeaves: number;
  totalPaySlips: number;
};

export default function AdminDashboard() {
  const [data, setdata] = useState<admindata | null>(null); //added no type for now, can be changed later when we have the actual data structure
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const admindashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return console.log("error : token is required");
        }
        const responce = await axios.get<admindata>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("responce data:", responce.data);
        setdata(responce.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    admindashboard();
  }, []);

  const stats = data
    ? [
        {
          label: "Total Employees",
          value: data.totalEmployees,
          icon: "👥",
          glow: "#7c3aed",
          route: "/admin/employee",
        },
        {
          label: "Total Departments",
          value: data.totalDepartmenrs,
          icon: "🏢",
          glow: "#f97316",
          route: "/admin/employee",

        },
        {
          label: "Total Leaves",
          value: data.totalLeaves,
          icon: "📅",
          glow: "#22c55e",
          route: "/admin/leave",

        },
        {
          label: "Total PaySlips",
          value: data.totalPaySlips,
          icon: "💵",
          glow: "#3b82f6",
          route: "/admin/payslip",
        },
      ]
    : [];

    const pageDetails = (route: string) => {
      router.push(route);
     };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#000000",
        fontFamily: "Roboto, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle grid backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-100px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          backgroundColor: "#7c3aed22",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "48px 56px",
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "48px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#7c3aed",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Dashboard
              </p>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "34px",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                Welcome back, Admin
              </h1>
              <p
                style={{ color: "#9ca3af", fontSize: "15px", marginTop: "8px" }}
              >
                Here's an overview of your organization today.
              </p>
            </div>

            <span
              style={{
                backgroundColor: "#111111",
                color: "#a78bfa",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid #7c3aed44",
                boxShadow: "0 0 20px #7c3aed22",
              }}
            >
              {data?.role}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  position: "relative",
                  backgroundColor: "#0d0d0d",
                  border: "1px solid #1f1f1f",
                  borderRadius: "20px",
                  padding: "28px",
                  overflow: "hidden",
                }}
              >
                {/* corner glow accent */}
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    backgroundColor: `${stat.glow}22`,
                    filter: "blur(30px)",
                  }}
                />

                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    backgroundColor: `${stat.glow}1a`,
                    border: `1px solid ${stat.glow}33`,
                    marginBottom: "22px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.icon}
                </div>

                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "32px",
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: "-0.5px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                    fontWeight: 500,
                    margin: "6px 0 0",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.label}
                </p>
                <span onClick={() => pageDetails(stat.route)}
                  style={{
                    cursor:"Pointer",
                    fontSize: "12px",
                    color: "white",
                    textDecoration: "underline"
                  }}>
                  View details
                </span>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}
