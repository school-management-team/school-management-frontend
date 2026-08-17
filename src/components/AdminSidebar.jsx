const AdminSidebar = ({ currentTab, setCurrentTab }) => {
  // تنظيف الأيقونات وتحديث المسميات
  const menuItems = [
    { id: 'dashboard', name: '📊 نظرة عامة والنظام' },
    { id: 'registrations', name: '👥 طلبات المستخدمين' },
    { id: 'approvals', name: '✔️ العلامات والجداول' },
    { id: 'logs', name: '📋 سجل التعديلات' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ 
      width: '260px', 
      height: '100vh', 
      backgroundColor: '#3A4D39', // اللون الزيتي الأساسي المعتمد للمدرسة
      color: '#FEFAF6', 
      padding: '25px 15px', 
      boxSizing: 'border-box', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      boxShadow: '0 4px 15px rgba(58,77,57,0.15)' 
    }}>
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '35px', color: '#FEFAF6', fontSize: '20px', fontWeight: 'bold' }}>👑 لوحة المدير العام</h3>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li 
              key={item.id} 
              onClick={() => setCurrentTab(item.id)} 
              style={{ 
                padding: '14px 18px', 
                marginBottom: '10px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '15px', 
                fontWeight: '600',
                // تباين الألوان في حالة التحديد الفعال (Active State) بالثيم الزيتي والبيج
                backgroundColor: currentTab === item.id ? '#4F6F52' : 'transparent', 
                color: currentTab === item.id ? '#FEFAF6' : '#ECE5C7', 
                transition: 'all 0.2s ease-in-out' 
              }}
              onMouseOver={(e) => { if(currentTab !== item.id) e.target.style.color = '#FEFAF6'; }}
              onMouseOut={(e) => { if(currentTab !== item.id) e.target.style.color = '#ECE5C7'; }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: '#A94442', // لون أحمر متناسق مع الثيم الزيتي لتسجيل الخروج
          color: '#FEFAF6', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#851c1c'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#A94442'}
      >
        🚪 تسجيل الخروج
      </button>
    </div>
  );
};

export default AdminSidebar;
