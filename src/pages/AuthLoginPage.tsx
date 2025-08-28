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
      background: 'linear-gradient(135deg, #fff 0%, #D6C5F0 100%)'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.98)',
        padding: '2.5rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F044',
        minWidth: 340,
        maxWidth: 400,
        width: '100%',
        border: '2px solid #D6C5F0'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 800
        }}>Login</h2>
        <form onSubmit={submit} className="auth-form">
          <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
          <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} />
          {err && <div className="auth-error">{err}</div>}
          <button
            className="btn btn-primary"
            disabled={loading}
            style={{
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: 14,
              fontWeight: 700,
              border: 'none',
              boxShadow: '0 4px 16px #9F7AEA33, 0 1.5px 8px #5727A322',
              marginTop: 8,
              transition: 'background 0.2s, transform 0.2s'
            }}
          >
            {loading?'Please wait...':'Login'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Don't have an account?{' '}
          <a href="/auth/register" style={{
            color: '#5727A3',
            textDecoration: 'underline',
            fontWeight: 600
          }}>Sign up</a>
          <div style={{ marginTop: 8 }}>
            <a href="/auth/forgot-password" style={{
              color: '#9F7AEA',
              textDecoration: 'underline',
              fontWeight: 600
            }}>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginPage;
