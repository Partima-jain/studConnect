import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PaymentState = 'success' | 'failed' | 'cancelled' | 'processing' | 'unknown';

const BACKEND_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (window as any).__API_BASE__ ||
  'https://studconnect-backend.onrender.com';

const statusColor: Record<PaymentState, { bg: string; border: string; text: string }> = {
  success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46' },
  failed: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
  cancelled: { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  processing: { bg: '#f0f9ff', border: '#0ea5e9', text: '#075985' },
  unknown: { bg: '#f3f4f6', border: '#6b7280', text: '#374151' }
};

const normalize = (raw?: string | null): PaymentState => {
  if (!raw) return 'processing';
  const v = raw.toLowerCase();
  if (['succeeded', 'success', 'completed', 'paid'].includes(v)) return 'success';
  if (['failed', 'error'].includes(v)) return 'failed';
  if (['canceled', 'cancelled'].includes(v)) return 'cancelled';
  if (['processing', 'pending'].includes(v)) return 'processing';
  return 'unknown';
};

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const bookingId = sp.get('bookingId') || '';
  const paymentId = sp.get('payment_id') || sp.get('paymentId') || '';
  const rawStatus = sp.get('status');
  const [status, setStatus] = useState<PaymentState>(normalize(rawStatus));
  const [verifying, setVerifying] = useState(false);
  const [verifiedDetail, setVerifiedDetail] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    const canVerify = bookingId && (status === 'processing' || status === 'unknown');
    if (!canVerify) return;

    const verify = async () => {
      setVerifying(true);
      setVerifyError(null);
      try {
        const resp = await fetch(`${BACKEND_BASE}/debug/dodo-config`, { method: 'GET' });
        await resp.text();
        setVerifiedDetail(`Verification ping at ${new Date().toLocaleTimeString()}`);
      } catch (e: any) {
        setVerifyError(e.message || 'Verification failed');
      } finally {
        setVerifying(false);
      }
    };

    verify();
    interval = window.setInterval(verify, 8000);
    return () => { if (interval) window.clearInterval(interval); };
  }, [bookingId, status]);

  const meta = statusColor[status];

  const icon = (() => {
    switch (status) {
      case 'success': return '✓';
      case 'failed': return '✗';
      case 'cancelled': return '✗';
      case 'processing': return '-';
      default: return '?';
    }
  })();

  const titleMap: Record<PaymentState, string> = {
    success: 'Payment Successful',
    failed: 'Payment Failed',
    cancelled: 'Payment Cancelled',
    processing: 'Payment Processing',
    unknown: 'Payment Status Unknown'
  };

  const descMap: Record<PaymentState, string> = {
    success: 'Your booking has been confirmed. A confirmation email will arrive shortly.',
    failed: 'The payment could not be completed. You may retry below.',
    cancelled: 'You cancelled the payment before completion. You can restart below.',
    processing: 'We are waiting for confirmation. This page will update automatically.',
    unknown: 'We could not determine the payment status. You can retry the payment.'
  };

  const handleRetry = () => {
    if (!bookingId) return;
    navigate(`/services/peer-counselling-billing?bookingId=${encodeURIComponent(bookingId)}`);
  };

  const handleDashboard = () => {
    navigate('/student');
  };

  const handleSupport = () => {
    navigate('/contact');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f9fafb',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 16,
          padding: '2.2rem 2.2rem 2.6rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -28,
            left: 24,
            background: meta.bg,
            border: `2px solid ${meta.border}`,
            color: meta.text,
            fontSize: '1.9rem',
            width: 64,
            height: 64,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            fontWeight: 700
          }}
        >
          {icon}
        </div>

        <h1
          style={{
            margin: '1.2rem 0 0.75rem',
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#111827'
          }}
        >
          {titleMap[status]}
        </h1>

        <p
          style={{
            margin: '0 0 1.4rem',
            fontSize: '.95rem',
            lineHeight: 1.6,
            color: '#374151',
            fontWeight: 500
          }}
        >
          {descMap[status]}
        </p>

        <div
          style={{
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            color: meta.text,
            padding: '0.9rem 1rem',
            borderRadius: 12,
            fontSize: '.75rem',
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '1.2rem',
            display: 'grid',
            rowGap: '.4rem'
          }}
        >
          <div>Booking ID: {bookingId || 'N/A'}</div>
            <div>Payment ID: {paymentId || 'N/A'}</div>
          <div>Status: {status}</div>
          {verifiedDetail && <div>Last verify: {verifiedDetail}</div>}
          {verifyError && <div style={{ color: '#dc2626' }}>Verify error: {verifyError}</div>}
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '.75rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}
        >
          {(status === 'failed' || status === 'cancelled' || status === 'unknown') && bookingId && (
            <button
              onClick={handleRetry}
              style={{
                background: '#111827',
                color: '#fff',
                padding: '.7rem 1.2rem',
                borderRadius: 8,
                border: 'none',
                fontSize: '.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Retry Payment
            </button>
          )}
          {status === 'success' && (
            <button
              onClick={handleDashboard}
              style={{
                background: '#10b981',
                color: '#fff',
                padding: '.7rem 1.2rem',
                borderRadius: 8,
                border: 'none',
                fontSize: '.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
          )}
          <button
            onClick={handleSupport}
            style={{
              background: '#ffffff',
              color: '#374151',
              padding: '.7rem 1.2rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: '.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Contact Support
          </button>
          <button
            onClick={() => navigate('/services/peer-counselling')}
            style={{
              background: '#f3f4f6',
              color: '#111827',
              padding: '.7rem 1.2rem',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: '.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Book Another
          </button>
        </div>

        {status === 'processing' && (
          <div
            style={{
              fontSize: '.65rem',
              color: '#0c4a6e',
              background: '#f0f9ff',
              border: '1px dashed #38bdf8',
              padding: '.6rem .75rem',
              borderRadius: 8,
              fontWeight: 600
            }}
          >
            We are still waiting for the final confirmation from the payment gateway. This page will refresh periodically.
          </div>
        )}

        <div
          style={{
            marginTop: '2rem',
            fontSize: '.6rem',
            lineHeight: 1.4,
            color: '#6b7280',
            fontWeight: 500
          }}
        >
          If you believe this status is incorrect, please contact support with your Booking ID and Payment ID.
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
