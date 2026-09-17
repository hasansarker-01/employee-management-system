function Departments() {
  const departments = [
    {
      id: 1,
      name: 'Human Resources',
      manager: 'John Doe',
      employees: 12,
      status: 'Active',
    },
    {
      id: 2,
      name: 'IT',
      manager: 'Alex Smith',
      employees: 25,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Finance',
      manager: 'David',
      employees: 8,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Marketing',
      manager: 'Sarah',
      employees: 10,
      status: 'Inactive',
    },
  ];

  const totalEmployees = departments.reduce((total, department) => total + department.employees, 0);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Departments</h1>

        <p className="mt-1 text-slate-500">Manage and monitor company departments.</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Total Departments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">Total Departments</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{departments.length}</h2>
        </div>

        {/* Total Employees */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">Total Employees</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">{totalEmployees}</h2>
        </div>
      </div>

      {/* Department List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {departments.map((department) => (
          <div key={department.id} className="bg-white rounded-xl shadow-sm p-6">
            {/* Department Name */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-800">{department.name}</h2>

              <span className={`px-3 py-1 rounded-full text-sm ${department.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{department.status}</span>
            </div>

            {/* Department Information */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Manager</span>

                <span className="font-medium text-slate-800">{department.manager}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Employees</span>

                <span className="font-medium text-slate-800">{department.employees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departments;
