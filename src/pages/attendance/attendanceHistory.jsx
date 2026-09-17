import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../components/common/Loader';

function AttendanceHistory() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const thStyle = 'border border-slate-200 p-3 text-left text-sm font-medium text-slate-600';

  // Fetch attendance
  const fetchAttendance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance');

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch attendance');
      }

      setAttendance(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Get unique employees
  const employees = [];

  attendance.forEach((record) => {
    if (!record.employee) return;

    const exists = employees.find((employee) => employee._id === record.employee._id);

    if (!exists) {
      employees.push(record.employee);
    }
  });

  // Get last 30 days
  const getLast30Days = () => {
    const days = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      days.push(date);
    }

    return days;
  };

  // Get attendance status for specific employee/date
  const getStatus = (employeeId, date) => {
    const record = attendance.find((item) => {
      if (!item.employee) return false;

      const recordDate = new Date(item.date);
      recordDate.setHours(0, 0, 0, 0);

      return item.employee._id === employeeId && recordDate.getTime() === date.getTime();
    });

    return record?.status || '-';
  };

  // View employee attendance
  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  // Close details
  const handleClose = () => {
    setSelectedEmployee(null);
  };

  return (
    <div>
      {/* Print CSS */}
      <style>
        {`
          @page {
            size: A4;
            margin: 12mm;
          }

          @media print {
            body * {
              visibility: hidden;
            }

            .attendance-print,
            .attendance-print * {
              visibility: visible;
            }

            .attendance-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Page Header */}
      <div className="mb-6 no-print">
        <h1 className="text-2xl font-bold text-slate-800">Attendance History</h1>

        <p className="mt-1 text-slate-500">View employee attendance history.</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl bg-white p-6 text-center text-slate-500">
          <Loader text="Fetching attendance history..." />
        </div>
      )}

      {/* Employee List */}
      {!loading && !selectedEmployee && (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {employees.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No employees found.</div>
          ) : (
            <div>
              {employees.map((employee) => (
                <div key={employee._id} className="flex items-center justify-between border-b border-slate-100 p-5 last:border-b-0">
                  {/* Employee Name */}
                  <div>
                    <h2 className="font-semibold text-slate-800">{employee.name}</h2>

                    <p className="mt-1 text-sm text-slate-500">{employee.position}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleView(employee)} className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-200">
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEmployee(employee);

                        setTimeout(() => {
                          window.print();
                        }, 300);
                      }}
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Employee Monthly Details */}
      {selectedEmployee && (
        <div className="attendance-print rounded-xl bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{selectedEmployee.name}</h2>

              <p className="mt-1 text-sm text-slate-500">{selectedEmployee.position}</p>
            </div>

            <div className="no-print flex gap-2">
              <button onClick={() => navigate(`/employees/${selectedEmployee._id}`)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                Employee Details
              </button>

              <button onClick={() => window.print()} className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Print
              </button>

              <button onClick={handleClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Back
              </button>
            </div>
          </div>

          {/* Employee Information */}
          <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-5 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Employee</p>

              <p className="mt-1 font-medium text-slate-800">{selectedEmployee.name}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Department</p>

              <p className="mt-1 font-medium text-slate-800">{selectedEmployee.department}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Position</p>

              <p className="mt-1 font-medium text-slate-800">{selectedEmployee.position}</p>
            </div>
          </div>

          {/* 30 Days Attendance */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Last 30 Days Attendance</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className={thStyle}>#</th>

                    <th className={thStyle}>Date</th>

                    <th className={thStyle}>Day</th>

                    <th className={thStyle}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {getLast30Days().map((date, index) => {
                    const status = getStatus(selectedEmployee._id, date);

                    return (
                      <tr key={date.toISOString()}>
                        <td className="border border-slate-200 p-3 text-sm text-slate-600">{index + 1}</td>

                        <td className="border border-slate-200 p-3 text-sm text-slate-700">{date.toLocaleDateString()}</td>

                        <td className="border border-slate-200 p-3 text-sm text-slate-600">
                          {date.toLocaleDateString('en-US', {
                            weekday: 'long',
                          })}
                        </td>

                        <td className="border border-slate-200 p-3">{status === '-' ? <span className="text-sm text-slate-400">Not Marked</span> : <span className={`rounded-full px-3 py-1 text-xs font-medium ${status === 'Present' ? 'bg-green-100 text-green-700' : status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{status}</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceHistory;
