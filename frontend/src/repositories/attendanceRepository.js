import api from '../services/api';

const attendanceRepository = {
  getEmployees: async () => {
    const response = await api.get('/attendance/employees');
    return response.data;
  },

  recordAttendance: async (data) => {
    const response = await api.post('/attendance', data);
    return response.data;
  },

  getReport: async (filters = {}) => {
    const response = await api.get('/attendance/report', {
      params: filters
    });
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/attendance/summary');
    return response.data;
  }
};

export default attendanceRepository;
