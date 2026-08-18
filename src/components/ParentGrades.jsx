// @ts-ignore
const allStudentsGradesData = {
  "1": [
    { id: 1, subject: 'الرياضيات', score: 95 },
    { id: 2, subject: 'اللغة العربية', score: 88 },
    { id: 3, subject: 'الفيزياء', score: 92 },
    { id: 4, subject: 'التاريخ', score: 75 },
  ],
  "2": [
    { id: 1, subject: 'الرياضيات', score: 62 },
    { id: 2, subject: 'اللغة العربية', score: 81 },
    { id: 3, subject: 'الفيزياء', score: 55 },
    { id: 4, subject: 'التاريخ', score: 90 },
  ]
};

// علامات افتراضية يتم عرضها في حال إدخال ID جديد غير مسجل أعلاه
const defaultGrades = [
  { id: 1, subject: 'الرياضيات', score: 85 },
  { id: 2, subject: 'اللغة العربية', score: 78 },
  { id: 3, subject: 'الفيزياء', score: 80 },
  { id: 4, subject: 'التاريخ', score: 82 },
];

const ParentGrades = ({ student }) => {
  // جلب علامات الطالب المختار حالياً بناءً على الـ id الخاص به
  const studentGrades = allStudentsGradesData[student.id] || defaultGrades;

  // دالة التقييم الإداري بناءً على الدرجة
  const getGradeEvaluation = (score) => {
    if (score >= 90) return { text: 'ممتاز 🌟', color: '#2e7d32', bgColor: '#e8f5e9' };
    else if (score >= 80) return { text: 'جيد جداً 👍', color: '#1565c0', bgColor: '#e3f2fd' };
    else if (score >= 70) return { text: 'جيد 📑', color: '#f57c00', bgColor: '#fff3e0' };
    else if (score >= 60) return { text: 'وسط ⚠️', color: '#7d6608', bgColor: '#fef9e7' };
    else return { text: 'ضعيف 🛑', color: '#c62828', bgColor: '#ffebee' };
  };
  return (
    <div>
      {/* 💳 بطاقة الهوية المدرسية المنسقة للابن */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderRight: '6px solid #14301d', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' }}>
        <div style={{ fontSize: '15px', color: '#555' }}>- اسم الطالب الثلاثي: <b style={{ color: '#14301d', fontSize: '16px' }}>{student.name}</b></div>
        <div style={{ fontSize: '15px', color: '#555' }}>- رقم قيد الطالب: <b style={{ color: '#14301d' }}>{student.id}</b></div>
        <div style={{ fontSize: '15px', color: '#555' }}>- المرحلة والصف الدراسي: <b style={{ color: '#14301d' }}>{student.grade}</b></div>
        <div style={{ fontSize: '15px', color: '#555' }}>- الشعبة الدراسية: <b style={{ color: '#14301d' }}>{student.section}</b></div>
        <div style={{ fontSize: '15px', color: '#555', gridColumn: 'span 2' }}>- رقم الجلوس الامتحاني المعتمد: <b style={{ color: '#14301d', fontSize: '16px' }}>{student.seatNumber}</b></div>
      </div>

      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>📝 كشف العلامات النهائي للفصل الحالي</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <thead>
          <tr style={{ backgroundColor: '#14301d', color: 'white' }}>
            <th style={{ padding: '15px', textAlign: 'right' }}>المادة الدراسية</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>الدرجة</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>التقدير الإداري</th>
          </tr>
        </thead>
        <tbody>
          {studentGrades.map(g => {
            const evaluation = getGradeEvaluation(g.score);
            return (
              <tr key={g.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>{g.subject}</td>
                <td style={{ padding: '15px', color: '#14301d', fontWeight: 'bold' }}>{g.score} / 100</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', backgroundColor: evaluation.bgColor, color: evaluation.color }}>
                    {evaluation.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParentGrades;
