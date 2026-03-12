import { useState } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceTable from '../components/AttendanceTable';

export default function AttendancePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAttendanceSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-32 pb-12 px-6 space-y-12 bg-[#0f172a]">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black text-white tracking-tight">
          ATTENDANCE <span className="text-gradient">PORTAL</span>
        </h1>
        <p className="text-gray-400 text-lg">Log your daily presence with ease.</p>
      </div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex justify-center">
          <AttendanceForm onSuccess={handleAttendanceSuccess} />
        </div>

        <div className="lg:col-span-8">
          <AttendanceTable refreshTrigger={refreshTrigger} />
        </div>
      </div>
      
      <p className="text-gray-500 text-sm">
        &copy; 2024 HRIS Attendance System. Professional Presence Monitoring.
      </p>
    </div>
  );
};

