import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PeerCounsellingBillingPage: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();

  let { counsellor, slot, bookingId, user } = location.state || {};

  if (!counsellor || !slot || !bookingId) {
    const params = new URLSearchParams(location.search);
    try {
      counsellor = params.get('counsellor') ? JSON.parse(params.get('counsellor') as string) : undefined;
      slot = params.get('slot') ? JSON.parse(params.get('slot') as string) : undefined;
      bookingId = params.get('bookingId');
      user = params.get('user') ? JSON.parse(params.get('user') as string) : undefined;
    } catch {}
  }

  // Billing form state
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [address, setAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [business, setBusiness] = useState(false);

  const priceINR = Number(counsellor?.charges) || 699;
  const usdRate = 88.7;
  const priceUSD = priceINR / usdRate;
  const taxINR = 0;
  const subtotalINR = priceINR;
  const totalINR = priceINR - (discountApplied ? 50 : 0); // Example: ₹50 discount
  const totalUSD = (totalINR / usdRate).toFixed(2);

  // Discount handler (dummy)
  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'save50') {
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  // Continue to payment handler
  const handleContinue = () => {
    if (!fullName || !email) {
      alert('Please enter your name and email.');
      return;
    }
    nav('/peer-counselling/payment', {
      state: { counsellor, slot, bookingId, user, fullName, email, phone, country, address, business, totalINR }
    });
  };

  // If still missing, show error
  if (!counsellor || !slot || !bookingId) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center', color: '#5727A3' }}>
        <h2>Billing Details</h2>
        <p>Missing booking/session details. Please start your booking again.</p>
        <button
          style={{
            background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
            color: '#fff',
            borderRadius: 10,
            padding: '0.8rem 2.2rem',
            fontWeight: 700,
            fontSize: '1.09rem',
            border: 'none',
            marginTop: '1.2rem'
          }}
          onClick={() => nav('/peer-counselling')}
        >
          Back to Counsellors
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg,#F8FAFC 0%,#fff 100%)',
        paddingTop: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px #9F7AEA22',
        border: '1.5px solid #e0e7ff',
        padding: '2.5rem 2rem',
        maxWidth: 900,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '2.5rem',
        fontFamily: 'Inter, Arial, sans-serif',
        position: 'relative'
      }}>
        {/* Left: Order Summary */}
        <div style={{
          flex: '0 0 340px',
          maxWidth: 340,
          minWidth: 260,
          width: '100%',
          borderRight: '1px solid #e5e7eb',
          paddingRight: '2rem'
        }}>
          <h2 style={{
            color: '#5727A3',
            fontWeight: 900,
            fontSize: '1.45rem',
            marginBottom: '1.2rem',
            textAlign: 'left'
          }}>Peer Counseling Booking</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '1.09rem',
            marginBottom: '1.1rem'
          }}>
            <span>Peer Counseling Booking</span>
            <span>Qty: 1</span>
          </div>
          <div style={{
            fontWeight: 700,
            fontSize: '1.18rem',
            color: '#000000ff',
            marginBottom: '.5rem'
          }}>
            ₹{priceINR.toFixed(2)} <span style={{ fontWeight: 400, fontSize: '.98rem', color: '#64748b' }}>(tax incl.)</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '.97rem', marginBottom: '1.1rem' }}>
            To book sessions for peer counseling.
          </div>
          <hr style={{ margin: '1.2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 700, color: '#5727A3', fontSize: '1.07rem' }}>Have a discount code?</label>
            <div style={{ display: 'flex', gap: '.7rem', marginTop: '.5rem' }}>
              <input
                type="text"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value)}
                placeholder="Apply Discount"
                style={{
                  flex: 1,
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem'
                }}
                disabled={discountApplied}
              />
              <button
                style={{
                  background: discountApplied ? '#22c55e' : 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  color: '#fff',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '1.07rem',
                  padding: '.7rem 1.2rem',
                  border: 'none',
                  cursor: discountApplied ? 'not-allowed' : 'pointer'
                }}
                onClick={handleApplyDiscount}
                disabled={discountApplied}
              >
                {discountApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {discountApplied && (
              <div style={{ color: '#22c55e', fontWeight: 600, marginTop: '.5rem' }}>
                Discount applied: ₹50.00
              </div>
            )}
          </div>
          <hr style={{ margin: '1.2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <div style={{ marginBottom: '.7rem', fontWeight: 600, fontSize: '1.07rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span>₹{subtotalINR.toFixed(2)}</span>
          </div>
          <div style={{ marginBottom: '.7rem', fontWeight: 600, fontSize: '1.07rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax</span>
            <span>₹{taxINR.toFixed(2)}</span>
          </div>
          <div style={{ marginBottom: '.7rem', fontWeight: 700, fontSize: '1.09rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Total due now</span>
            <span>₹{totalINR.toFixed(2)}</span>
          </div>
          <div style={{ marginBottom: '1.2rem', fontWeight: 600, fontSize: '1.07rem', display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Amount in USD</span>
            <span>${totalUSD}</span>
          </div>
        </div>
        {/* Right: Billing Form */}
        <div style={{
          flex: 1,
          minWidth: 0,
          paddingLeft: '2rem'
        }}>
          <div style={{ fontWeight: 700, color: '#5727A3', fontSize: '1.13rem', marginBottom: '.7rem' }}>
            Customer Contact Information
          </div>
          <form autoComplete="off" style={{ marginBottom: '1.2rem' }}>
            <div style={{ marginBottom: '.7rem' }}>
              <label style={{ fontWeight: 600, fontSize: '1.07rem' }}>Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder=""
                required
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem',
                  marginTop: '.3rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '.7rem' }}>
              <label style={{ fontWeight: 600, fontSize: '1.07rem' }}>Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=""
                required
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem',
                  marginTop: '.3rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '.7rem' }}>
              <label style={{ fontWeight: 600, fontSize: '1.07rem' }}>Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder=""
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem',
                  marginTop: '.3rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '.7rem' }}>
              <label style={{ fontWeight: 600, fontSize: '1.07rem' }}>Country</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem',
                  marginTop: '.3rem'
                }}
              >
                <option>United States</option>
                <option>India</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: '.7rem' }}>
              <label style={{ fontWeight: 600, fontSize: '1.07rem' }}>Billing address *</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder=""
                required
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e0e7ff',
                  fontSize: '1.07rem',
                  marginTop: '.3rem'
                }}
              />
              <div style={{ fontSize: '.95rem', color: '#64748b', marginTop: '.3rem', cursor: 'pointer' }}>
                Enter address manually
              </div>
            </div>
            <div style={{ marginBottom: '.7rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
              <input
                type="checkbox"
                checked={business}
                onChange={e => setBusiness(e.target.checked)}
                id="business"
                style={{ width: 18, height: 18 }}
              />
              <label htmlFor="business" style={{ fontWeight: 600, fontSize: '1.07rem', cursor: 'pointer' }}>
                Purchasing as a business
              </label>
            </div>
          </form>
          <button
            style={{
              background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.09rem',
              borderRadius: 10,
              padding: '0.8rem 2.2rem',
              minWidth: 170,
              boxShadow: '0 6px 24px #a78bfa44, 0 2px 8px #9F7AEA22',
              marginBottom: '.7rem',
              width: '100%'
            }}
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
          <div style={{
            fontSize: '.92rem',
            color: '#64748b',
            marginTop: '1.2rem',
            textAlign: 'center'
          }}>
            This order process is conducted by our online reseller & Merchant of Record, <b>dodopayments.com</b>, who also handles order-related inquiries and returns.
          </div>
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            justifyContent: 'center',
            marginTop: '.7rem',
            fontSize: '.92rem',
            color: '#64748b'
          }}>
            <span>Dodo Payments</span>
            <a href="https://dodopayments.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#5727A3', textDecoration: 'underline' }}>Privacy</a>
            <a href="https://dodopayments.com/buyer-terms" target="_blank" rel="noopener noreferrer" style={{ color: '#5727A3', textDecoration: 'underline' }}>Terms</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PeerCounsellingBillingPage;

// (No router setup or import statements for PeerCounsellingBillingPage below this line)
