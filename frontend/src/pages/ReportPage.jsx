import { useState, useEffect } from 'react';
import attendanceRepository from '../repositories/attendanceRepository';

export default function ReportPage() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = filters;
      const data = await attendanceRepository.getReport({ startDate, endDate });
      setReport(data);
    } catch (error) {
      console.error('Failed to fetch report', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full pt-32 pb-12 px-6 flex flex-col items-center space-y-8 bg-[#0f172a]">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">
          ATTENDANCE <span className="text-gradient">REPORT</span>
        </h1>
        <p className="text-gray-400">Review and analyze workforce presence history.</p>
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {/* Filters */}
        <div className="glass p-6 rounded-3xl flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase ml-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase ml-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={fetchReport}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            FILTER
          </button>
        </div>

        {/* Report Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4 text-center">In</th>
                  <th className="px-6 py-4 text-center">Out</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-2 w-48 bg-white/10 rounded-full mb-2"></div>
                        <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                ) : report.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">
                      No report data available for the selected range.
                    </td>
                  </tr>
                ) : (
                  report.map((item, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-mono text-sm">
                        {item.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-500 text-xs">ID: {item.employee_id}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-emerald-400 font-mono">
                        {item.check_in || '--:--'}
                      </td>
                      <td className="px-6 py-4 text-center text-rose-400 font-mono">
                        {item.check_out || '--:--'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'On Time' ? 'bg-emerald-500/20 text-emerald-400' :
                          item.status === 'Late' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
