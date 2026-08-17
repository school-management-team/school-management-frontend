import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminOverview from '../../components/AdminOverview'; // 👈 استدعاء ملف الإشراف والإحصائيات الجديد
import AdminRegistrations from '../../components/AdminRegistrations';
import AdminApprovals from '../../components/AdminApprovals';
import AdminLogs from '../../components/AdminLogs';

const AdminDashboard = () => {
  // المتغير الذي يعرف أي تبويب مفتوح حالياً (الافتراضي هو الإشراف والإحصائيات)
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div style={{ display: 'flex', direction: 'rtl', height: '100vh', backgroundColor: '#f5f2eb' }}>
      
      {/* عرض القائمة الجانبية للمدير */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* منطقة عرض المحتوى المتغير على يسار السايدبار */}
      <div style={{ flex: 1, padding: '45px', overflowY: 'auto' }}>
        
        {/* 1. إذا كان التبويب هو dashboard، اعرض ملف الإشراف والتحكم السحري بقفل النظام */}
        {currentTab === 'dashboard' && <AdminOverview />}

        {/* 2. بقية الأقسام التي بنيناها سابقاً */}
        {currentTab === 'registrations' && <AdminRegistrations />}
        {currentTab === 'approvals' && <AdminApprovals />}
        {currentTab === 'logs' && <AdminLogs />}

      </div>
    </div>
  );
};

export default AdminDashboard;
