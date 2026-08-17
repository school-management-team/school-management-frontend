import { useState } from 'react';

const AdminOverview = () => {
  
  const [isSystemOpen, setIsSystemOpen] = useState(true);

  
  const stats = {
    totalStudents: 145,
    totalTeachers: 12,
    totalParents: 98
  };

  return (
    <div>
      <h2 style={{ color: '#14301d', marginBottom: '10px' }}>📊 الإشراف العام ومراجعة الإحصائيات</h2>
      <p style={{ color: '#555', marginBottom: '25px' }}>التحكم المركزي في المنظومة ومتابعة التقارير الدورية للمدرسة:</p>

      {/* 🔐 لوحة التحكم بقفل وفتح النظام */}
      <div style={{ 
        backgroundColor: 'white', padding: '25px', borderRadius: '12px', marginBottom: '35px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)', 
        borderRight: isSystemOpen ? '6px solid #2e7d32' : '6px solid #c62828', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>🎛️ بوابة قفل وفتح النظام المركزي</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            الحالة الحالية: 
            <b style={{ color: isSystemOpen ? '#2e7d32' : '#c62828', marginRight: '5px' }}>
              {isSystemOpen ? '🔓 النظام مفتوح للطلاب وأولياء الأمور' : '🔒 النظام مغلق بالكامل بقرار إداري'}
            </b>
          </p>
        </div>
        
        {/* عند الضغط على هذا الزر، تتغير الحالة تلقائياً لعكس ما كانت عليه */}
        <button 
          onClick={() => setIsSystemOpen(!isSystemOpen)}
          style={{
            padding: '12px 20px', 
            backgroundColor: isSystemOpen ? '#851c1c' : '#2e7d32', 
            color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          {isSystemOpen ? '🔒 إغلاق وقفل النظام فوراً' : '🔓 تفعيل وفتح النظام للجميع'}
        </button>
      </div>

      {/* 📊 بطاقات الإحصائيات والتقارير */}
      <h3 style={{ color: '#14301d', marginBottom: '15px' }}>📈 التقارير العددية للمنظومة</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', flex: 1, borderTop: '4px solid #14301d', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>عدد الطلاب الإجمالي</h4>
          <h2 style={{ color: '#14301d', margin: 0 }}>{stats.totalStudents} طالب</h2>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', flex: 1, borderTop: '4px solid #14301d', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>عدد المعلمين الحاليين</h4>
          <h2 style={{ color: '#14301d', margin: 0 }}>{stats.totalTeachers} معلم</h2>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', flex: 1, borderTop: '4px solid #14301d', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>أولياء الأمور المسجلين</h4>
          <h2 style={{ color: '#14301d', margin: 0 }}>{stats.totalParents} مستخدم</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
