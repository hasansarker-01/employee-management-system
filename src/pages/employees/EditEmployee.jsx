import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department: 'Human Resources',
    position: '',
    salary: '',
    joiningDate: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  // Get employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch employee');
        }

        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          department: data.department,
          position: data.position,
          salary: data.salary,
          joiningDate: data.joiningDate ? data.joiningDate.split('T')[0] : '',
          status: data.status,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Live validation
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    }

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Enter a valid email address';
      }
    }

    if (name === 'phone' && !value.trim()) {
      error = 'Phone number is required';
    }

    if (name === 'address' && !value.trim()) {
      error = 'Address is required';
    }

    if (name === 'department' && !value.trim()) {
      error = 'Department is required';
    }

    if (name === 'position' && !value.trim()) {
      error = 'Position is required';
    }

    if (name === 'salary') {
      if (!value) {
        error = 'Salary is required';
      } else if (Number(value) <= 0) {
        error = 'Salary must be greater than 0';
      }
    }

    if (name === 'joiningDate' && !value) {
      error = 'Joining date is required';
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Live error
    validateField(name, value);
  };

  // Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    Object.keys(formData).forEach((field) => {
      if (field !== 'status') {
        const error = validateField(field, formData[field]);

        if (error) {
          hasError = true;
        }
      }
    });

    if (hasError) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Update failed');
      }

      toast.success('Employee updated successfully');

      navigate('/employees');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading employee...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Edit Employee</h1>

        <p className="mt-1 text-sm text-slate-500">Update employee information</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter employee name" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>

            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>

            <input name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>

            <input name="department" value={formData.department} onChange={handleChange} placeholder="Enter department" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.department ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>

            <input name="position" value={formData.position} onChange={handleChange} placeholder="Enter position" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.position ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Salary</label>

            <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Enter salary" className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.salary ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.salary && <p className="mt-1 text-xs text-red-500">{errors.salary}</p>}
          </div>

          {/* Joining Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Joining Date</label>

            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.joiningDate ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`} />

            {errors.joiningDate && <p className="mt-1 text-xs text-red-500">{errors.joiningDate}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>

            <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex gap-3 border-t border-slate-200 pt-6">
          <button type="button" onClick={() => navigate('/employees')} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>

          <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
