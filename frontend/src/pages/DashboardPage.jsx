import { useState, useEffect } from 'react';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import api from '../services/api';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/attendance/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch summary', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { 
      label: 'TOTAL EMPLOYEES', 
      value: summary?.totalEmployee || 0, 
      color: 'indigo', 
      icon: Users 
    },
    { 
      label: 'PRESENT TODAY', 
      value: summary?.presentToday || 0, 
      color: 'emerald', 
      icon: CheckCircle 
    },
    { 
      label: 'LATE ARRIVALS', 
      value: summary?.late || 0, 
      color: 'amber', 
      icon: Clock 
    },
    { 
      label: 'INCOMPLETE LOGS', 
      value: summary?.incomplete || 0, 
      color: 'rose', 
      icon: AlertTriangle 
    },
  ];

  return (
    <div className="min-h-screen w-full pt-32 pb-12 px-6 flex flex-col items-center space-y-12 bg-[#0f172a]">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">
          SYSTEM <span className="text-gradient">DASHBOARD</span>
        </h1>
        <p className="text-gray-400">At a glance view of today's workforce performance.</p>
      </div>

      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass p-8 rounded-3xl h-40 animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass group p-8 rounded-4xl hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`text-xs font-black text-${stat.color}-500 opacity-50 tracking-widest`}>LIVE</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-white leading-none">{stat.value}</div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[2.5rem] space-y-4">
          <h3 className="text-xl font-bold text-white">Daily Efficiency</h3>
          <div className="h-48 bg-white/5 rounded-3xl flex items-end justify-between p-6 gap-2">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="w-full bg-indigo-500/20 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 w-full bg-indigo-500 rounded-lg group-hover:bg-indigo-400 transition-all duration-500" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs">Simulated data of presence throughout the week.</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Quick Insights</h3>
            <p className="text-gray-400 text-sm">Automated analysis based on current logs.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-gray-300 text-sm">Attendance rate is at <span className="text-white font-bold">{summary ? Math.round((summary.presentToday/summary.totalEmployee)*100) : 0}%</span> today.</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-gray-300 text-sm"><span className="text-white font-bold">{summary?.late}</span> employees arrived after the limit.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
