import React, { useEffect, useState } from 'react';

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (window as any).__API_BASE__ ||
  'https://studconnect-backend.onrender.com';

interface Booking {
  booking_id: string | number;
  slot_date?: string;
  slot_day?: string;
  start_time?: string;
  end_time?: string;
  counsellor_email?: string;
  counsellor_name?: string;
  payment_status?: string;
  meeting_link?: string;
  charges?: number;
  created_at?: string;
  [key: string]: any;
}

const StudentBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIfNeeded = async (token: string) => {
      let userRaw = localStorage.getItem('user');
      if (!userRaw && token) {
        try {
          const resp = await fetch(`${API_BASE}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (resp.ok) {
            const userObj = await resp.json();
            localStorage.setItem('user', JSON.stringify(userObj));
            userRaw = JSON.stringify(userObj);
          }
        } catch {
        }
      }
      return userRaw;
    };

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        let token =
          (window.localStorage.getItem('sc_token')) ||
          (window.sessionStorage.getItem('sc_token')) ||
          ((window as any).user?.token) ||
          '';
        if (!token && typeof window !== 'undefined' && (window as any).user?.token) {
          token = (window as any).user.token;
        }

        let userRaw = await fetchUserIfNeeded(token);
        let userId = '';
        let userEmail = '';
        if (userRaw) {
          try {
            const userObj = JSON.parse(userRaw);
            userId = userObj?.id || '';
            userEmail = userObj?.email || '';
          } catch {}
        }
        // Build query params
        const params = new URLSearchParams();
        // Only send user_id if it's a valid integer
        if (userId && /^\d+$/.test(userId)) {
          params.append('user_id', userId);
        } else if (userEmail) {
          params.append('user_email', userEmail);
        } else {
          throw new Error('User not found. Please login again.');
        }

        const resp = await fetch(`${API_BASE}/peer-counsellors/student-bookings?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!resp.ok) throw new Error(await resp.text() || 'Failed to load bookings');
        const data = await resp.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e.message || 'Error loading bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (d?: string) => {
    if (!d) return '—';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main style={{ minHeight:'100vh',background:'#f9fafb',fontFamily:'Inter,system-ui,sans-serif',padding:'2.2rem 1.2rem' }}>
      <div style={{ maxWidth:820,margin:'0 auto',background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:'2rem 2rem 2.4rem',boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
        <h1 style={{ margin:0,fontSize:'1.6rem',fontWeight:800,letterSpacing:'-0.5px',color:'#111827' }}>My Bookings & Payments</h1>
        <div style={{ marginTop:'.6rem',fontSize:'.75rem',color:'#6b7280',fontWeight:600 }}>
          All your peer counselling sessions and payment history.
        </div>
        {loading && <div style={{ marginTop:'1.5rem',fontSize:'.85rem',color:'#374151' }}>Loading...</div>}
        {error && (
          <div style={{ marginTop:'1.5rem',background:'#fef2f2',border:'1px solid #fecaca',color:'#b91c1c',padding:'.8rem .95rem',borderRadius:8,fontSize:'.75rem',fontWeight:600,lineHeight:1.4 }}>
            {error}
          </div>
        )}
        {!loading && !error && bookings.length === 0 && (
          <div style={{ marginTop:'1.5rem',fontSize:'.85rem',color:'#374151' }}>No bookings found.</div>
        )}
        {!loading && !error && bookings.length > 0 && (
          <div style={{ marginTop:'1.4rem',display:'flex',flexDirection:'column',gap:'1.2rem' }}>
            {bookings.map(b => (
              <div key={b.booking_id} style={{ background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:10,padding:'1rem 1.1rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.7rem' }}>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Session Date</div>
                  <div style={{ fontSize:'.85rem',fontWeight:600,color:'#111827' }}>{formatDate(b.slot_date)}</div>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Day</div>
                  <div style={{ fontSize:'.85rem',fontWeight:600,color:'#111827' }}>{b.slot_day || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Time</div>
                  <div style={{ fontSize:'.85rem',fontWeight:600,color:'#111827' }}>
                    {b.start_time && b.end_time ? `${b.start_time} - ${b.end_time}` : '—'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Counsellor</div>
                  <div style={{ fontSize:'.85rem',fontWeight:600,color:'#111827' }}>
                    {b.counsellor_name || b.counsellor_email || '—'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Payment Status</div>
                  <span style={{
                    display:'inline-block',padding:'.25rem .6rem',borderRadius:6,fontSize:'.65rem',fontWeight:700,
                    background: b.payment_status === 'paid' ? '#ecfdf5' : b.payment_status === 'failed' ? '#fef2f2' : '#f0f9ff',
                    color: b.payment_status === 'paid' ? '#065f46' : b.payment_status === 'failed' ? '#991b1b' : '#075985'
                  }}>
                    {b.payment_status || '—'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Charges</div>
                  <div style={{ fontSize:'.85rem',fontWeight:600,color:'#111827' }}>₹{b.charges || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize:'.7rem',fontWeight:700,color:'#6b7280' }}>Meeting Link</div>
                  {b.meeting_link ? (
                    <a href={b.meeting_link} target="_blank" rel="noopener noreferrer" style={{ color:'#2563eb',fontWeight:600,wordBreak:'break-all' }}>Join</a>
                  ) : (
                    <span style={{ color:'#6b7280' }}>Not available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop:'2rem',fontSize:'.6rem',color:'#6b7280',lineHeight:1.4 }}></div>
          If you have questions about your bookings or payments, <a href="mailto:hello@yournextuniversity.com" style={{ color:'#2563eb',textDecoration:'underline' }}>contact support</a>.
        </div>
    </main>
  );
};

export default StudentBookings;
