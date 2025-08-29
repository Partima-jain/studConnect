import React from 'react';

export const Footer: React.FC = () => (
  <footer
    className="footer"
    style={{
      // Updated background to match hero section's blue/purple palette
      background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
      borderTop: '1.5px solid #e0e7ff',
      padding: '2.7rem 0 1.2rem 0',
      marginTop: '3rem',
      fontSize: '1.05rem',
    }}
  >
    <div
      className="container footer__inner"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '2.5rem 1.5rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Brand & tagline */}
      <div style={{ minWidth: 220, flex: '1 1 220px' }}>
        <span
          style={{
            fontWeight: 900,
            fontSize: '1.35rem',
            color: '#fff',
            letterSpacing: '-1px',
            display: 'inline-block',
            marginBottom: '.3rem',
          }}
        >
          StudConnect
        </span>
        <p className="muted" style={{ color: '#e0e7ff', margin: 0, fontSize: '.98rem', maxWidth: 320 }}>
          Empowering students to study abroad with clarity & confidence.
        </p>
        <div style={{ marginTop: '1.1rem', display: 'flex', gap: '1.1rem' }}>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/studconnect" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#9F7AEA', display: 'inline-flex' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#334155"/><path d="M8.25 17V10.75M8.25 10.75V9.75C8.25 9.33579 8.58579 9 9 9H9.01C9.42421 9 9.76 9.33579 9.76 9.75V10.75M8.25 10.75H9.76M12 17V13.5C12 13.0858 12.3358 12.75 12.75 12.75H13.25C13.6642 12.75 14 13.0858 14 13.5V17M16 17V13.5C16 12.1193 14.8807 11 13.5 11C12.1193 11 11 12.1193 11 13.5V17" stroke="#9F7AEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="8.5" r="1" fill="#9F7AEA"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/studconnect" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#9F7AEA', display: 'inline-flex' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#334155"/><rect x="7" y="7" width="10" height="10" rx="4" stroke="#9F7AEA" strokeWidth="1.5"/><circle cx="12" cy="12" r="2.5" stroke="#9F7AEA" strokeWidth="1.5"/><circle cx="15.5" cy="8.5" r="0.7" fill="#9F7AEA"/></svg>
          </a>
        </div>
      </div>
      {/* Explore links */}
      <div style={{ minWidth: 160, flex: '1 1 120px' }}>
        <div style={{ fontWeight: 700, color: '#fff', marginBottom: '.7rem', fontSize: '1.07rem' }}>Explore</div>
        <nav className="footer__nav" style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', fontWeight: 500 }}>
          <a href="#services" style={{ color: '#e0e7ff', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#9F7AEA')} onMouseOut={e => (e.currentTarget.style.color = '#e0e7ff')}>Services</a>
          <a href="#universities" style={{ color: '#e0e7ff', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#9F7AEA')} onMouseOut={e => (e.currentTarget.style.color = '#e0e7ff')}>Universities</a>
          <a href="#how-it-works" style={{ color: '#e0e7ff', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#9F7AEA')} onMouseOut={e => (e.currentTarget.style.color = '#e0e7ff')}>How It Works</a>
          <a href="#testimonials" style={{ color: '#e0e7ff', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#9F7AEA')} onMouseOut={e => (e.currentTarget.style.color = '#e0e7ff')}>Success Stories</a>
          <a href="#contact" style={{ color: '#e0e7ff', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#9F7AEA')} onMouseOut={e => (e.currentTarget.style.color = '#e0e7ff')}>Contact</a>
        </nav>
      </div>
      {/* Contact details */}
      <div style={{ minWidth: 180, flex: '1 1 120px' }}>
        <div style={{ fontWeight: 700, color: '#fff', marginBottom: '.7rem', fontSize: '1.07rem' }}>Contact</div>
        <div style={{ color: '#e0e7ff', fontSize: '.99rem', marginBottom: '.4rem' }}>
          <span style={{ fontWeight: 500 }}>Email:</span>{' '}
          <a href="mailto:hello@studconnect.co" style={{ color: '#9F7AEA', textDecoration: 'none' }}>hello@studconnect.co</a>
        </div>
        <div style={{ color: '#e0e7ff', fontSize: '.99rem' }}>
          <span style={{ fontWeight: 500 }}>WhatsApp:</span>{' '}
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ color: '#9F7AEA', textDecoration: 'none' }}>+91 99999 99999</a>
        </div>
      </div>
    </div>
    <div
      style={{
        maxWidth: 1200,
        margin: '2.2rem auto 0 auto',
        borderTop: '1px solid #e0e7ff',
        paddingTop: '1.1rem',
        textAlign: 'center',
        color: '#e0e7ff',
        fontSize: '.97rem',
        letterSpacing: '.01em',
      }}
      className="footer__legal"
    >
      © {new Date().getFullYear()} <span style={{ color: '#fff', fontWeight: 700 }}>StudConnect</span>. All rights reserved.
    </div>
    <style>
      {`
        @media (max-width: 800px) {
          .footer__inner {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 2rem !important;
          }
        }
      `}
    </style>
  </footer>
);
