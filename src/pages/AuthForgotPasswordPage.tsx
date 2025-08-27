import React, { useState } from 'react';

// const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL = 'https://studconnect-backend.onrender.com';

const AuthForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to send OTP');
      setMessage('OTP sent to your email.');
      setStep('reset');
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp, new_password: newPassword }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to reset password');
      setMessage('Password reset successful. You can now log in.');
    } catch (err: any) {
      setError(err.message);
    }
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
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>Forgot Password</h2>
        {step === 'request' && (
          <form onSubmit={requestOtp} className="auth-form">
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button className="btn btn-primary" type="submit">Send OTP</button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={resetPassword} className="auth-form">
            <input
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <input
              required
              minLength={6}
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button className="btn btn-primary" type="submit">Reset Password</button>
          </form>
        )}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          <a href="/auth/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default AuthForgotPasswordPage;
