'use client';
import { useState, useCallback, useEffect  } from "react";
import {dummyEmployeeData}  from "../assets/assets";
// import Employees from "../../pages/Employees";
import { Plus } from "lucide-react";``

export default function Employeepage() {
  const [employee, setemployee] = useState<any[]>([])
  const [ loading , setloding] = useState(false);

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

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* <header /> */}
      <div>
        <h1>
          Employee
        </h1>
        <p>manage your team memeber</p>
      </div>
      <button > <Plus size={20} />Add employee</button>
      <div>
        {/* <searchbar /> */}
        {/* <heademployee carder /> */}
      </div>
    </div>
   
  )
}