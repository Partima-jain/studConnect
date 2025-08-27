import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const AuthRegisterPage: React.FC = () => {
  const { register, loading, pendingEmail, user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email:'', password:'', full_name:'', role:'student' });
  const [err,setErr] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;
  if (pendingEmail) return <Navigate to={`/auth/verify?email=${encodeURIComponent(pendingEmail)}`} replace />;


  async function submit(e:React.FormEvent){
    e.preventDefault();
    setErr(null);
    try {
      await register(form.email, form.password, form.role as any, form.full_name);
      nav(`/auth/verify?email=${encodeURIComponent(form.email)}`);
    } catch (e:any){ setErr(e.message || 'Registration failed'); }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)'
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        minWidth: 340,
        maxWidth: 400,
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>Sign Up</h2>
        <form onSubmit={submit} className="auth-form">
          <input required placeholder="Full name" value={form.full_name} onChange={e=>setForm(f=>({...f, full_name:e.target.value}))} />
          <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
          <input required minLength={6} type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} />
          <select value={form.role} onChange={e=>setForm(f=>({...f, role:e.target.value}))}>
            <option value="student">Student</option>
            <option value="counsellor">Counsellor</option>
          </select>
          {err && <div className="auth-error">{err}</div>}
          <button className="btn btn-primary" disabled={loading}>{loading?'Please wait...':'Send OTP'}</button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Already have an account? <a href="/auth/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default AuthRegisterPage;
