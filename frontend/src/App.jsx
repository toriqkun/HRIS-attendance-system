import { useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import './App.css'
import AttendancePage from './pages/AttendancePage'
import ReportPage from './pages/ReportPage'
import DashboardPage from './pages/DashboardPage'
import Navbar from './components/Navbar'

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState('attendance');

  if (!started) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="glass p-12 rounded-[2.5rem] max-w-2xl w-full text-center space-y-8">
          <div className="inline-block p-4 rounded-2xl bg-indigo-500/10 mb-2">
            <Clock className="w-12 h-12 text-indigo-400" />
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
            <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1 w-5 h-5" />
          </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1">
        {currentPage === 'attendance' && <AttendancePage />}
        {currentPage === 'report' && <ReportPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  );
}
