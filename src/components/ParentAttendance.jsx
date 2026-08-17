import { useState } from 'react';

const ParentAttendance = () => {
  
  const [stats] = useState({ absent: 3, late: 2, earlyLeave: 1 });

  
  const [alerts] = useState([
    { id: 1, title: '⚠️ تنبيه تأخر عن الحصة الأولى', date: '2026-05-18', details: 'تأخر الطالب عن طابور الصباح والحصة الأولى لمدة 20 دقيقة.' },
    { id: 2, title: '🚫 ملاحظة سلوكية - شغب', date: '2026-05-12', details: 'الرجاء توجيه الطالب بعدم التحدث الجانبي أثناء حصة الفيزياء.' }
  ]);

  return (
    <div>
      <h2 style={{ color: '#14301d', marginBottom: '20px' }}>🗓️ سجل الحضور والغياب والانضباط للابن</h2>
      
      {/* بطاقات الإحصائيات الدقيقة للمظهر الاحترافي */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
        <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '8px', flex: 1, borderRight: '5px solid #c62828' }}>
          <h4 style={{ color: '#c62828', margin: '0 0 5px 0' }}>🛑 أيام الغياب الكلي</h4>
          <h2 style={{ color: '#c62828', margin: 0 }}>{stats.absent} أيام</h2>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px', flex: 1, borderRight: '5px solid #e65100' }}>
          <h4 style={{ color: '#e65100', margin: '0 0 5px 0' }}> مرات التأخير</h4>
          <h2 style={{ color: '#e65100', margin: 0 }}>{stats.late} مرات</h2>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', flex: 1, borderRight: '5px solid #2e7d32' }}>
          <h4 style={{ color: '#2e7d32', margin: '0 0 5px 0' }}> خروج مبكر مبرر</h4>
          <h2 style={{ color: '#2e7d32', margin: 0 }}>{stats.earlyLeave} مرة</h2>
        </div>
      </div>

      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>🔔 التنبيهات السلوكية والإدارية المستقبلة</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', borderRight: '5px solid #14301d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: '#c62828' }}>{alert.title}</h4>
              <span style={{ fontSize: '12px', color: '#777' }}>{alert.date}</span>
            </div>
            <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>{alert.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentAttendance;
