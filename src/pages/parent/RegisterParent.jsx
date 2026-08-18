import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // أداة التنقل الرسمية لـ React Router

const RegisterParent = () => {
  const navigate = useNavigate(); // تفعيل تابع التنقل البرمجي

  // بيانات ولي الأمر الأساسية
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [relationship, setRelationship] = useState('أب');
  const [childrenCount, setChildrenCount] = useState('1');
  const [parentGender, setParentGender] = useState('ذكر');
  const [parentBirthDate, setParentBirthDate] = useState('');
  
  // رقم الطالب الأول أثناء التسجيل
  const [studentId, setStudentId] = useState('');
  
  // حالة الحساب الإدارية
  const [requestStatus, setRequestStatus] = useState(localStorage.getItem('parentAccountStatus') || 'جديد');

  // مصفوفة لتخزين أرقام الطلاب المضافين
  const [studentsList, setStudentsList] = useState(() => {
    const saved = localStorage.getItem('parentStudentsList');
    return saved ? JSON.parse(saved) : [];
  });

  // حقل إدخال رقم طالب جديد (داخل لوحة التحكم بعد القبول)
  const [newStudentId, setNewStudentId] = useState('');

  // معالجة إرسال طلب التسجيل لأول مرة
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!parentName || !email || !phone || !password || !studentId || !parentBirthDate || !parentGender) {
      alert('الرجاء تعبئة كافة الحقول لإرسال الطلب الإداري!');
      return;
    }

    const nameTrimmed = parentName.trim().replace(/\s+/g, ' ');
    const nameWords = nameTrimmed.split(' ');
    if (nameWords.length < 3) {
      alert('خطأ في الاسم! يجب إدخال الاسم الثلاثي الكامل لولي الأمر (الاسم، اسم الأب، الكنية).');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('خطأ في رقم الهاتف! يجب أن يتكون الرقم من 10 أرقام فقط دون أي رموز أو أحرف.');
      return;
    }

    // تأمين حفظ المعرف الأول كمصفوفة نصوص صريحة لمنع حدوث الأخطاء والشاشة البيضاء
    const initialStudent = studentId.trim();
    const initialStudentsArray = [initialStudent];
    
    const parentData = {
      parentName: nameTrimmed,
      email,
      phone,
      relationship,
      childrenCount,
      parentGender,
      parentBirthDate,
    };

    localStorage.setItem('pendingParentRequest', JSON.stringify(parentData));
    localStorage.setItem('parentStudentsList', JSON.stringify(initialStudentsArray));
    localStorage.setItem('parentAccountStatus', 'قيد المراجعة');
    
    setStudentsList(initialStudentsArray);
    setRequestStatus('قيد المراجعة');
    alert('تم إرسال طلب إنشاء الحساب بنجاح! طلبك الآن قيد المراجعة والتدقيق من قبل إدارة المدرسة.');
  };
  // معالجة إضافة طالب جديد بعد موافقة المدير والتحقق من الحد الأقصى للأولاد
  const handleAddNewStudent = (e) => {
    e.preventDefault();
    
    if (!newStudentId.trim()) {
      alert('الرجاء إدخال رقم الطالب أولاً!');
      return;
    }

    const parentData = JSON.parse(localStorage.getItem('pendingParentRequest')) || {};
    const maxChildren = parseInt(parentData.childrenCount || childrenCount, 10);

    if (studentsList.length >= maxChildren) {
      alert(`عذراً! لقد قمت بإضافة الحد الأقصى من الأبناء المسموح لك به وهو (${maxChildren}) طلاب وفقاً لبيانات تسجيلك.`);
      return;
    }

    if (studentsList.includes(newStudentId.trim())) {
      alert('هذا الطالب مضاف بالفعل في حسابك!');
      return;
    }

    const updatedList = [...studentsList, newStudentId.trim()];
    localStorage.setItem('parentStudentsList', JSON.stringify(updatedList));
    setStudentsList(updatedList);
    setNewStudentId('');
    alert('تم إضافة الابن بنجاح إلى ملفك الشخصي!');
  };

  // التنسيقات البصرية والثيم البصري الأنيق (Styles)
  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(58, 77, 57, 0.05)',
    border: '1px solid rgba(115, 144, 114, 0.15)',
    marginBottom: '30px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#3A4D39',
    fontSize: '14px',
    letterSpacing: '0.3px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #C2BBA8',
    backgroundColor: '#FCFBFAF2',
    color: '#3A4D39',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  // قراءة معلومات ولي الأمر المحفوظة لعرضها في شاشات المتابعة والتحقق
  const savedParentInfo = localStorage.getItem('pendingParentRequest') ? JSON.parse(localStorage.getItem('pendingParentRequest')) : null;
  const currentMaxChildren = savedParentInfo ? parseInt(savedParentInfo.childrenCount, 10) : 1;

  return (
    <div style={{ backgroundColor: '#F4EFE0', padding: '60px 20px', minHeight: '100vh', direction: 'rtl', fontFamily: '"Cairo", "Segoe UI", sans-serif', backgroundImage: 'radial-gradient(#7390720d 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <link rel="preconnect" href="https://googleapis.com" />
      <link rel="preconnect" href="https://gstatic.com" crossOrigin="true" />
      <link href="https://googleapis.com" rel="stylesheet" />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* الحالة الأولى: قيد المراجعة والانتظار */}
        {requestStatus === 'قيد المراجعة' ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '50px 30px', borderTop: '6px solid #E65100' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
            <h2 style={{ color: '#E65100', marginBottom: '15px', fontWeight: '800', fontSize: '24px' }}>طلبك قيد المراجعة والتدقيق</h2>
            <p style={{ color: '#4F6F52', fontSize: '16px', lineHeight: '1.8', maxWidth: '550px', margin: '0 auto' }}>
              تم استلام وثائق البيانات بنجاح يا سيد <strong style={{ color: '#3A4D39' }}>{savedParentInfo ? savedParentInfo.parentName : ''}</strong>. يرجى الانتظار حتى يتم التحقق من ملف الطالب من قبل الإدارة لتفعيل صلاحيات الدخول كاملة.
            </p>
            {/* زر محاكاة وهمي للتطوير السريع واختبار تفعيل الحساب بدون انتظار */}
            <button 
              type="button"
              onClick={() => { localStorage.setItem('parentAccountStatus', 'تمت الموافقة'); setRequestStatus('تمت الموافقة'); }}
              style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#E65100', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              (محاكاة للمطور) الموافقة على الطلب كمدير
            </button>
          </div>
        ) : 
        
        /* الحالة الثانية: تمت الموافقة وتفعيل شاشة إدارة الأبناء المطورّة مع زر الانتقال */
        requestStatus === 'تمت الموافقة' ? (
          <div>
            <div style={{ ...cardStyle, textAlign: 'center', padding: '40px 30px', borderTop: '6px solid #2E7D32' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎉</div>
              <h2 style={{ color: '#2E7D32', marginBottom: '10px', fontWeight: '800', fontSize: '24px' }}>مرحباً بك، تم تفعيل الحساب بنجاح!</h2>
              <p style={{ color: '#4F6F52', fontSize: '16px', margin: '0' }}>أهلاً بك يا سيد <strong style={{ color: '#3A4D39' }}>{savedParentInfo?.parentName}</strong> في لوحة المتابعة الخاصة بك.</p>
            </div>

            {/* عرض الأبناء الحاليين المضافين للملف */}
            <div style={cardStyle}>
              <h3 style={{ color: '#3A4D39', marginBottom: '20px', fontSize: '18px', fontWeight: '700', borderBottom: '1px solid #73907226', paddingBottom: '10px' }}>👶 الأبناء المسجلين حالياً ({studentsList.length} من أصل {currentMaxChildren})</h3>
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {studentsList.map((id, index) => (
                  <li key={index} style={{ padding: '12px 15px', backgroundColor: '#F1EFE7', borderRadius: '8px', marginBottom: '10px', color: '#3A4D39', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRight: '4px solid #3A4D39' }}>
                    <span>الابن رقم {index + 1} - المعرف المدرسي (ID): <strong>{id}</strong></span>
                    <span style={{ backgroundColor: '#2E7D32', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '12px' }}>نشط ومقبول</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* فورم إضافة ابن جديد أو زر الانتقال التلقائي للوحة التحكم عند اكتمال العدد */}
            {studentsList.length < currentMaxChildren ? (
              <form onSubmit={handleAddNewStudent} style={cardStyle}>
                <h3 style={{ color: '#3A4D39', marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>➕ إضافة ابن آخر إلى اللوحة</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>رقم الطالب المدرسي الجديد (ID):</label>
                  <input 
                    type="text" 
                    value={newStudentId} 
                    onChange={e => setNewStudentId(e.target.value)} 
                    style={inputStyle} 
                    placeholder="أدخل الـ ID الخاص بابنك الآخر" 
                  />
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#3A4D39', color: '#FEFAF6', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
                  ربط الملف المدرسي للابن الجديد
                </button>
              </form>
            ) : (
              <div style={{ ...cardStyle, backgroundColor: '#E8F5E9', border: '1px solid #A5D6A7', textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>✨</div>
                <p style={{ color: '#2E7D32', fontWeight: '700', fontSize: '18px', marginBottom: '20px' }}>
                  لقد قمت بربط جميع ملفات أبنائك المحددة عند التسجيل بنجاح!
                </p>
                
                {/* زر الانتقال التلقائي المصلح والموجه بدقة للمسار المفتوح في App.jsx */}
                <button 
                  type="button"
                  onClick={() => {
                    navigate('/parent'); // التوجيه البرمجي الصحيح دون ريفريش ودون شاشة بيضاء
                  }}
                  style={{
                    padding: '14px 30px',
                    backgroundColor: '#2E7D32',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 6px 15px rgba(46, 125, 50, 0.25)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🚀 الدخول إلى لوحة متابعة العلامات والتنبيهات
                </button>
              </div>
            )}
            
            {/* زر وهمي لإعادة التعيين والتجربة مجدداً من الصفر للمطورين للتخلص من البيانات المعطوبة */}
            <button 
              type="button"
              onClick={() => { localStorage.clear(); setRequestStatus('جديد'); setStudentsList([]); window.location.reload(); }}
              style={{ display: 'block', margin: '30px auto 0 auto', padding: '8px 16px', backgroundColor: '#777', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
            >
              إعادة تهيئة النظام بالكامل (حذف البيانات للاختبار)
            </button>
          </div>
        ) : 
        
        /* الحالة الثالثة: استمارة التسجيل الأساسية (مستخدم جديد) */
        (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ color: '#3A4D39', marginTop: '15px', marginBottom: '10px', fontWeight: '800', fontSize: '28px' }}> إنشاء حساب مستخدم</h1>
              <p style={{ color: '#4F6F52', fontSize: '15px', margin: '0' }}>الرجاء إدخال البيانات المطلوبة بدقة لربط الحساب بملف الطالب المدرسي </p>
            </div>

            {/* 🏠 الكرت الأول: معلومات ولي الأمر */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #73907226', paddingBottom: '12px' }}>
                <span style={{ fontSize: '20px', backgroundColor: '#3A4D39', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>👤</span>
                <h3 style={{ color: '#3A4D39', margin: '0', fontWeight: '700', fontSize: '18px' }}>بيانات ولي الأمر الأساسية</h3>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '2', minWidth: '260px' }}>
                  <label style={labelStyle}>اسم ولي الأمر الثلاثي الكامل:</label>
                  <input type="text" value={parentName} onChange={e => setParentName(e.target.value)} style={inputStyle} placeholder="الاسم - اسم الأب - الكنية" />
                </div>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <label style={labelStyle}>نوع الصلة / صلة القرابة:</label>
                  <select value={relationship} onChange={e => setRelationship(e.target.value)} style={{ ...inputStyle, backgroundColor: '#ffffff', cursor: 'pointer' }}>
                    <option value="أب">أب</option><option value="أم">أم</option><option value="جد">جد</option><option value="جدة">جدة</option>
                    <option value="عم">عم</option><option value="عمة">عمة</option><option value="خال">خال</option><option value="خالة">خالة</option>
                    <option value="أخ">أخ</option><option value="أخت">أخت</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>البريد الإلكتروني:</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="name@example.com" />
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>رقم الهاتف المحمول (10 أرقام):</label>
                  <input type="text" value={phone} maxLength={10} onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))} style={{ ...inputStyle, letterSpacing: '1px' }} placeholder="09xxxxxxxx" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>جنس ولي الأمر:</label>
                  <select value={parentGender} onChange={e => setParentGender(e.target.value)} style={{ ...inputStyle, backgroundColor: '#ffffff', cursor: 'pointer' }}>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>تاريخ ميلاد ولي الأمر:</label>
                  <input type="date" value={parentBirthDate} onChange={e => setParentBirthDate(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>تعيين كلمة المرور الخاصة بالحساب:</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="أدخل كلمة مرور قوية لتسجيل الدخول" />
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>عدد الأولاد المتواجدين في المدرسة:</label>
                  <input type="number" min="1" max="10" value={childrenCount} onChange={e => setChildrenCount(e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* 🎓 الكرت الثاني: ربط الطالب الأول */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #73907226', paddingBottom: '12px' }}>
                <span style={{ fontSize: '20px', backgroundColor: '#4F6F52', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🎓</span>
                <h3 style={{ color: '#3A4D39', margin: '0', fontWeight: '700', fontSize: '18px' }}>ربط بملف الطالب المدرسي</h3>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>رقم الطالب المدرسي الأول (ID):</label>
                  <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} style={inputStyle} placeholder="أدخل رقم معرف ابنك الأول" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '16px', backgroundColor: '#3A4D39', color: '#FEFAF6', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(58, 77, 57, 0.2)', transition: 'transform 0.2s, background-color 0.2s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#4F6F52'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#3A4D39'; e.target.style.transform = 'translateY(0)'; }}
            >
              📥 إرسال وثيقة البيانات للمراجعة وتفعيل الحساب
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterParent;