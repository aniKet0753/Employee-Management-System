"use client";
import React from "react";
import { Calendar1Icon, DollarSignIcon, FileTextIcon} from 'lucide-react';

type EmployeeDashboardProps = {
  data: any;
};

const EmployeeDashboard = ({data}: EmployeeDashboardProps) => {
  const emp = data.employee;
console.log(data)
  const card = [
    {
      icon: <Calendar1Icon  color="white"/>,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month"
    },
    {
      icon: <FileTextIcon  color="white"/>,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval"
    },{
       icon: <DollarSignIcon  color="white"/>,
      value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payment"
    }
  ]
  return (
    <div> Employee dashboard </div>
  )}
  export default EmployeeDashboard;