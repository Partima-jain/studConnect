import React from 'react';

const UniversityRepresentativeCounsellingPage: React.FC = () => (
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
        University Representative Counselling
      </h1>
      <p style={{
        fontSize: '1.13rem',
        color: '#1B0044',
        fontWeight: 500,
        marginBottom: '1.5rem'
      }}>
        Meet official university representatives for direct, up-to-date guidance on admissions, programs, scholarships, and campus life. Get your questions answered by the people who know the university best.
      </p>
      <ul style={{ fontSize: '1.08rem', color: '#5727A3', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
        <li>One-on-one or group sessions with university officials</li>
        <li>Clarify admission requirements and application process</li>
        <li>Explore available scholarships and funding options</li>
        <li>Get insights on campus facilities, student life, and support services</li>
        <li>Ask questions about your chosen program or university</li>
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
          Book a Session
        </a>
      </div>
    </div>
  </main>
);

export default UniversityRepresentativeCounsellingPage;
