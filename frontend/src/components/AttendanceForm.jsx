import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AttendanceForm({ onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/attendance/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  const handleAttendance = async (type) => {
    if (!selectedEmployee) {
      setMessage({ type: 'error', text: 'Please select an employee first!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/attendance', {
        employee_id: selectedEmployee,
        type: type
      });
      setMessage({ 
        type: 'success', 
        text: `Successfully checked ${type === 'IN' ? 'IN' : 'OUT'} at ${response.data.formatted_time}` 
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Something went wrong';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl w-full max-w-md space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-white mb-2">Record Attendance</h2>
        <p className="text-gray-400 text-sm">Select your name and record your daily shift.</p>
      </div>

      <div className="space-y-2">
        <label className="text-gray-300 text-sm font-medium ml-1">Employee Name</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
        >
          <option value="">Select Employee...</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.position}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAttendance('IN')}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          CHECK IN
        </button>
        <button
          onClick={() => handleAttendance('OUT')}
          disabled={loading}
          className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-rose-500/20"
        >
          CHECK OUT
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

