import AttendanceForm from '../components/AttendanceForm';

const AttendancePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          ATTENDANCE <span className="text-gradient">PORTAL</span>
        </h1>
        <p className="text-gray-400">Please provide your credentials to record attendance.</p>
      </div>
      
      <AttendanceForm />
      
      <p className="text-gray-500 text-xs">
        &copy; 2024 HRIS Attendance System. All rights reserved.
      </p>
    </div>
  );
};

export default AttendancePage;
