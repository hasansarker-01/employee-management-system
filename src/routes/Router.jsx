import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../components/layout/DashboardLayout';

import Dashboard from '../pages/dashboard/Dashboard';

import Employees from '../pages/employees/Employees';
import AddEmployee from '../pages/employees/AddEmployee';
import Departments from '../pages/employees/Departments';
import EditEmployee from '../pages/employees/EditEmployee';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import Attendance from '../pages/attendance/Attendance';
import AttendanceHistory from '../pages/attendance/AttendanceHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/employees',
        element: <Employees />,
      },
      {
        path: '/employees/add',
        element: <AddEmployee />,
      },
      {
        path: '/employees/departments',
        element: <Departments />,
      },
      {
        path: '/employees/edit/:id',
        element: <EditEmployee />,
      },
      {
        path: '/employees/:id',
        element: <EmployeeDetails />,
      },
      // Attendance
      {
        path: '/attendance',
        element: <Attendance />,
      },
      {
        path: '/attendance/history',
        element: <AttendanceHistory />,
      },
    ],
  },
]);

export default router;
