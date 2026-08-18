// 1. قاعدة بيانات تجريبية تحتوي على سجلات الحضور والتنبيهات المختلفة لكل طالب بناءً على الـ ID
const studentsAttendanceData = {
  "1": {
    stats: { absent: 3, late: 2, earlyLeave: 1 },
    alerts: [
      { id: 1, title: '⚠️ تنبيه تأخر عن الحصة الأولى', date: '2026-05-18', details: 'تأخر الطالب عن طابور الصباح والحصة الأولى لمدة 20 دقيقة.' },
      { id: 2, title: '🚫 ملاحظة سلوكية - شغب', date: '2026-05-12', details: 'الرجاء توجيه الطالب بعدم التحدث الجانبي أثناء حصة الفيزياء.' }
    ]
  },
  "2": {
    stats: { absent: 0, late: 1, earlyLeave: 0 },
    alerts: [
      { id: 1, title: '⏳ إشعار تأخير طفيف', date: '2026-05-20', details: 'تأخر الطالب عن طابور الصباح لمدة 5 دقائق وتم توجيهه التزاماً بالوقت.' }
    ]
  }
};

// سجل حضور افتراضي في حال تم تسجيل ID جديد غير المعرفين أعلاه
const defaultAttendance = {
  stats: { absent: 0, late: 0, earlyLeave: 0 },
  alerts: [
    { id: 1, title: '✨ تقرير انضباط مثالي', date: '2026-05-25', details: 'يسر الإدارة الإشادة بانضباط الطالب الكامل وحضوره المتميز لجميع الحصص.' }
  ]
};

const ParentAttendance = ({ student }) => {
  // جلب سجل الحضور والتنبيهات المخصص للابن المختار حالياً
  const studentData = studentsAttendanceData[student?.id] || defaultAttendance;
  const stats = studentData.stats;
  const alerts = studentData.alerts;
  return (
    <div>
      <h2 style={{ color: '#14301d', marginBottom: '20px' }}>🗓️ سجل الحضور والغياب والانضباط للابن</h2>
      
      {/* بطاقات الإحصائيات الدقيقة للمظهر الاحترافي والتحديث التلقائي */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '35px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '8px', flex: 1, minWidth: '150px', borderRight: '5px solid #c62828' }}>
          <h4 style={{ color: '#c62828', margin: '0 0 5px 0', fontSize: '14px' }}>🛑 أيام الغياب الكلي</h4>
          <h2 style={{ color: '#c62828', margin: 0, fontSize: '24px' }}>{stats.absent} أيام</h2>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px', flex: 1, minWidth: '150px', borderRight: '5px solid #e65100' }}>
          <h4 style={{ color: '#e65100', margin: '0 0 5px 0', fontSize: '14px' }}>⏳ مرات التأخير</h4>
          <h2 style={{ color: '#e65100', margin: 0, fontSize: '24px' }}>{stats.late} مرات</h2>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', flex: 1, minWidth: '150px', borderRight: '5px solid #2e7d32' }}>
          <h4 style={{ color: '#2e7d32', margin: '0 0 5px 0', fontSize: '14px' }}>✅ خروج مبكر مبرر</h4>
          <h2 style={{ color: '#2e7d32', margin: 0, fontSize: '24px' }}>{stats.earlyLeave} مرة</h2>
        </div>
      </div>

      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>🔔 التنبيهات السلوكية والإدارية المستقبلة</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)', 
              borderRight: alert.title.includes('تنبيه') || alert.title.includes('ملاحظة') ? '5px solid #c62828' : '5px solid #2e7d32' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
              <h4 style={{ margin: 0, color: alert.title.includes('تنبيه') || alert.title.includes('ملاحظة') ? '#c62828' : '#2e7d32', fontSize: '16px', fontWeight: 'bold' }}>
                {alert.title}
              </h4>
              <span style={{ fontSize: '12px', color: '#777' }}>📅 {alert.date}</span>
            </div>
            <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.5' }}>{alert.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentAttendance;
