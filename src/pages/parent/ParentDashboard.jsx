import { useState } from 'react'; 
import ParentSidebar from '../../components/ParentSidebar'; 
import ParentAnnouncements from '../../components/ParentAnnouncements'; 
import ParentGrades from '../../components/ParentGrades'; 
import ParentSchedule from '../../components/ParentSchedule'; 
import ParentAttendance from '../../components/ParentAttendance'; 
import ParentFinance from '../../components/ParentFinance'; 

const ParentDashboard = () => {
  // التبويب الافتراضي النشط عند الدخول
  const [currentTab, setCurrentTab] = useState('announcements'); 

  // 1. جلب مصفوفة الطلاب الآمن: إذا لم يجدها يضع مصفوفة فارغة لكي لا تظهر شاشة بيضاء
  const [studentsList] = useState(() => { 
    const saved = localStorage.getItem('parentStudentsList'); 
    try {
      return saved ? JSON.parse(saved) : [];
    } catch  {
      return []; // حماية في حال كانت البيانات معطوبة
    }
  }); 

  // 2. جلب بيانات ولي الأمر الآمن
  const [parentInfo] = useState(() => {
    const savedInfo = localStorage.getItem('pendingParentRequest');
    try {
      return savedInfo ? JSON.parse(savedInfo) : { parentName: 'ولي الأمر', relationship: 'أب' };
    } catch   {
      return { parentName: 'ولي الأمر', relationship: 'أب' };
    }
  });

  // 3. التعديل السحري: وضع علامة استفهام طلاب[0] لضمان عدم انهيار الموقع إذا كانت القائمة فارغة
  const [selectedStudentId, setSelectedStudentId] = useState(studentsList?.[0] || ''); 

  // دالة التعامل مع تغيير الابن من القائمة المنسدلة
  const handleStudentChange = (e) => { 
    setSelectedStudentId(e.target.value); 
  }; 

  // 4. حساب وتجهيز بيانات الطالب المختار بأمان تام
  const studentData = selectedStudentId ? { 
    id: selectedStudentId, 
    name: `الطالب (ابن السيد ${parentInfo?.parentName || 'ولي الأمر'})`, 
    grade: 'الصف العاشر العلمي', 
    section: 'الشعبة الأولى', 
    seatNumber: `2450${selectedStudentId}` 
  } : { id: '', name: 'لا يوجد طالب نَشِط', grade: '', section: '', seatNumber: '' };
  return (
    <div style={{ height: '100vh', backgroundColor: '#f5f2eb', direction: 'rtl' }}> 
      
      {/* إذا لم يكن هناك أبناء مضافين (حالة وقائية لضمان عدم حدوث خطأ) */} 
      {studentsList.length === 0 ? ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', textAlign: 'center' }}> 
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}> 
            <h2 style={{ color: '#d32f2f' }}>⚠️ تنبيه نظام الصلاحيات</h2> 
            <p style={{ color: '#555', fontSize: '16px' }}>لم يتم العثور على أي ملفات طلاب مربوطة بحسابك حالياً.</p> 
            <p style={{ color: '#777', fontSize: '14px' }}>الرجاء العودة لصفحة التسجيل وإكمال ربط الأبناء بنجاح أولاً.</p> 
          </div> 
        </div> 
      ) : ( 
        /* لوحة التحكم المتكاملة والمربوطة بالكامل ببيانات التسجيل */ 
        <div style={{ display: 'flex', height: '100vh' }}> 
          
          {/* القائمة الجانبية للتنقل بين التبويبات */} 
          <ParentSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} /> 
          
          {/* المحتوى الرئيسي للوحة المتابعة */} 
          <div style={{ flex: 1, padding: '45px', overflowY: 'auto' }}> 
            
            {/* شريط الاختيار العلوي المطور: يعرض ترحيباً باسم ولي الأمر الفعلي والابن المختار */} 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '15px 25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)', border: '1px solid rgba(0, 0, 0, 0.05)' }}> 
              <div> 
                <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>
                  مرحباً بك يا سيد: {parentInfo?.parentName || 'ولي الأمر'} ({parentInfo?.relationship || 'أب'})
                </span>
                <h3 style={{ margin: '5px 0 0 0', color: '#14301d', fontSize: '18px', fontWeight: '700' }}> 
                  📊 متابعة ملف: <span style={{ color: '#2e7d32' }}>{studentData.name}</span> 
                </h3> 
                <span style={{ fontSize: '12px', color: '#777' }}>الرقم المدرسي: {studentData.id} | {studentData.grade}</span> 
              </div> 

              {/* القائمة المنسدلة للتبديل بين الأبناء الذين تم إدخالهم أثناء التسجيل */} 
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> 
                <label style={{ fontWeight: '600', color: '#14301d', fontSize: '14px' }}>تبديل عرض الابن:</label> 
                <select value={selectedStudentId} onChange={handleStudentChange} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#ffffff', color: '#14301d', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }} > 
                  {studentsList.map((id, index) => (
                    <option key={index} value={id}> 
                      الابن: {id}
                    </option> 
                  ))} 
                </select> 
              </div> 
            </div> 

            {/* عرض المكون الفرعي النشط (علامات، جدول، مالية) مع تمرير بيانات الابن المختار ديناميكياً */} 
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}> 
              {currentTab === 'announcements' && <ParentAnnouncements student={studentData} />} 
              {currentTab === 'grades' && <ParentGrades student={studentData} />} 
              {currentTab === 'schedule' && <ParentSchedule student={studentData} />} 
              {currentTab === 'attendance' && <ParentAttendance student={studentData} />} 
              {currentTab === 'finance' && <ParentFinance student={studentData} />} 
            </div> 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
}; 

export default ParentDashboard;
