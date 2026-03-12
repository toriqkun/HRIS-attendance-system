export default function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'attendance', label: 'Attendance Portal', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'report', label: 'Attendance Report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-2xl flex items-center gap-2">
      <div className="flex items-center gap-8 mr-4 px-4 border-r border-white/10">
        <span className="text-white font-black tracking-tighter text-xl">HRIS<span className="text-indigo-400">.</span></span>
      </div>
      
      <div className="flex gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              currentPage === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
