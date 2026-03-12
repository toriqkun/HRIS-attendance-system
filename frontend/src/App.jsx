import { useState } from 'react'
import './App.css'
import AttendancePage from './pages/AttendancePage'

export default function App() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <AttendancePage />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="glass p-12 rounded-[2.5rem] max-w-2xl w-full text-center space-y-8">
        <div className="inline-block p-4 rounded-2xl bg-indigo-500/10 mb-2">
          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-black text-white leading-tight">
          HRIS <span className="text-gradient">SYSTEM</span>
        </h1>
        
        <p className="text-gray-400 text-xl max-w-md mx-auto leading-relaxed">
          The next generation of workforce management. Precise, digital, and beautiful.
        </p>
        
        <div className="pt-8">
          <button 
            onClick={() => setStarted(true)}
            className="group relative bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-2xl shadow-indigo-600/40"
          >
            GET STARTED
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
        
        <div className="pt-4 flex justify-center gap-8 text-gray-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Real-time Sync
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Cloud Based
          </div>
        </div>
      </div>
    </div>
  )
}

