import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Employee not found');
        }

        setEmployee(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader text="Loading employee details..." />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-red-500">Employee not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Print CSS */}
      <style>
        {`
    @page {
      size: A4;
      margin: 15mm;
    }

    @media print {
      body * {
        visibility: hidden;
      }

      .print-area,
      .print-area * {
        visibility: visible;
      }

      .print-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
        background: white !important;
      }

      .no-print {
        display: none !important;
      }
    }
  `}
      </style>

      <div className="print-container p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee Details</h1>

            <p className="mt-1 text-sm text-slate-500">View employee information</p>
          </div>

          {/* Print Button */}
          <button onClick={() => window.print()} className="no-print rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            Print
          </button>
        </div>

        {/* Employee Details */}
        <div className="print-page rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Employee Header */}
          <div className="mb-6 flex items-center gap-4 border-b border-slate-200 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">{employee.name?.charAt(0).toUpperCase()}</div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">{employee.name}</h2>

              <p className="text-sm text-slate-500">{employee.position}</p>
            </div>
          </div>

          {/* Employee Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Email</p>

              <p className="mt-1 font-medium text-slate-800">{employee.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Phone</p>

              <p className="mt-1 font-medium text-slate-800">{employee.phone}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Address</p>

              <p className="mt-1 font-medium text-slate-800">{employee.address}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Department</p>

              <p className="mt-1 font-medium text-slate-800">{employee.department}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Position</p>

              <p className="mt-1 font-medium text-slate-800">{employee.position}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Salary</p>

              <p className="mt-1 font-medium text-slate-800">{employee.salary}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Joining Date</p>

              <p className="mt-1 font-medium text-slate-800">{employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : '-'}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Status</p>

              <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{employee.status}</span>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="no-print mt-7 flex gap-3 border-t border-slate-200 pt-6">
            <button onClick={() => navigate('/employees')} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Back to Employees
            </button>

            <button onClick={() => window.print()} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
              Print Employee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;
