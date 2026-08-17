const AdminLogs = () => {
  // جلب اسم ولي الأمر الذي قدم الطلب في الاستمارة السابقة لجعل البيانات حية وحقيقية
  const pendingData = localStorage.getItem('pendingParentRequest');
  const parentName = pendingData ? JSON.parse(pendingData).parentName : 'يوسف الحامد';

  const logs = [
    { id: 1, user: 'الموجه العام', action: 'تعديل حالة غياب المعلم حازم المنصور', time: 'اليوم - 10:15 صباحاً', type: 'تعديل حضور' },
    { id: 2, user: 'المحاسب المالي', action: 'تثبيت دفعة قسط الطالب أحمد محمود العلي بقيمة 300$', time: 'اليوم - 09:30 صباحاً', type: 'إجراء مالي' },
    { id: 3, user: 'نظام التسجيل', action: `استقبال طلب إنشاء حساب معلق لولي الأمر (${parentName})`, time: 'منذ قليل', type: 'إدخال بيانات' },
    { id: 4, user: 'نظام الأمان الإلكتروني', action: 'محاولة دخول فاشلة لحساب المدير من عنوان IP غير معروف', time: 'أمس - 11:12 ليلاً', type: 'تنبيه أمان' }
  ];

  return (
    <div style={{ backgroundColor: '#F8F6E3', padding: '25px', borderRadius: '12px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#3A4D39', marginBottom: '10px', fontWeight: 'bold' }}>📋 سجلات النظام ومراقبة التعديلات (Audit Logs)</h2>
      <p style={{ color: '#4F6F52', marginBottom: '25px', fontSize: '15px' }}>تقرير الشفافية المركزي لمراقبة العمليات الحية :</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {logs.map(log => (
          <div key={log.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: '#FEFAF6', 
            padding: '18px 25px', 
            borderRadius: '10px', 
            borderRight: log.type.includes('أمان') ? '6px solid #c62828' : '6px solid #3A4D39', 
            boxShadow: '0 4px 12px rgba(58,77,57,0.04)',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 'bold', 
                color: log.type.includes('أمان') ? '#c62828' : '#3A4D39', 
                backgroundColor: log.type.includes('أمان') ? '#ffebee' : '#ECE5C7', 
                padding: '5px 12px', 
                borderRadius: '50px', 
                marginLeft: '15px',
                display: 'inline-block'
              }}>{log.type}</span>
              <b style={{ color: '#3A4D39', fontSize: '15px' }}>{log.user}: </b>
              <span style={{ color: '#4F6F52', fontSize: '15px' }}>{log.action}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLogs;
