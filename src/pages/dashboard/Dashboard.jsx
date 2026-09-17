import { useEffect, useState } from 'react';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // MongoDB থেকে employees আনা
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        setEmployees(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Total employees
  const totalEmployees = employees.length;

  // Active employees
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;

  // Inactive employees
  const inactiveEmployees = employees.filter((employee) => employee.status === 'Inactive').length;

  // Unique departments
  const totalDepartments = new Set(employees.map((employee) => employee.department)).size;

  // Active percentage
  const activePercentage = totalEmployees > 0 ? ((activeEmployees / totalEmployees) * 100).toFixed(1) : 0;

  // Current month new employees
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newEmployees = employees.filter((employee) => {
    const joiningDate = new Date(employee.joiningDate);

    return joiningDate.getMonth() === currentMonth && joiningDate.getFullYear() === currentYear;
  }).length;

  // Recent employees
  const recentEmployees = [...employees].sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate)).slice(0, 4);

  // Department overview
  const departmentMap = {};

  employees.forEach((employee) => {
    if (departmentMap[employee.department]) {
      departmentMap[employee.department]++;
    } else {
      departmentMap[employee.department] = 1;
    }
  });

  const departments = Object.entries(departmentMap).map(([name, employees]) => ({
    name,
    employees,
  }));

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

        <p className="mt-1 text-slate-500">Overview of your employee management system.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Employees */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">Total Employees</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{totalEmployees}</h2>

          <p className="text-sm text-green-600 mt-2">All employees</p>
        </div>

        {/* Active Employees */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">Active Employees</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{loading ? '...' : activeEmployees}</h2>

          <p className="text-sm text-green-600 mt-2">{activePercentage}% active</p>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">Departments</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{loading ? '...' : totalDepartments}</h2>

          <p className="text-sm text-slate-500 mt-2">Company departments</p>
        </div>

        {/* New Employees */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">New Employees</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{loading ? '...' : newEmployees}</h2>

          <p className="text-sm text-blue-600 mt-2">This month</p>
        </div>
      </div>

      {/* Recent Employees + Department Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Employees */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm">
          {/* Section Header */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Employees</h2>

            <p className="text-sm text-slate-500 mt-1">Recently added employees.</p>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Name</th>

                  <th className="text-left p-4 text-sm font-medium text-slate-500">Department</th>

                  <th className="text-left p-4 text-sm font-medium text-slate-500">Position</th>

                  <th className="text-left p-4 text-sm font-medium text-slate-500">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentEmployees.map((employee) => (
                  <tr key={employee._id} className="border-t border-slate-100">
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{employee.name}</p>
                    </td>

                    <td className="p-4 text-slate-600">{employee.department}</td>

                    <td className="p-4 text-slate-600">{employee.position}</td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{employee.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Section Header */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Department Overview</h2>

            <p className="text-sm text-slate-500 mt-1">Employees by department.</p>
          </div>

          {/* Department List */}
          <div className="p-6 space-y-5">
            {departments.map((department) => (
              <div key={department.name}>
                {/* Department Name + Count */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{department.name}</span>

                  <span className="text-sm text-slate-500">{department.employees}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${totalEmployees > 0 ? (department.employees / totalEmployees) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
