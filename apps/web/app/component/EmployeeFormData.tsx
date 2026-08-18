"use client";
import { useState } from "react";

const EMPLOYMENT_STATUSES = ["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"];
export const DEPARTMENTS = ["Engineering", "Human Resources", "Marketing", "Sales", "Finance", "Operations", "IT Support", "Customer Success", "Product Management", "Design"];


const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 10,
  color: "#e8e8e8",
  fontSize: "0.875rem",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: 6,
};

const fieldWrapper = { marginBottom: 16 };

export type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  basicSalary: string;
  allowances: string;
  deductions: string;
  employmentStatus: string;
  joinDate: string;
  bio: string;
  password: string;
  role: string;
};

const initialFormData: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
  phone: "",
  department: "",
  position: "",
  basicSalary: "",
  allowances: "",
  deductions: "",
  employmentStatus: "ACTIVE",
  joinDate: "",
  bio: "",
};

export default function EmployeeForm({
  onSubmit,
  onCancel,
  submitLabel = "Add Employee",
}: {
  onSubmit: (data: EmployeeFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [form, setForm] = useState<EmployeeFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialFormData);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .employee-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
          font-family: 'DM Sans', sans-serif;
        }
        .employee-form-full {
          grid-column: 1 / -1;
        }
        .employee-form-submit {
          display: flex;
          align-items: center;
          justify-content: center;
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
          box-shadow: 0 0 16px rgba(56,189,248,0.3);
          transition: all 0.2s ease;
          flex: 1;
        }
        .employee-form-submit:hover {
          box-shadow: 0 0 22px rgba(56,189,248,0.45);
          transform: translateY(-1px);
        }
        .employee-form-cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 11px 20px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
        }
        .employee-form-cancel:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .employee-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        select option {
          background: #151a24;
          color: #fff;
        }
      `}</style>

      <form onSubmit={handleSubmit}>
        <div className="employee-form-grid">
          <div style={fieldWrapper}>
            <label style={labelStyle}>First Name</label>
            <input
              style={inputStyle}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="David"
              required
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Last Name</label>
            <input
              style={inputStyle}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Michael"
              required
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="david@example.com"
              required
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Phone</label>
            <input
              style={inputStyle}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9000000001"
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Department</label>
            <select
              style={inputStyle}
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((dept: string) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Position</label>
            <input
              style={inputStyle}
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Software Developer"
              required
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Basic Salary</label>
            <input
              style={inputStyle}
              type="number"
              name="basicSalary"
              value={form.basicSalary}
              onChange={handleChange}
              placeholder="40000"
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Allowances</label>
            <input
              style={inputStyle}
              type="number"
              name="allowances"
              value={form.allowances}
              onChange={handleChange}
              placeholder="10000"
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Deductions</label>
            <input
              style={inputStyle}
              type="number"
              name="deductions"
              value={form.deductions}
              onChange={handleChange}
              placeholder="2000"
            />
          </div>

          <div style={fieldWrapper}>
            <label style={labelStyle}>Employment Status</label>
            <select
              style={inputStyle}
              name="employmentStatus"
              value={form.employmentStatus}
              onChange={handleChange}
            >
              {EMPLOYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="employee-form-full" style={fieldWrapper}>
            <label style={labelStyle}>Join Date</label>
            <input
              style={inputStyle}
              type="date"
              name="joinDate"
              value={form.joinDate}
              onChange={handleChange}
            />
          </div>
           <div style={fieldWrapper}>
            <label style={labelStyle}>Role</label>
            <input
              style={inputStyle}
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Employee"
            />
          </div>
           <div style={fieldWrapper}>
            <label style={labelStyle}>Set Employee Password</label>
            <input
              style={inputStyle}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="****"
              required
            />
          </div>
          <div className="employee-form-full" style={fieldWrapper}>
            <label style={labelStyle}>Bio</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short bio about the employee"
            />
          </div>
        </div>

        <div className="employee-form-actions">
          {onCancel && (
            <button type="button" className="employee-form-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="employee-form-submit">
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}