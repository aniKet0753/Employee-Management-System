"use client";
import { useState, useEffect } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Search } from "lucide-react";
import axios from "axios";

type User = { _id: string; email: string };

type Employee = {
  _id: string;
  userId: User | null;
  department: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  employmentStatus: "ACTIVE" | "INACTIVE";
  joinDate: string;
  bio: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AdminPayment() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [confirmEmp, setConfirmEmp] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Employee[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllEmployees();
  }, []);

  // Loads the Razorpay checkout script once, on demand
  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Runs after the admin confirms — this is the part that actually
  // creates the order and opens Razorpay checkout
const startPayment = async (emp: Employee) => {
  setPayingId(emp._id);
  setError(null);

  try {
    const token = localStorage.getItem("token");

    const netSalary =
      emp.basicSalary +
      emp.allowances -
      emp.deductions;

    // 1. Create order through YOUR backend
    const orderRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
      {
        amount: netSalary,
        employeeId: emp._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2. Get order + public Razorpay key
    const { order, key_id } = orderRes.data;

    console.log("Razorpay order:", order);
    console.log("Razorpay key:", key_id);

    // 3. Load Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      setError("Failed to load payment gateway.");
      return;
    }

    // 4. Razorpay options
    const options = {
      key: key_id,

      // order.amount is already in paise
      amount: order.amount,

      currency: order.currency,

      name: "Employee Management",

      description: `Salary payment for ${emp.firstName} ${emp.lastName}`,

      order_id: order.id,

      prefill: {
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.email,
        contact: emp.phone,
      },

      handler: function (response: any) {
        console.log("Payment successful!");
        console.log("Payment response:", response);

        alert(
          `Payment successful for ${emp.firstName} ${emp.lastName}`
        );
      },

      theme: {
        color: "#3399cc",
      },
    };

    // 5. Create Razorpay ONCE
    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response: any) => {
      console.error("Payment failed:", response);

      setError(
        `Payment failed for ${emp.firstName} ${emp.lastName}`
      );
    });

    // 6. Open Razorpay ONCE
    razorpay.open();

  } catch (err) {
    console.error("Payment initiation failed:", err);

    setError(
      "Failed to start payment. Please try again."
    );
  } finally {
    setPayingId(null);
    setConfirmEmp(null);
  }
};

  const filteredEmployees = data.filter((emp) => {
    const matchesSearch =
      search.trim() === "" ||
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === "" || emp.department === department;
    return matchesSearch && matchesDept;
  });

 return (
    <div style={{ padding: "24px", backgroundColor: "#000000", minHeight: "100vh", color: "#ffffff" ,width:"100%"}}>
      <h1 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#ffffff" }}>
        Pay Employees
      </h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={16}
            style={{ position: "absolute", left: "8px", top: "10px", color: "#9ca3af" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            style={{
              width: "100%",
              paddingLeft: "32px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              color: "#000000",
              backgroundColor: "#ffffff",
            }}
          />
        </div>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            padding: "8px 12px",
            color: "#000000",
            backgroundColor: "#ffffff",
          }}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d: string) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {error && <p style={{ color: "#f87171", marginBottom: "12px" }}>{error}</p>}
      {loading && <p style={{ color: "#ffffff" }}>Loading employees...</p>}

      <div style={{display: "grid",
    gridTemplateColumns: "repeat(3, minmax(280px, 1fr))",
    gap: "16px",}}>
        {filteredEmployees.map((emp) => (
          <div
            key={emp._id}
            onClick={() => setConfirmEmp(emp)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "16px",
              cursor: payingId === emp._id ? "default" : "pointer",
              backgroundColor: "#111827",
              color: "#ffffff",
              opacity: payingId === emp._id ? 0.5 : 1,
              pointerEvents: payingId === emp._id ? "none" : "auto",
            }}
          >
            <div>
              <p style={{ fontWeight: 500, color: "#ffffff", margin: 0 }}>
                {emp.firstName} {emp.lastName}
              </p>
              <p style={{ fontSize: "14px", color: "#9ca3af", margin: "4px 0 0 0" }}>
                {emp.position} · {emp.department}
              </p>
              <p style={{ fontSize: "14px", color: "#9ca3af", margin: "4px 0 0 0" }}>
                {emp.email}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: 600, color: "#ffffff", margin: 0 }}>
                ₹{(emp.basicSalary + emp.allowances - emp.deductions).toLocaleString()}
              </p>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "4px 0 0 0" }}>
                {payingId === emp._id ? "Processing..." : "Click to pay"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {confirmEmp && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "24px",
              width: "320px",
              color: "#ffffff",
            }}
          >
            <h2 style={{ fontWeight: 600, marginBottom: "8px", color: "#ffffff" }}>
              Confirm Payment
            </h2>
            <p style={{ fontSize: "14px", color: "#d1d5db", marginBottom: "16px" }}>
              Pay ₹
              {(
                confirmEmp.basicSalary +
                confirmEmp.allowances -
                confirmEmp.deductions
              ).toLocaleString()}{" "}
              to {confirmEmp.firstName} {confirmEmp.lastName}?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setConfirmEmp(null)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #4b5563",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => startPayment(confirmEmp)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}