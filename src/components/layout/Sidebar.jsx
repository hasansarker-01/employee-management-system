import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const location = useLocation();

  // Employees submenu automatically open থাকবে
  // যখন employee related page-এ থাকব
  const [employeeOpen, setEmployeeOpen] = useState(location.pathname.startsWith('/employees'));
  const [attandenceOpen, setAttandenceOpen] = useState(location.pathname.startsWith('/attandence'));

  // Normal navigation style
  const navStyle = ({ isActive }) => `block px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 p-5 text-white">
      {/* Logo / Project Name */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">EmployeeHub</h1>

        <p className="text-sm text-slate-400 mt-1">Management System</p>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2">
        {/* Dashboard */}
        <NavLink to="/" end className={navStyle}>
          Dashboard
        </NavLink>
        {/* Employees Main Menu */}
        <button type="button" onClick={() => setEmployeeOpen(!employeeOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${location.pathname.startsWith('/employees') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
          <span>Employees</span>

          <span className="text-lg">{employeeOpen ? '−' : '+'}</span>
        </button>
        {/* Employees Submenu */}
        {employeeOpen && (
          <div className="ml-4 pl-3 border-l border-slate-700 space-y-1">
            {/* Add Employee */}
            <NavLink to="/employees/add" className={navStyle}>
              Add Employee
            </NavLink>
            {/* Employee List */}
            <NavLink to="/employees" end className={navStyle}>
              Employee List
            </NavLink>

            {/* Departments */}
            <NavLink to="/employees/departments" className={navStyle}>
              Departments
            </NavLink>
          </div>
        )}

        {/* Attandence */}
        <button type="button" onClick={() => setAttandenceOpen(!attandenceOpen)}>
          {' '}
          <span className="text-lg">{attandenceOpen ? '−' : '+'}</span> Attandence
        </button>

        {attandenceOpen && (
          <div className="ml-4 pl-3 border-l border-slate-700 space-y-1">
            {/* Add Employee */}
            <NavLink to="/attendance" end className={navStyle}>
              Add Attandence
            </NavLink>
            {/* Employee List */}
            <NavLink to="/attendance/history" className={navStyle}>
              Attandence List
            </NavLink>
          </div>
        )}

        {/* <NavLink className={navStyle} to="/attendance">
          Attandence
        </NavLink> */}
      </nav>
    </aside>
  );
}

export default Sidebar;
