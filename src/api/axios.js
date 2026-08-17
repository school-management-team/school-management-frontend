import axios from 'axios';

const api = axios.create({
  // هنا سنعدل الرابط لاحقاً عندما يرسله رفقاؤك في الـ Backend
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// هذا الكود يمرر "التوكن" تلقائياً للسيرفر للتأكد من صلاحية المستخدم
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
