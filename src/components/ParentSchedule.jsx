import { useState } from 'react';

const ParentSchedule = () => {
  
  const [weeklySchedule] = useState([
    { day: 'الأحد', h1: 'الرياضيات', h2: 'الفيزياء', h3: 'اللغة العربية', h4: 'العلوم العام', h5: 'التاريخ' },
    { day: 'الإثنين', h1: 'الكيمياء', h2: 'الرياضيات', h3: 'اللغة الإنكليزية', h4: 'التربية الرياضية', h5: 'الجغرافيا' },
    { day: 'الثلاثاء', h1: 'اللغة العربية', h2: 'الفيزياء', h3: 'الرياضيات', h4: 'العلوم العام', h5: 'التربية الدينية' },
    { day: 'الأربعاء', h1: 'اللغة الإنكليزية', h2: 'الكيمياء', h3: 'اللغة العربية', h4: 'التاريخ', h5: 'العلوم العام' },
    { day: 'الخميس', h1: 'الفيزياء', h2: 'الرياضيات', h3: 'اللغة الإنكليزية', h4: 'الجغرافيا', h5: 'التربية الوطنية' },
  ]);

  
  const [examSchedule] = useState([
    { id: 1, subject: 'اللغة العربية', date: '2026-06-01', time: '09:00 صباحاً', room: 'القاعة رقم 3' },
    { id: 2, subject: 'الرياضيات', date: '2026-06-03', time: '09:00 صباحاً', room: 'القاعة رقم 3' },
    { id: 3, subject: 'الفيزياء', date: '2026-06-07', time: '09:00 صباحاً', room: 'مدرج المدرسة العلوي' },
    { id: 4, subject: 'الكيمياء', date: '2026-06-10', time: '09:00 صباحاً', room: 'القاعة رقم 1' },
  ]);

  return (
    <div>
      {/* 📚 القسم الأول: برنامج الحصص الأسبوعي */}
      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>🗓️ برنامج الحصص الأسبوعي للطالب</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>توزيع المواد الدراسية على الحصص اليومية خلال الأسبوع الحالي:</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '45px' }}>
        <thead>
          <tr style={{ backgroundColor: '#14301d', color: 'white', textAlign: 'right' }}>
            <th style={{ padding: '12px 15px' }}>اليوم</th>
            <th style={{ padding: '12px 15px' }}>الحصة الأولى</th>
            <th style={{ padding: '12px 15px' }}>الحصة الثانية</th>
            <th style={{ padding: '12px 15px' }}>الحصة الثالث</th>
            <th style={{ padding: '12px 15px' }}>الحصة الرابعة</th>
            <th style={{ padding: '12px 15px' }}>الحصة الخامسة</th>
          </tr>
        </thead>
        <tbody>
          {weeklySchedule.map((row, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fdfbf7' : 'white' }}>
              <td style={{ padding: '14px 15px', fontWeight: 'bold', color: '#14301d' }}>{row.day}</td>
              <td style={{ padding: '14px 15px', color: '#333' }}>{row.h1}</td>
              <td style={{ padding: '14px 15px', color: '#333' }}>{row.h2}</td>
              <td style={{ padding: '14px 15px', color: '#333' }}>{row.h3}</td>
              <td style={{ padding: '14px 15px', color: '#333' }}>{row.h4}</td>
              <td style={{ padding: '14px 15px', color: '#333' }}>{row.h5}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📝 القسم الثاني: برنامج الامتحان النهائي */}
      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>📋 برنامج الامتحانات النهائية المعتمد</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>مواعيد وأماكن الاختبارات الرسمية للفصل الدراسي الحالي:</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <thead>
          <tr style={{ backgroundColor: '#234e32', color: 'white', textAlign: 'right' }}>
            <th style={{ padding: '12px 15px' }}>المادة الامتحان</th>
            <th style={{ padding: '12px 15px' }}>تاريخ الاختبار</th>
            <th style={{ padding: '12px 15px' }}>التوقيت</th>
            <th style={{ padding: '12px 15px', textAlign: 'center' }}>قاعة الامتحان</th>
          </tr>
        </thead>
        <tbody>
          {examSchedule.map((exam, idx) => (
            <tr key={exam.id} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? '#fdfbf7' : 'white' }}>
              <td style={{ padding: '14px 15px', fontWeight: 'bold', color: '#333' }}>{exam.subject}</td>
              <td style={{ padding: '14px 15px', color: '#851c1c', fontWeight: 'bold' }}>{exam.date}</td>
              <td style={{ padding: '14px 15px', color: '#555' }}>{exam.time}</td>
              <td style={{ padding: '14px 15px', textAlign: 'center', color: '#666', fontWeight: '500' }}>{exam.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentSchedule;
