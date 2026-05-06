import { useState } from "react";

export default function AdminPage() {
  const [showPassword, setShowPassword] = useState(false);
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
</div>
  )
}