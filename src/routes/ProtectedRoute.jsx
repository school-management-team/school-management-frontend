import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  // جلب صلاحية المستخدم الحالي المخزنة في المتصفح
  const userRole = localStorage.getItem('role');

  // إذا لم يكن هناك أي مستخدم مسجل دخول، أعده لصفحة الـ Login
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // إذا كانت صلاحية المستخدم غير موجودة ضمن الصلاحيات المسموح لها، اطرديه
  if (!allowedRoles.includes(userRole)) {
    return <div style={{ padding: '50px', textAlign: 'center', direction: 'rtl' }}>🛑 عذراً، لا تملك الصلاحية لدخول هذه الصفحة!</div>;
  }

  // إذا كل شيء تمام، اسمح له بدخول الصفحة
  return children;
};

export default ProtectedRoute;
