import { Fingerprint, FileText, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'attendance', label: 'Attendance Portal', icon: Fingerprint },
    { id: 'report', label: 'Attendance Report', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-2xl flex items-center gap-2">
      <div className="flex items-center gap-8 mr-4 px-4 border-r border-white/10">
        <span className="text-white font-black tracking-tighter text-xl">HRIS<span className="text-indigo-400">.</span></span>
      </div>
      
      <div className="flex gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentPage === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
