
import { useState } from 'react';

const ParentAnnouncements = () => {
  
  const [announcements] = useState([
    {
      id: 1,
      title: '🚨 تعميم بخصوص عطلة عيد الأضحى المبارك',
      date: '2026-05-28',
      details: 'تعلن إدارة المدرسة عن تعطيل الدوام الرسمي للطلاب والهيئة التدريسية بمناسبة عيد الأضحى المبارك، وذلك ابتداءً من صباح الأحد القادم على أن يستأنف الدوام الفعلي بعد أسبوع بالتمام.'
    },
    {
      id: 2,
      title: '📸 موعد التقاط الصورة الجماعية السنوية للطلاب',
      date: '2026-05-25',
      details: 'يرجى العلم أنه تقرر التقاط الصورة التذكارية السنوية لطلاب المرحلة الثانوية يوم الثلاثاء القادم، نؤكد على ضرورة التزام أبنائنا بالزي المدرسي الرسمي الكامل والموحد.'
    },
    {
      id: 3,
      title: '🩺 حملة اللقاح المدرسي السنوية ضد النكاف والجدري',
      date: '2026-05-20',
      details: 'بالتعاون مع وزارة الصحة، ستقوم البعثة الطبية بزيارة المدرسة يوم الخميس لتطعيم طلاب الصف العاشر. يرجى من السادة أولياء الأمور الذين لديهم أي تحفظات طبية إبلاغ المشرف الصحي فوراً.'
    }
  ]);

  return (
    <div>
      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>📢 الإعلانات والتعاميم الرسمية للمدرسة</h2>
      <p style={{ color: '#555', marginBottom: '25px' }}>تابع آخر القرارات والنشاطات الصادرة عن إدارة المدرسة بشكل مركزي وفوري:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {announcements.map(ann => (
          <div key={ann.id} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
            borderRight: '6px solid #14301d', 
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, color: '#14301d', fontSize: '17px', fontWeight: 'bold' }}>{ann.title}</h4>
            </div>
            
            <p style={{ margin: '5px 0', color: '#4a4a4a', fontSize: '15px', lineHeight: '1.6' }}>{ann.details}</p>
            <div style={{ fontSize: '13px', color: '#888', textAlign: 'left' }}>📅 تاريخ النشر: {ann.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentAnnouncements;
