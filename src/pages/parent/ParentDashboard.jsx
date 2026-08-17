import { useState } from 'react';
import ParentSidebar from '../../components/ParentSidebar';
import ParentAnnouncements from '../../components/ParentAnnouncements'; // استدعاء ملف الإعلانات الجديد
import ParentGrades from '../../components/ParentGrades'; 
import ParentSchedule from '../../components/ParentSchedule'; 
import ParentAttendance from '../../components/ParentAttendance'; 
import ParentFinance from '../../components/ParentFinance'; 

const ParentDashboard = () => {
  // جعلنا تبويب الإعلانات هو الافتراضي فور جلب بيانات الطالب ليعرف الأهالي الجديد أولاً
  const [currentTab, setCurrentTab] = useState('announcements');
  const [studentId, setStudentId] = useState('');
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const [studentData, setStudentData] = useState({
    id: '',
    name: 'محمد أحمد الحامد',
    grade: 'الصف العاشر العلمي',
    section: 'الشعبة الأولى',
    seatNumber: '24501'
  });

  const handleCheckStudentId = (e) => {
    e.preventDefault();
    if (studentId === '101') {
      setStudentData({ ...studentData, id: studentId });
      setIsAccessGranted(true);
    } else {
      alert('عذراً، الرقم المدرسي غير صحيح! للتجربة اكتب: 101');
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#f5f2eb', direction: 'rtl' }}>
      
      {!isAccessGranted ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form onSubmit={handleCheckStudentId} style={{
            backgroundColor: 'white', padding: '35px', borderRadius: '12px', width: '380px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center'
          }}>
            <h2 style={{ color: '#14301d', margin: '0 0 10px 0' }}>👨‍👩‍👦 بوابة ولي الأمر الإلكترونية</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>الرجاء إدخال الرقم المدرسي الخاص بابنكم لتسجيل الدخول وعرض البيانات:</p>
            
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>الرقم المدرسي للطالب:</label>
              <input 
                type="text" 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px', textAlign: 'center' }} 
                placeholder="رقم القيد التجريبي: 101" 
              />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '12px', backgroundColor: '#14301d', color: 'white',
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
            }}>
              🔍 جلب بيانات الطالب
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'flex', height: '100vh' }}>
          <ParentSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <div style={{ flex: 1, padding: '45px', overflowY: 'auto' }}>
            {currentTab === 'announcements' && <ParentAnnouncements />}
            {currentTab === 'grades' && <ParentGrades student={studentData} />}
            {currentTab === 'schedule' && <ParentSchedule />}
            {currentTab === 'attendance' && <ParentAttendance />}
            {currentTab === 'finance' && <ParentFinance />}
          </div>
        </div>
      )}

    </div>
  );
};

export default ParentDashboard;
