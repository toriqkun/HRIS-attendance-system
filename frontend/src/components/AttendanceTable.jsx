import { useState, useEffect } from 'react';
import attendanceRepository from '../repositories/attendanceRepository';

export default function AttendanceTable({ refreshTrigger }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayLogs();
  }, [refreshTrigger]);

  const fetchTodayLogs = async () => {
    try {
      setLoading(true);
      const data = await attendanceRepository.getReport();
      const today = new Date().toISOString().split('T')[0];
      const todayLogs = data.filter(log => log.date === today);
      setLogs(todayLogs);
    } catch (error) {
      console.error('Failed to fetch attendance logs', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl overflow-hidden w-full max-w-4xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Today's Presence</h3>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full">
          {logs.length} EMPLOYEES
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500 italic">
                  No attendance records found for today.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{log.name}</div>
                    <div className="text-gray-500 text-xs">ID: {log.employee_id}</div>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-mono">
                    {log.check_in || '--:--'}
                  </td>
                  <td className="px-6 py-4 text-rose-400 font-mono">
                    {log.check_out || '--:--'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      log.status === 'On Time' ? 'bg-emerald-500/20 text-emerald-400' :
                      log.status === 'Late' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
