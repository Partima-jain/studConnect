import React from 'react';

const AirportPickupPage: React.FC = () => (
  <main style={{
    paddingTop: '90px',
    minHeight: '100vh',
    background: 'radial-gradient(at 70% 0%, #e0c3fc 0%, #f0e6ff 70%, #fff 100%)'
  }}>
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F044',
      padding: '2.5rem 2rem',
      border: '2px solid #D6C5F0'
    }}>
      <h1 style={{
        fontSize: '2.1rem',
        fontWeight: 900,
        color: '#5727A3',
        marginBottom: '1.2rem',
        letterSpacing: '-1px',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Airport Pickup Service
      </h1>
      <p style={{
        fontSize: '1.13rem',
        color: '#1B0044',
        fontWeight: 500,
        marginBottom: '1.5rem'
      }}>
        Arrive in your new country with confidence! Our airport pickup service ensures a smooth and safe transition from the airport to your accommodation.
      </p>
      <ul style={{ fontSize: '1.08rem', color: '#5727A3', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
        <li>Meet & greet at the airport by a trusted representative</li>
        <li>Safe and comfortable transport to your accommodation</li>
        <li>Assistance with luggage and settling in</li>
        <li>24/7 support for unexpected delays or issues</li>
        <li>Peace of mind for students and parents</li>
      </ul>
      <div style={{
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <a
          href="/contact"
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            color: '#fff',
            borderRadius: 14,
            fontWeight: 700,
            border: 'none',
            boxShadow: '0 4px 16px #9F7AEA33, 0 1.5px 8px #5727A322',
            padding: '1rem 2.5rem',
            fontSize: '1.13rem',
            textDecoration: 'none'
          }}
        >
          Book Airport Pickup
        </a>
      </div>
    </div>
  </main>
);

export default AirportPickupPage;
