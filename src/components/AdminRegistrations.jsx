import { useState } from 'react';

const AdminRegistrations = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'أستاذ سامر العلي', role: 'معلم كيمياء', date: '2026-05-20', status: 'قيد الانتظار' },
    { id: 2, name: 'السيد أحمد الحامد', role: 'ولي أمر طالب', date: '2026-05-22', status: 'قيد الانتظار' },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div>
      <h2 style={{ color: '#14301d', marginBottom: '20px' }}>👥 طلبات تسجيل المستخدمين الجدد</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <thead>
          <tr style={{ backgroundColor: '#14301d', color: 'white' }}>
            <th style={{ padding: '15px', textAlign: 'right' }}>الاسم</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>الدور المطلوب</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>تاريخ الطلب</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>الحالة</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>الإجراء الإداري</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>{r.name}</td>
              <td style={{ padding: '15px' }}>{r.role}</td>
              <td style={{ padding: '15px' }}>{r.date}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold',
                  backgroundColor: r.status === 'تم القبول ✔️' ? '#e8f5e9' : r.status === 'مرفوض ❌' ? '#ffebee' : '#fff3e0',
                  color: r.status === 'تم القبول ✔️' ? '#2e7d32' : r.status === 'مرفوض ❌' ? '#c62828' : '#e65100'
                }}>{r.status}</span>
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {r.status === 'قيد الانتظار' ? (
                  <>
                    <button onClick={() => handleAction(r.id, 'تم القبول ✔️')} style={{ padding: '6px 12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px', fontWeight: 'bold' }}>قبول</button>
                    <button onClick={() => handleAction(r.id, 'مرفوض ❌')} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>رفض</button>
                  </>
                ) : (
                  <span style={{ color: '#777', fontSize: '14px' }}>تم اتخاذ القرار</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistrations;
