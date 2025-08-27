import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthLoginPage: React.FC = () => {
  const { login, loading, user } = useAuth();
  const [form,setForm] = useState({ email:'', password:'' });
  const [err,setErr] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;

  async function submit(e:React.FormEvent){
    e.preventDefault();
    setErr(null);
    try {
      await login(form.email, form.password);
    } catch (e:any){ setErr(e.message || 'Login failed'); }
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
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>Login</h2>
        <form onSubmit={submit} className="auth-form">
          <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
          <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} />
          {err && <div className="auth-error">{err}</div>}
          <button className="btn btn-primary" disabled={loading}>{loading?'Please wait...':'Login'}</button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Don't have an account? <a href="/auth/register" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Sign up</a>
          <div style={{ marginTop: 8 }}>
            <a href="/auth/forgot-password" style={{ color: '#6366f1', textDecoration: 'underline' }}>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginPage;
