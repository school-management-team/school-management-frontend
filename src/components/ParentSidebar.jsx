const ParentSidebar = ({ currentTab, setCurrentTab }) => {
    const menuItems = [
      { id: 'announcements', name: '📢 إعلانات المدرسة' }, 
      { id: 'grades', name: '📝 علامات الأبناء' },
      { id: 'schedule', name: '🗓️ الجداول والبرامج' },
      { id: 'attendance', name: '⏱️ الحضور والانضباط' },
      { id: 'finance', name: '💵 الرسوم والتواصل' },
    ];
  
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = '/';
    };
  
    return (
      <div style={{
        width: '260px', height: '100vh', backgroundColor: '#14301d', color: '#fcfaf2',
        padding: '25px 15px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', boxShadow: '-3px 0 10px rgba(0,0,0,0.15)'
      }}>
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '35px', color: '#fcfaf2', fontSize: '20px', fontWeight: 'bold' }}> بوابة أولياء الأمور</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li 
                key={item.id} onClick={() => setCurrentTab(item.id)}
                style={{
                  padding: '14px 18px', marginBottom: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
                  backgroundColor: currentTab === item.id ? '#234e32' : 'transparent',
                  color: currentTab === item.id ? '#ffffff' : '#dcd1bd', transition: 'all 0.2s ease'
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogout} style={{ width: '100%', padding: '12px', backgroundColor: '#851c1c', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>تسجيل الخروج</button>
      </div>
    );
  };
  
  export default ParentSidebar;
  