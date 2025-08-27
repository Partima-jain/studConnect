import React from 'react';

export const Footer: React.FC = () => (
  <footer
    className="footer"
    style={{
      background: 'linear-gradient(90deg, rgb(30, 41, 59) 0%, rgb(0 6 13) 100%)',
      borderTop: '1.5px solid #334155',
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
            color: 'rgb(207 218 232)',
            letterSpacing: '-1px',
            display: 'inline-block',
            marginBottom: '.3rem',
          }}
        >
          StudConnect
        </span>
        <p className="muted" style={{ color: '#cbd5e1', margin: 0, fontSize: '.98rem', maxWidth: 320 }}>
          Empowering students to study abroad with clarity & confidence.
        </p>
        <div style={{ marginTop: '1.1rem', display: 'flex', gap: '1.1rem' }}>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/studconnect" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#60a5fa', display: 'inline-flex' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#334155"/><path d="M8.25 17V10.75M8.25 10.75V9.75C8.25 9.33579 8.58579 9 9 9H9.01C9.42421 9 9.76 9.33579 9.76 9.75V10.75M8.25 10.75H9.76M12 17V13.5C12 13.0858 12.3358 12.75 12.75 12.75H13.25C13.6642 12.75 14 13.0858 14 13.5V17M16 17V13.5C16 12.1193 14.8807 11 13.5 11C12.1193 11 11 12.1193 11 13.5V17" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="8.5" r="1" fill="#60a5fa"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/studconnect" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#60a5fa', display: 'inline-flex' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#334155"/><rect x="7" y="7" width="10" height="10" rx="4" stroke="#60a5fa" strokeWidth="1.5"/><circle cx="12" cy="12" r="2.5" stroke="#60a5fa" strokeWidth="1.5"/><circle cx="15.5" cy="8.5" r="0.7" fill="#60a5fa"/></svg>
          </a>
        </div>
      </div>
      {/* Explore links */}
      <div style={{ minWidth: 160, flex: '1 1 120px' }}>
        <div style={{ fontWeight: 700, color: 'rgb(207 218 232)', marginBottom: '.7rem', fontSize: '1.07rem' }}>Explore</div>
        <nav className="footer__nav" style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', fontWeight: 500 }}>
          <a href="#services" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')} onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}>Services</a>
          <a href="#universities" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')} onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}>Universities</a>
          <a href="#how-it-works" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')} onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}>How It Works</a>
          <a href="#testimonials" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')} onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}>Success Stories</a>
          <a href="#contact" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')} onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}>Contact</a>
        </nav>
      </div>
      {/* Contact details */}
      <div style={{ minWidth: 180, flex: '1 1 120px' }}>
        <div style={{ fontWeight: 700, color: 'rgb(207 218 232)', marginBottom: '.7rem', fontSize: '1.07rem' }}>Contact</div>
        <div style={{ color: '#cbd5e1', fontSize: '.99rem', marginBottom: '.4rem' }}>
          <span style={{ fontWeight: 500 }}>Email:</span>{' '}
          <a href="mailto:hello@studconnect.co" style={{ color: '#60a5fa', textDecoration: 'none' }}>hello@studconnect.co</a>
        </div>
        <div style={{ color: '#cbd5e1', fontSize: '.99rem' }}>
          <span style={{ fontWeight: 500 }}>WhatsApp:</span>{' '}
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>+91 99999 99999</a>
        </div>
      </div>
    </div>
    <div
      style={{
        maxWidth: 1200,
        margin: '2.2rem auto 0 auto',
        borderTop: '1px solid #475569',
        paddingTop: '1.1rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '.97rem',
        letterSpacing: '.01em',
      }}
      className="footer__legal"
    >
      © {new Date().getFullYear()} <span style={{ color: '#60a5fa', fontWeight: 700 }}>StudConnect</span>. All rights reserved.
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
