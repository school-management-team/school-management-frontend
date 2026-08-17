import { useState } from 'react';

const AdminApprovals = () => {
  const [grades, setGrades] = useState([
    { id: 1, subject: 'الرياضيات - الصف العاشر العلمي', teacher: 'أستاذ مصطفى الأحمد', status: 'بانتظار الاعتماد' },
    { id: 2, subject: 'الفيزياء - الثاني عشر العلمي', teacher: 'أستاذ سامر العلي', status: 'بانتظار الاعتماد' },
    { id: 3, subject: 'اللغة العربية - الصف الحادي عشر', teacher: 'آنسة رشا الحمصي', status: 'بانتظار الاعتماد' }
  ]);

  const [exams, setExams] = useState([
    { id: 1, class: 'العاشر العلمي', subject: 'اللغة العربية', date: '2026-06-01', time: '09:00 صباحاً' },
    { id: 2, class: 'الثاني عشر العلمي', subject: 'الرياضيات', date: '2026-06-03', time: '09:00 صباحاً' }
  ]);

  const [newClass, setNewClass] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!newClass || !newSubject || !newDate) {
      alert('الرجاء تعبئة كافة الحقول لإنشاء جدول امتحاني!');
      return;
    }

    const newExam = { id: exams.length + 1, class: newClass, subject: newSubject, date: newDate, time: '09:00 صباحاً' };
    setExams([...exams, newExam]);
    setNewClass(''); setNewSubject(''); setNewDate('');
  };

  return (
    <div style={{ backgroundColor: '#F8F6E3', padding: '30px', borderRadius: '12px', minHeight: '100vh', direction: 'rtl', fontFamily: 'sans-serif' }}>
      
      {/* 👤 قسم مراجعة طلبات حسابات أولياء الأمور */}
      <h2 style={{ color: '#3A4D39', marginBottom: '10px', fontWeight: 'bold' }}>👤 مراجعة طلبات الحسابات الجديدة (أولياء الأمور)</h2>
      <p style={{ color: '#4F6F52', marginBottom: '20px' }}>التحقق من بيانات أولياء الأمور الجدد والموافقة على تفعيل حساباتهم:</p>

      {localStorage.getItem('parentAccountStatus') === 'قيد المراجعة' && localStorage.getItem('pendingParentRequest') ? (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #739072', marginBottom: '40px' }}>
          <h4 style={{ color: '#3A4D39', marginTop: '0', fontSize: '18px' }}>طلب معلق مقدم من ولي الأمر: {JSON.parse(localStorage.getItem('pendingParentRequest')).parentName}</h4>
          <ul style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
            <li><strong>البريد الإلكتروني:</strong> {JSON.parse(localStorage.getItem('pendingParentRequest')).email}</li>
            <li><strong>رقم الهاتف:</strong> {JSON.parse(localStorage.getItem('pendingParentRequest')).phone}</li>
            <li><strong>صلة القرابة:</strong> {JSON.parse(localStorage.getItem('pendingParentRequest')).relationship}</li>
            <li><strong>عدد الأبناء بالمدرسة:</strong> {JSON.parse(localStorage.getItem('pendingParentRequest')).childrenCount}</li>
            <li><strong>رقم الطالب المستهدف للربط (ID):</strong> <span style={{ color: '#A94442', fontWeight: 'bold' }}>{JSON.parse(localStorage.getItem('pendingParentRequest')).studentId}</span></li>
            <li><strong>بيانات الطالب الإضافية:</strong> {JSON.parse(localStorage.getItem('pendingParentRequest')).studentGender} (تاريخ الميلاد: {JSON.parse(localStorage.getItem('pendingParentRequest')).studentBirthDate})</li>
          </ul>
          <button onClick={() => { localStorage.setItem('parentAccountStatus', 'تمت الموافقة'); alert('تم تفعيل حساب ولي الأمر بنجاح!'); window.location.reload(); }} style={{ padding: '12px 24px', backgroundColor: '#3A4D39', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            ✔ موافقة وتفعيل الحساب بالنظام
          </button>
        </div>
      ) : (
        <p style={{ color: '#888', fontStyle: 'italic', backgroundColor: '#FEFAF6', padding: '15px', borderRadius: '6px', marginBottom: '40px' }}>لا توجد طلبات إنشاء حسابات جديدة معلقة حالياً.</p>
      )}

      {/* 📑 قسم اعتماد العلامات */}
      <h2 style={{ color: '#3A4D39', marginBottom: '10px', fontWeight: 'bold' }}>✔️ اعتماد وتثبيت العلامات النهائية للمواد</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '45px' }}>
        <thead>
          <tr style={{ backgroundColor: '#3A4D39', color: 'white' }}>
            <th style={{ padding: '15px', textAlign: 'right' }}>المادة والصف الدراسي</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>المعلم المدرس</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>حالة التدقيق</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>القرار الإداري</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g.id} style={{ borderBottom: '1px solid #ECE5C7' }}>
              <td style={{ padding: '15px', fontWeight: 'bold', color: '#3A4D39' }}>{g.subject}</td>
              <td style={{ padding: '15px', color: '#555' }}>{g.teacher}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                <span style={{ padding: '4px 12px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', backgroundColor: g.status.includes('الاعتماد') ? '#fff3e0' : '#e8f5e9', color: g.status.includes('الاعتماد') ? '#e65100' : '#2e7d32' }}>{g.status}</span>
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {g.status === 'بانتظار الاعتماد' ? (
                  <button onClick={() => setGrades(grades.map(item => item.id === g.id ? { ...item, status: 'تم الاعتماد النهائي' } : item))} style={{ padding: '6px 15px', backgroundColor: '#739072', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>✔️ موافقة واعتماد</button>
                ) : ( <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>معتمد رسميّاً بالسيستم</span> )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🗓️ قسم الجداول الامتحانية */}
      <h2 style={{ color: '#3A4D39', marginBottom: '10px', fontWeight: 'bold' }}>🗓️ إنشاء وتوليد الجداول الامتحانية الرسمية</h2>
      <form onSubmit={handleAddExam} style={{ display: 'flex', gap: '15px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', marginBottom: '25px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}><label>الصف:</label><input type="text" value={newClass} onChange={e => setNewClass(e.target.value)} style={{ width: '100%', padding: '10px' }} /></div>
        <div style={{ flex: 1 }}><label>المادة:</label><input type="text" value={newSubject} onChange={e => setNewSubject(e.target.value)} style={{ width: '100%', padding: '10px' }} /></div>
        <div style={{ flex: 1 }}><label>التاريخ:</label><input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: '100%', padding: '10px' }} /></div>
        <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#3A4D39', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>➕ إدراج بالجدول</button>
      </form>
    </div>
  );
};

export default AdminApprovals;
