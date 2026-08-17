import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import RegisterParent from "./pages/parent/RegisterParent.jsx";




function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية: تسجيل الدخول */}
        <Route path="/" element={<Login />} />

        {/* صفحة إنشاء الحساب لولي الأمر: محمية بحيث يدخلها فقط من يحمل دور parent */}
        <Route path="/register-parent" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <RegisterParent />
          </ProtectedRoute>
        } />

        {/* طريق المدير: مسموح فقط للـ admin */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* طريق لوحة بيانات ولي الأمر بعد الموافقة: مسموح فقط للـ parent */}
        <Route path="/parent" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <ParentDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
