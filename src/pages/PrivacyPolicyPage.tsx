import React from 'react';

const PrivacyPolicyPage: React.FC = () => (
  <main
    style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 70% 0%, #e0c3fc 0%, #b790f3 35%, #f0e6ff 70%, #fff 100%)',
      paddingTop: '90px',
      paddingBottom: '2rem',
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative'
    }}
  >
    <section
      style={{
        margin: '3rem auto 0 auto',
        borderRadius: 40,
        boxShadow: '0 16px 48px #9F7AEA33, 0 2px 8px #D6C5F033',
        padding: '3.5rem 2.5vw 3.5rem 2.5vw',
        color: '#1B0044',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 900,
        color: '#5727A3',
        marginBottom: '1.2rem',
        letterSpacing: '-2px',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Privacy Policy
      </h1>
      <div style={{ fontSize: '1.13rem', marginBottom: '2.2rem', color: '#5727A3', fontWeight: 700 }}>
        Last Updated: November 2025
      </div>
      <p style={{ fontSize: '1.13rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
        Your Next University (“we,” “our,” “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, platform, or services.
      </p>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>1. Information We Collect</h2>
      <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <li><b>Personal Information:</b> Name, email, contact number, nationality, academic background, etc.</li>
        <li><b>Usage Data:</b> Pages visited, time spent on pages, IP address, browser type, and cookies.</li>
        <li><b>Application Data:</b> Information submitted while exploring or applying to partner universities.</li>
      </ul>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>2. How We Use Your Information</h2>
      <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <li>To match students with universities and programs that fit their profiles.</li>
        <li>To personalize user experiences and improve our services.</li>
        <li>To send updates, newsletters, or offers (only with consent).</li>
        <li>To comply with legal or regulatory obligations.</li>
      </ul>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>3. Data Sharing</h2>
      <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <li>Partner universities or education consultants for application processing.</li>
        <li>Technology and analytics providers that help improve our platform.</li>
        <li>Legal authorities when required by law.</li>
        <li><b>We never sell your personal information to third parties.</b></li>
      </ul>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>4. Data Retention</h2>
      <p style={{ fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
        We retain user information as long as necessary to fulfill the purpose for which it was collected or as required by law.
      </p>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>5. Your Rights</h2>
      <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <li>Access, update, or delete your data.</li>
        <li>Withdraw consent for communications.</li>
        <li>Request data portability or corrections.</li>
        <li>To exercise your rights, email <a href="mailto:privacy@yournextuniversity.com" style={{ color: '#5727A3', textDecoration: 'underline' }}>privacy@yournextuniversity.com</a>.</li>
      </ul>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>6. Cookies</h2>
      <p style={{ fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
        We use cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings.
      </p>
      <h2 style={{ fontSize: '1.18rem', color: '#5727A3', fontWeight: 800, marginBottom: '0.7rem' }}>7. Updates</h2>
      <p style={{ fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
        We may update this Privacy Policy periodically. Updates will be reflected on this page with a revised “Last Updated” date.
      </p>
    </section>
    <style>{`
      @media (max-width: 900px) {
        section {
          padding: 2rem 1rem 2rem 1rem !important;
        }
        h1 {
          font-size: 2rem !important;
        }
      }
      @media (max-width: 600px) {
        section {
          padding: 1.2rem .7rem 1.2rem .7rem !important;
        }
        h1 {
          font-size: 1.3rem !important;
        }
        h2 {
          font-size: 1.08rem !important;
        }
        div, ul, p {
          font-size: .98rem !important;
        }
      }
    `}</style>
  </main>
);

export default PrivacyPolicyPage;
