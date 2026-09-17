import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
// import { NavLink } from "react-router-dom";

function Employees() {
  const [search, setSearch] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  // const [model, setModel] = useState(false);
  const navigate = useNavigate();
  // Read employees from MongoDB
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch employees');
      }

      setEmployees(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to delete employee');
      }
      toast.success('Employee deleted successfully!');
      setDeleteId(null);
      fetchEmployees();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(false);

    setTimeout(() => {
      setDeleteId(null);
    }, 300);
  };

  // Edit employee

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  // Load employees when page opens
  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div>
        <div className="mb-6 flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee List</h1>
            <p className="text-slate-500 mt-1">Manage all employees from here.</p>
          </div>

          <div className="flex justify-right md:ml-auto">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="md:w-60 border justify-right md:ml-auto flex border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500" />
          </div>
        </div>

        {/* Employee List Area */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <Loader text="Loading employees..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-250 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left p-4 whitespace-nowrap">ID</th>
                    <th className="text-left p-4 whitespace-nowrap">Name</th>
                    <th className="text-left p-4 whitespace-nowrap">Joining Date</th>
                    <th className="text-left p-4 whitespace-nowrap">Department</th>
                    <th className="text-left p-4 whitespace-nowrap">Salary</th>
                    <th className="text-left p-4 whitespace-nowrap">Status</th>
                    <th className="text-left p-4 whitespace-nowrap">Action</th>
                    <th className="text-left p-4 whitespace-nowrap">View</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      {/* ID */}
                      <td className="p-4 whitespace-nowrap text-sm text-slate-600">{employee._id}</td>

                      {/* Name */}
                      <td className="p-4 whitespace-nowrap font-medium text-slate-800">{employee.name}</td>

                      {/* Joining Date */}
                      <td className="p-4 whitespace-nowrap text-sm text-slate-600">{employee.createdAt?.slice(0, 10)}</td>

                      {/* Department */}
                      <td className="p-4 whitespace-nowrap text-sm">{employee.department}</td>

                      {/* Salary */}
                      <td className="p-4 whitespace-nowrap text-sm font-medium">{employee.salary}</td>

                      {/* Status */}
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{employee.status}</span>
                      </td>

                      {/* Action */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition" onClick={() => handleEdit(employee._id)}>
                            Edit
                          </button>

                          <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition" onClick={() => setDeleteId(employee._id)}>
                            Delete
                          </button>
                        </div>
                      </td>

                      {/* View */}
                      <td className="p-4 whitespace-nowrap">
                        <Link className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition" to={`/employees/${employee._id}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredEmployees.length === 0 && (
            <div className="p-4 text-center text-gray-700">
              <EmptyState title="No Employees Found" message="There are no employees available right now." />
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <Modal isOpen={!!deleteId} onClose={handleCancelDelete} title="Delete Employee?">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <div className="h-6 w-6 rounded-full border-2 border-red-500 flex items-center justify-center">
                <span className="text-red-500 font-bold text-sm">!</span>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-500">Are you sure you want to delete this employee? This action cannot be undone.</p>
          </div>

          <div className="flex gap-3 mt-7">
            <button type="button" onClick={handleCancelDelete} className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              Cancel
            </button>

            <button type="button" onClick={() => deleteEmployee(deleteId)} className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 active:scale-95 transition">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Employees;
