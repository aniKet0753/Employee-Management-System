'use client';
import { useState, useCallback, useEffect  } from "react";
import {dummyEmployeeData, DEPARTMENTS}  from "../assets/assets";
// import Employees from "../../pages/Employees";
import { Plus, Search, } from "lucide-react";
import EmployeeForm,{ EmployeeFormData } from "../component/EmployeeFormData";

export default function Employeepage() {
  const [employee, setemployee] = useState<any[]>([])
  const [ loading , setloding] = useState(false);
  const [search, setsearch]= useState("");
  const [departmantent, setdepaertment] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchEmployeedata = useCallback(() => {
    setloding(true);
    setemployee(dummyEmployeeData);
    setTimeout(() => {
      setloding(false);
    }, 1000);
  },[])

useEffect(()=>{
  fetchEmployeedata();
},[])



  const handleAddEmployee = (form: EmployeeFormData) => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const now = new Date().toISOString();
 
    const newEmployee = {
      _id: id,
      id,
      userId: {
        _id: id,
        email: form.email,
        role: "EMPLOYEE",
      },
      department: form.department,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      position: form.position,
      basicSalary: Number(form.basicSalary) || 0,
      allowances: Number(form.allowances) || 0,
      deductions: Number(form.deductions) || 0,
      employmentStatus: form.employmentStatus,
      joinDate: form.joinDate ? new Date(form.joinDate).toISOString() : now,
      image: null,
      isDeleted: false,
      bio: form.bio,
      createdAt: now,
      updatedAt: now,
      user: {
        email: form.email,
        role: "EMPLOYEE",
      },
    };
 
    setemployee((prev) => [newEmployee, ...prev]);
    setShowAddModal(false);
  };
 
  const filteredEmployees = employee.filter((emp) => {
    const matchesSearch =
      search.trim() === "" ||
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
 
    const matchesDept =
      departmantent === "" || emp.department === departmantent;
 
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
 
      <div style={{ height: "100vh",width: "100%", display: "flex", background: "#0a0d14" }}>
 
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
 
            <button onClick={()=>setShowAddModal(true)} className="add-employee-btn">
              <Plus size={18} />
              Add Employee
            </button>
          </div>

          {/* search + filter row */}
          <div  style={{
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
                <input placeholder="Search Employee" onChange={(e)=>{setsearch(e.target.value)}} value={search} style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e8e8e8",
                  fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                }} ></input>
            </div>
            <select value={departmantent} onChange={(e)=>{setdepaertment(e.target.value)}} style={{
                padding: "10px 16px",
                background: "#151a24",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                color: "#fff",
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                outline: "none",
              }}>
                <option value="" style={{ background: "#151a24", color: "#fff" }}>All Departments</option>
                {DEPARTMENTS.map((dept)=>(
                  <option key={dept} value={dept}>{dept}</option>
                ))}
            </select>
          </div>

          {/* employee cards / table */}
          {loading ? (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
              Loading...
            </p>
          ): (
            <div  style={{  display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              width: "100%",
            }}>
              {filteredEmployees.map((emp)=>(
                <div key={emp.id}  style={{
                  background: "#151a24",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "20px",
                }}>
                  <h3 style={{ color: "#fff", marginBottom: "8px" }}>
                    {emp.firstName}  {emp.lastName}
                  </h3>
                  <p style={{ color: "#9ca3af" }}>
                    {emp.position}
                  </p>
                  <p style={{ color: "#38bdf8" }}>
                    {emp.department}
                  </p>
                  <p style={{ color: "#d1d5db" }}>
                    {emp.email}
                  </p>
                </div>
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
  )
}