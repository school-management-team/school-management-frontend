import { useState } from 'react';

const RegisterParent = () => {
  
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [relationship, setRelationship] = useState('أب');
  const [childrenCount, setChildrenCount] = useState('1');
  const [parentGender, setParentGender] = useState('ذكر');
  const [parentBirthDate, setParentBirthDate] = useState('');

  
  const [studentId, setStudentId] = useState('');

  const [requestStatus, setRequestStatus] = useState(localStorage.getItem('parentAccountStatus') || 'جديد');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // 1. التحقق من تعبئة الحقول الأساسية
    if (!parentName || !email || !phone || !password || !studentId || !parentBirthDate || !parentGender) {
      alert('الرجاء تعبئة كافة الحقول لإرسال الطلب الإداري!');
      return;
    }

    // 2. شرط الاسم الثلاثي لولي الأمر
    const nameTrimmed = parentName.trim().replace(/\s+/g, ' ');
    const nameWords = nameTrimmed.split(' ');
    if (nameWords.length < 3) {
      alert('خطأ في الاسم! يجب إدخال الاسم الثلاثي الكامل لولي الأمر (الاسم، اسم الأب، الكنية).');
      return;
    }

    // 3. شرط رقم الهاتف (10 أرقام بالضبط)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('خطأ في رقم الهاتف! يجب أن يتكون الرقم من 10 أرقام فقط دون أي رموز أو أحرف.');
      return;
    }

    // تجهيز كائن البيانات النظيف والمطلوب
    const parentData = { 
      parentName: nameTrimmed, 
      email, 
      phone, 
      relationship, 
      childrenCount, 
      parentGender,
      parentBirthDate,
      studentId
    };
    
    localStorage.setItem('pendingParentRequest', JSON.stringify(parentData));
    localStorage.setItem('parentAccountStatus', 'قيد المراجعة');
    
    setRequestStatus('قيد المراجعة');
    alert('تم إرسال طلب إنشاء الحساب بنجاح! طلبك الآن قيد المراجعة والتدقيق من قبل إدارة المدرسة.');
  };

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
  return (
    <div style={{ backgroundColor: '#F4EFE0', padding: '60px 20px', minHeight: '100vh', direction: 'rtl', fontFamily: '"Cairo", "Segoe UI", sans-serif', backgroundImage: 'radial-gradient(#7390720d 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      
      {/* استدعاء خط Cairo الاحترافي من خوادم جوجل لضمان الجمالية البصرية */}
      <link rel="preconnect" href="https://googleapis.com" />
      <link rel="preconnect" href="https://gstatic.com" crossOrigin="true" />
      <link href="https://googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {requestStatus === 'قيد المراجعة' ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '50px 30px', borderTop: '6px solid #E65100' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
            <h2 style={{ color: '#E65100', marginBottom: '15px', fontWeight: '800', fontSize: '24px' }}>طلبك قيد المراجعة والتدقيق</h2>
            <p style={{ color: '#4F6F52', fontSize: '16px', lineHeight: '1.8', maxWidth: '550px', margin: '0 auto' }}>
              تم استلام وثائق البيانات بنجاح يا سيد <strong style={{ color: '#3A4D39' }}>{localStorage.getItem('pendingParentRequest') ? JSON.parse(localStorage.getItem('pendingParentRequest')).parentName : ''}</strong>. 
              يرجى الانتظار حتى يتم التحقق من ملف الطالب من قبل الإدارة لتفعيل صلاحيات الدخول كاملة.
            </p>
          </div>
        ) : requestStatus === 'تمت الموافقة' ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '50px 30px', borderTop: '6px solid #2E7D32' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ color: '#2E7D32', marginBottom: '15px', fontWeight: '800', fontSize: '24px' }}>تم تفعيل الحساب بنجاح!</h2>
            <p style={{ color: '#4F6F52', fontSize: '16px' }}>لقد وافق مدير المدرسة على طلبك، الحساب نشط الآن </p>
          </div>
        ) : (
          
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
                  <input 
                    type="text" 
                    value={phone} 
                    maxLength={10} 
                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{ ...inputStyle, letterSpacing: '1px' }} 
                    placeholder="09xxxxxxxx"
                  />
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

          
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #73907226', paddingBottom: '12px' }}>
                <span style={{ fontSize: '20px', backgroundColor: '#4F6F52', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🎓</span>
                <h3 style={{ color: '#3A4D39', margin: '0', fontWeight: '700', fontSize: '18px' }}>ربط بملف الطالب المدرسي</h3>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label style={labelStyle}>رقم الطالب المدرسي (ID):</label>
                  <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} style={inputStyle} placeholder="" />
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
