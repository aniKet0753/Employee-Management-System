"use client";
import {useState} from 'react';
import {useEffect} from "react";
import {dummyEmployeeData} from "../assets/assets";



export default function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", dept: "Engineering" });

  useEffect(() => {
    setEmployees(dummyEmployeeData); // ← comes from assets now
  }, []);

  // return (
  //  <div>
  //   //header
  //  </div>
  //  <div>
  //   //search bar 
  //   //employee card
  //  </div>
  // )
}