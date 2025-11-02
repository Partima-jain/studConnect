import React from 'react';

const roles = [
  "Marketing & Brand Strategy Interns",
  "Social Media Strategists",
  "Influencers looking for roles",
  "Professional Education Counsellors",
  "Frontend / Backend Developers",
  "Partnerships & University Relations Executives"
];

const CareerPage: React.FC = () => (
  <main
    style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 70% 0%, #e0c3fc 0%, #b790f3 35%, #f0e6ff 70%, #fff 100%)',
      paddingTop: '90px',
      paddingBottom: '2rem',
      fontFamily: 'Inter, Arial, sans-serif'
    }}
  >
    <section
      style={{
        margin: '3rem auto 0 auto',
        background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 32px #9F7AEA22',
        padding: '2.7rem 2rem 2.7rem 2rem',
        color: '#1B0044',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blob */}
      <div style={{
        position: 'absolute',
        left: -80,
        top: -80,
        width: 180,
        height: 180,
        background: 'radial-gradient(circle at 60% 40%, #9F7AEA33 0%, #fff0 100%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        opacity: 0.7,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: -80,
        bottom: -80,
        width: 180,
        height: 180,
        background: 'radial-gradient(circle at 40% 60%, #5727A322 0%, #fff0 100%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none',
      }} />
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
        Join Our Mission
      </h1>
      <p style={{
        fontSize: '1.18rem',
        fontWeight: 500,
        marginBottom: '1.2rem',
        color: '#1B0044',
        lineHeight: 1.6
      }}>
        At <b>Your Next University</b>, we’re reimagining how students explore, compare, and connect with global universities.<br />
        We’re transforming the international education landscape—and we’re looking for passionate people who share our vision.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2.2rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        margin: '2.2rem 0 2.2rem 0'
      }}>
        <div style={{
          flex: 1,
          minWidth: 220,
          background: 'linear-gradient(120deg,#fff 60%,#D6C5F0 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 24px #9F7AEA11',
          padding: '1.7rem 1.2rem 1.2rem 1.2rem',
          textAlign: 'left',
          position: 'relative',
          zIndex: 1,
          marginBottom: '1.2rem'
        }}>
          <h2 style={{
            fontSize: '1.18rem',
            fontWeight: 800,
            color: '#9F7AEA',
            marginBottom: '1.1rem',
            textAlign: 'left'
          }}>
            Why Work With Us
          </h2>
          <ul style={{
            fontSize: '1.08rem',
            fontWeight: 500,
            color: '#1B0044',
            paddingLeft: '1.2rem',
            margin: 0
          }}>
            <li><b>Global Impact:</b> Help students across the world find their ideal academic path.</li>
            <li><b>Innovative Environment:</b> Work with cutting-edge tools in AI, analytics, and student success.</li>
            <li><b>Collaborative Culture:</b> We believe in open ideas, shared growth, and mutual respect.</li>
            <li><b>Growth Opportunities:</b> Whether you’re a creator, strategist, or tech enthusiast you’ll grow faster here.</li>
          </ul>
        </div>
        <div style={{
          flex: 1,
          minWidth: 220,
          background: 'linear-gradient(120deg,#fff 60%,#D6C5F0 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 24px #9F7AEA11',
          padding: '1.7rem 1.2rem 1.2rem 1.2rem',
          textAlign: 'left',
          position: 'relative',
          zIndex: 1,
          marginBottom: '1.2rem'
        }}>
          <h2 style={{
            fontSize: '1.18rem',
            fontWeight: 800,
            color: '#5727A3',
            marginBottom: '1.1rem',
            textAlign: 'left'
          }}>
            Open Roles
          </h2>
          <ul style={{
            fontSize: '1.08rem',
            fontWeight: 500,
            color: '#1B0044',
            paddingLeft: '1.2rem',
            margin: 0
          }}>
            {roles.map(role => <li key={role}>{role}</li>)}
          </ul>
        </div>
      </div>
      <div style={{
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        color: '#fff',
        borderRadius: 14,
        padding: '1.3rem 1.7rem',
        fontWeight: 700,
        fontSize: '1.18rem',
        margin: '1.2rem 0 0 0',
        boxShadow: '0 2px 8px #9F7AEA22',
        textAlign: 'center',
        letterSpacing: '.01em'
      }}>
        To Apply: Send your resume and a short note about why you’d like to join us at <a href="mailto:Hello@yournextuniversity.com" style={{color:'#fff',textDecoration:'underline'}}>Hello@yournextuniversity.com</a>
      </div>
    </section>
    <style>{`
      @media (max-width: 900px) {
        section {
          flex-direction: column !important;
          gap: 1.2rem !important;
        }
        section > div {
          min-width: 0 !important;
          width: 100% !important;
        }
      }
      @media (max-width: 600px) {
        section {
          padding: 1.2rem .7rem 1.2rem .7rem !important;
        }
        h1 {
          font-size: 1.5rem !important;
        }
        h2 {
          font-size: 1.08rem !important;
        }
        div {
          font-size: .98rem !important;
        }
      }
    `}</style>
  </main>
);

export default CareerPage;
