import { useState } from 'react';

const ParentFinance = () => {
  
  const [finance] = useState({ total: '2,000 $', paid: '1,200 $', remaining: '800 $', status: 'متبقي دفعات' });


  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { id: 1, sender: 'الموجه العام', text: 'أهلاً بك سيد أحمد، نحن سعداء بتواصلك لمتابعة مستوى محمد الدراسي' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatLog([...chatLog, { id: chatLog.length + 1, sender: 'أنا (ولي الأمر)', text: message }]);
    setMessage('');
    alert('تم إرسال رسالتك إلى الموجه العام بنجاح!');
  };

  return (
    <div>
      {/* الجزء المالي */}
      <h2 style={{ color: '#14301d', marginBottom: '20px' }}>💵 كشف الرسوم والمستحقات الدراسية للابن</h2>
      <div style={{ display: 'flex', gap: '20px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', color: '#555' }}>إجمالي القسط السنوي: <b>{finance.total}</b></p>
          <p style={{ margin: '0 0 8px 0', color: '#2e7d32' }}>المبلغ المدفوع المسدد: <b>{finance.paid}</b></p>
          <p style={{ margin: 0, color: '#c62828' }}>المبلغ المتبقي المستحق: <b>{finance.remaining}</b></p>
        </div>
        <span style={{ padding: '6px 15px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#fff3e0', color: '#e65100' }}>{finance.status}</span>
      </div>

      {/* صندوق التواصل مع الموجه */}
      <h2 style={{ color: '#14301d', marginBottom: '15px' }}>💬 مراسلة والتواصل المباشر مع الموجه</h2>
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ height: '150px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '6px', padding: '15px', marginBottom: '15px', backgroundColor: '#fdfbf7' }}>
          {chatLog.map(chat => (
            <div key={chat.id} style={{ marginBottom: '10px', textAlign: chat.sender.includes('أنا') ? 'left' : 'right' }}>
              <b style={{ color: '#14301d', fontSize: '13px' }}>{chat.sender}:</b>
              <p style={{ margin: '3px 0 0 0', display: 'inline-block', backgroundColor: chat.sender.includes('أنا') ? '#e8f5e9' : '#f1f5f9', padding: '8px 12px', borderRadius: '8px', fontSize: '14px' }}>{chat.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} placeholder="اكتب استفسارك للموجه هنا..." />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#14301d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>✉️ إرسال الرسالة</button>
        </form>
      </div>
    </div>
  );
};

export default ParentFinance;
