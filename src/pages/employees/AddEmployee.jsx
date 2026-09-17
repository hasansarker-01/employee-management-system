import { useState } from 'react';
import { toast } from 'react-toastify';
// import Button from '../../components/commo';

function AddEmployee() {
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

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit employee data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to add employee');
      }

      toast.success('Employee added successfully!');

      // Reset form
      setFormData({
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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Add Employee</h1>

        <p className="text-slate-500 mt-1">Create a new employee profile.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm font-medium">Phone</label>

                <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 text-sm font-medium">Address</label>

                <input type="text" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Job Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium">Department</label>
                <select name="department" value={formData.department} onChange={handleChange} className="w-full border rounded-lg px-4 py-3">
                  <option>Human Resources</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block mb-2 text-sm font-medium">Position</label>

                <input type="text" name="position" placeholder="Enter position" value={formData.position} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Salary</label>
                <input type="number" name="salary" placeholder="Enter salary" value={formData.salary} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Joining Date</label>
                <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required className="w-full border rounded-lg px-4 py-3" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Status</label>

                <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded-lg px-4 py-3">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            {/* <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Employee'}
          <Button type="submit" disabled={loading}>
  {loading ? "Saving..." : "Save Employee"}
</Button> */}
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Employee'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;

// এখন **এই ফাইলটি পুরো replace করে Save করো**। তারপর Employee form submit করো। সফল হলে MongoDB-তে employee তৈরি হবে এবং toast দেখাবে।
