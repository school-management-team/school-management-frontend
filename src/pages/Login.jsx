import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '123') {
      localStorage.setItem('role', 'admin');
      navigate('/admin');
    } 
    else if (username === 'parent' && password === '123') {
      localStorage.setItem('role', 'parent');
      
      // جلب حالة الحساب المعلقة بالمتصفح
      const status = localStorage.getItem('parentAccountStatus');
      
      if (status === 'قيد المراجعة' || status === 'تمت الموافقة') {
        navigate('/parent'); // إذا أرسل الطلب أو وافق المدير يذهب للوحة البيانات مباشرة
      } else {
        navigate('/register-parent'); // أول مرة يدخل يذهب لصفحة إنشاء الحساب الإجبارية
      }
    } else {
      alert('اسم المستخدم أو كلمة المرور خاطئة!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F8F6E3', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ padding: '35px', backgroundColor: '#FEFAF6', borderRadius: '12px', boxShadow: '0 4px 15px rgba(58,77,57,0.1)', width: '340px' }}>
        
        {/* زر سري وذكي لطالب سنة ثالثة لتنظيف الذاكرة وتسهيل التجربة أمامك وأمام اللجنة */}
        <button 
          type="button" 
          onClick={() => { localStorage.clear(); alert('تم تنظيف ذاكرة النظام بنجاح! يمكنك التجربة الآن كحساب جديد تماماً.'); }} 
          style={{ float: 'left', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '11px' }}
        >
          🔄 تصفير النظام
        </button>

        <h2 style={{ textAlign: 'center', color: '#3A4D39', marginBottom: '25px', fontWeight: 'bold', clear: 'both' }}>🏫 تسجيل دخول المنظومة</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#3A4D39' }}>اسم المستخدم:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #739072', boxSizing: 'border-box' }} placeholder="admin أو parent" />
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#3A4D39' }}>كلمة المرور:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #739072', boxSizing: 'border-box' }} placeholder="123" />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3A4D39', color: '#FEFAF6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          دخول للمنظومة
        </button>
      </form>
    </div>
  );
};

export default Login;
