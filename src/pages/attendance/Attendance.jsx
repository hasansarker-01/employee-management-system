import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch employees');
        }

        setEmployees(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (!formData.employeeId) {
  //       toast.error('Please select an employee');
  //       return;
  //     }

  //     console.log(formData);

  //     toast.success('Attendance ready to save');
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employeeId) {
      toast.error('Please select an employee');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to save attendance');
      }

      toast.success('Attendance saved successfully');

      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>

        <p className="mt-1 text-slate-500">Manage employee daily attendance.</p>
      </div>

      {/* Attendance Form */}
      <div className="max-w-2xl rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Employee</label>

            <select name="employeeId" value={formData.employeeId} onChange={handleChange} disabled={loading} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500">
              <option value="">
                {' '}
                <Loader text="Loading attendance..." />
              </option>

              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} - {employee.position}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Date</label>

            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500" />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Attendance Status</label>

            <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500">
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
            Save Attendance
          </button>
        </form>
      </div>
    </div>
  );
}

export default Attendance;
