// 1. قاعدة بيانات تجريبية تحتوي على السجلات والإشعارات المالية المختلفة لكل طالب بناءً على الـ ID
const studentsFinanceData = {
  "1": {
    total: '2,000 $',
    paid: '1,200 $',
    remaining: '800 $',
    status: 'متبقي دفعات',
    statusColor: '#e65100',
    statusBg: '#fff3e0',
    notifications: [
      { id: 1, text: '⚠️ تنبيه مالي: يرجى العلم أن الدفعة القادمة البالغة 400 $ مستحقة في نهاية الأسبوع الحالي.' },
      { id: 2, text: '✅ إشعار: تم استلام مبلغ 1,200 $ دفعة أولى من القسط السنوي وتفعيل السجل الامتحاني.' }
    ]
  },
  "2": {
    total: '2,000 $',
    paid: '2,000 $',
    remaining: '0 $',
    status: 'خالص ومسدد بالكامل',
    statusColor: '#2e7d32',
    statusBg: '#e8f5e9',
    notifications: [
      { id: 1, text: '✨ شكر وتقدير: نشكركم على المسارعة لتسديد الرسوم المدرسية بالكامل لهذا العام.' }
    ]
  }
};

// سجل مالي افتراضي في حال تم تسجيل ID جديد غير المعرفين أعلاه
const defaultFinance = {
  total: '2,000 $',
  paid: '0 $',
  remaining: '2,000 $',
  status: 'قيد الدفع',
  statusColor: '#c62828',
  statusBg: '#ffebee',
  notifications: [
    { id: 1, text: 'ℹ️ إشعار إداري: يرجى مراجعة محاسب المدرسة لتسوية القسط الدراسي وتفعيل ملف الطالب برمجياً.' }
  ]
};

const ParentFinance = ({ student }) => {
  // جلب البيانات المالية والإشعارات الخاصة بالابن الحالي المختار بناءً على معرفه
  const finance = studentsFinanceData[student?.id] || defaultFinance;
  return (
    <div>
      {/* 💳 كشف الرسوم والمستحقات الدراسية للابن */}
      <h2 style={{ color: '#14301d', marginBottom: '20px' }}>💵 كشف الرسوم والمستحقات الدراسية للابن</h2>
      
      <div style={{ display: 'flex', gap: '20px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', color: '#555' }}>إجمالي القسط السنوي: <b>{finance.total}</b></p>
          <p style={{ margin: '0 0 8px 0', color: '#2e7d32' }}>المبلغ المدفوع المسدد: <b>{finance.paid}</b></p>
          <p style={{ margin: 0, color: '#c62828' }}>المبلغ المتبقي المستحق: <b>{finance.remaining}</b></p>
        </div>
        <span style={{ padding: '6px 15px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', backgroundColor: finance.statusBg, color: finance.statusColor }}>
          {finance.status}
        </span>
      </div>

      {/* 🔔 صندوق الإشعارات والتنبيهات الإدارية والمالية بديل الشات */}
      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>🔔 التنبيهات والإشعارات المالية الواردة</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>آخر التعميمات والإشعارات الرسمية الصادرة من القسم المالي بالمدرسة:</p>
      
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {finance.notifications.map(notif => (
            <div 
              key={notif.id} 
              style={{ 
                padding: '15px 20px', 
                backgroundColor: '#fdfbf7', 
                borderRadius: '8px', 
                fontSize: '14px', 
                color: '#333', 
                lineHeight: '1.6',
                borderRight: `4px solid ${finance.statusColor}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}
            >
              {notif.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentFinance;
