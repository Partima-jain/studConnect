import React, { useState } from 'react';

const PeerCounsellingBillingPage = () => {
  // Billing form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [business, setBusiness] = useState(false);

  const priceINR = 699;
  const usdRate = 88.7;
  const taxINR = 0;
  const subtotalINR = priceINR;
  const totalINR = priceINR - (discountApplied ? 50 : 0);
  const totalUSD = (totalINR / usdRate).toFixed(2);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'save50') {
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleContinue = () => {
    if (!fullName || !email) {
      alert('Please enter your name and email.');
      return;
    }
    alert('Proceeding to payment...');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fafafa',
        padding: '2rem 1rem',
        paddingTop: '120px', // Add top padding for navbar
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}
      >
        {/* Left Side - Order Summary */}
        <div style={{top: '2rem' }}>
          {/* Header with Pay in USD */}
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#e9d5ff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#7c3aed'
                }}
              >
                Y
              </div>
              <span style={{ fontWeight: '600', fontSize: '1rem', color: '#1f2937' }}>
                YourNextUniversity
              </span>
            </div>
            <select
              style={{
                padding: '0.5rem 2rem 0.5rem 0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#374151',
                background: 'white',
                cursor: 'pointer',
                appearance: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center'
              }}
            >
              <option>Pay in USD</option>
              <option>Pay in INR</option>
            </select>
          </div>

          {/* Product Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                Peer Counseling Booking
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                ₹699.00 <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#6b7280' }}>(tax incl.)</span>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              To book sessions for peer counseling.
            </div>
          </div>

          {/* Discount Code */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Have a discount code?
              </div>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#111827',
                  cursor: 'pointer',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => {
                  const code = prompt('Enter discount code:');
                  if (code) {
                    setDiscountCode(code);
                    handleApplyDiscount();
                  }
                }}
              >
                Apply discount code
              </button>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Subtotal</span>
              <span style={{ color: '#111827', fontWeight: '500' }}>₹{subtotalINR.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Tax</span>
              <span style={{ color: '#111827', fontWeight: '500' }}>₹{taxINR.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
                fontSize: '1rem'
              }}
            >
              <span style={{ color: '#111827', fontWeight: '600' }}>Total</span>
              <span style={{ color: '#111827', fontWeight: '700' }}>₹{totalINR.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <span style={{ color: '#6b7280' }}>Total in USD</span>
              <span style={{ color: '#111827', fontWeight: '600' }}>${totalUSD}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
            Contact Information
          </h2>

          <div>
            {/* Full Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="eg. John Doe"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email and Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="eg. john.doe@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Phone (optional)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    style={{
                      padding: '0.625rem 1.5rem 0.625rem 0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      background: 'white',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23374151\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.375rem center',
                      minWidth: '70px'
                    }}
                  >
                    <option value="US">🇺🇸</option>
                    <option value="IN">🇮🇳</option>
                    <option value="GB">🇬🇧</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1"
                    style={{
                      flex: 1,
                      padding: '0.625rem 0.875rem',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Billing address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  background: 'white',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option>United States</option>
                <option>India</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Address Line"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  boxSizing: 'border-box'
                }}
              />
              <div
                style={{
                  fontSize: '0.813rem',
                  color: '#6b7280',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Enter address manually
              </div>
            </div>

            {/* Business Checkbox */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={business}
                onChange={e => setBusiness(e.target.checked)}
                id="business"
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="business" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                Purchasing as a business
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: '#111827',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '1.5rem'
              }}
            >
              Continue to Payment
            </button>

            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5' }}>
              This order process is conducted by our online reseller & Merchant of Record,{' '}
              <span style={{ fontWeight: '600' }}>dodopayments.com</span>, who also handles order-related inquiries and returns.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                <img
                  src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Brandmark.png"
                  alt="Dodo Payments"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '2px'
                  }}
                />
                Dodo Payments
              </span>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerCounsellingBillingPage;