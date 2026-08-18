'use client';
import { useState, useEffect, type ReactNode } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Plus, Search } from "lucide-react";
import EmployeeForm, { EmployeeFormData } from "../component/EmployeeFormData";
import axios from "axios";

type User = {
  _id: string;
  email: string;
};

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

type CreateEmployeeResponse = {
  success: boolean;
  message: string;
  data: Employee;
  userCreated: User;
};

export default function Employeepage() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all employees once on mount. Hooks must live at the top level of
  // the component, never inside another function like handleAddEmployee.
  useEffect(() => {
    const fetchAllEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Employee[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  // Submits the new employee to the backend, then appends the created
  // record to local state so the UI updates without a full refetch.
  const handleAddEmployee = async (form: EmployeeFormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<CreateEmployeeResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/createemploye`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prev) => [...prev, response.data.data]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add employee:", err);
      setError("Failed to add employee. Please try again.");
    }
  };

  const filteredEmployees = data.filter((emp) => {
    const matchesSearch =
      search.trim() === "" ||
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesDept = department === "" || emp.department === department;

    return matchesSearch && matchesDept;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .add-employee-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          box-shadow:0 0 16px rgba(56,189,248,0.3);
          transition: all 0.2s ease;
        }
        .add-employee-btn:hover {
          box-shadow: 0 0 22px rgba(45,63,160,0.4);
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{ height: "100vh", width: "100%", display: "flex", background: "#0a0d14" }}>

        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            overflowY: "auto",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 28,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Employees
              </h1>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 6,
                }}
              >
                Manage your team members
              </p>
            </div>

            <button onClick={() => setShowAddModal(true)} className="add-employee-btn">
              <Plus size={18} />
              Add Employee
            </button>
          </div>

          {/* search + filter row */}
          <div style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
          }}>
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
            }}>
              <Search size={17} color="rgba(255,255,255,0.35)" />
              <input
                placeholder="Search Employee"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e8e8e8",
                  fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{
                padding: "10px 16px",
                background: "#151a24",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                color: "#fff",
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="" style={{ background: "#151a24", color: "#fff" }}>All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 16 }}>
              {error}
            </p>
          )}

          {/* employee detail list — every field, one employee after another */}
          {loading ? (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
              Loading...
            </p>
          ) : filteredEmployees.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
              No employees found.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              {filteredEmployees.map((emp) => (
                <EmployeeDetailCard key={emp._id} emp={emp} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            fontFamily: "'DM Sans', sans-serif",
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              background: "#151a24",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              width: "100%",
              maxWidth: 560,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "#fff",
                margin: "0 0 20px 0",
              }}
            >
              Add Employee
            </h2>

            <EmployeeForm
              onSubmit={handleAddEmployee}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

// ---- helpers ----

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

const formatDate = (value: string) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// One label/value pair inside a detail card.
function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "rgba(255,255,255,0.35)",
      }}>
        {label}
      </span>
      <span style={{ fontSize: "0.9rem", color: "#e8e8e8" }}>
        {value ?? "—"}
      </span>
    </div>
  );
}

// Full detail panel for a single employee — every field, laid out clearly.
function EmployeeDetailCard({ emp }: { emp: Employee }) {
  const netPay = (emp.basicSalary || 0) + (emp.allowances || 0) - (emp.deductions || 0);
  const isActive = emp.employmentStatus === "ACTIVE";

  return (
    <div style={{
      background: "#151a24",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "24px",
    }}>
      {/* name + status */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "#fff",
            margin: 0,
          }}>
            {emp.firstName} {emp.lastName}
          </h3>
          <p style={{ color: "#38bdf8", fontSize: "0.85rem", marginTop: 4 }}>
            {emp.position} · {emp.department}
          </p>
        </div>
        <span style={{
          padding: "4px 12px",
          borderRadius: 999,
          fontSize: "0.72rem",
          fontWeight: 600,
          color: isActive ? "#4ade80" : "#f87171",
          background: isActive ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
          border: `1px solid ${isActive ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
          height: "fit-content",
        }}>
          {emp.employmentStatus}
        </span>
      </div>

      {/* contact + employment */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "16px",
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <DetailRow label="Email" value={emp.email} />
        <DetailRow label="Phone" value={emp.phone} />
        <DetailRow label="Department" value={emp.department} />
        <DetailRow label="Position" value={emp.position} />
        <DetailRow label="Join Date" value={formatDate(emp.joinDate)} />
        <DetailRow label="Account Email" value={emp.userId?.email} />
      </div>

      {/* pay breakdown */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "16px",
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <DetailRow label="Basic Salary" value={formatCurrency(emp.basicSalary)} />
        <DetailRow label="Allowances" value={formatCurrency(emp.allowances)} />
        <DetailRow label="Deductions" value={formatCurrency(emp.deductions)} />
        <DetailRow
          label="Net Pay"
          value={<span style={{ color: "#38bdf8", fontWeight: 600 }}>{formatCurrency(netPay)}</span>}
        />
      </div>

      {/* bio */}
      <DetailRow
        label="Bio"
        value={emp.bio ? emp.bio : <span style={{ color: "rgba(255,255,255,0.3)" }}>No bio added.</span>}
      />
    </div>
  );
}