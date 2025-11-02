import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your subscription logic here
    setSubmitted(true);
  };

  return (
    <footer
      style={{
        position: 'relative',
        background: '#842DD8',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        color: '#e3e7f3',
        padding: 0,
        marginTop: 0,
        fontSize: '1.05rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <img
          src="https://framerusercontent.com/images/ukku4U0V7GWMAm5lemDMK2mjCzM.png?lossless=1"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: 0,
            display: 'block',
          }}
          loading="lazy"
          decoding="async"
        />
        {/* Unique blurred orb */}
        <div
          style={{
            position: 'absolute',
            left: '60%',
            top: '60%',
            width: 340,
            height: 340,
            background: 'radial-gradient(circle at 60% 40%, #fff 0%, #9F7AEA 60%, #842DD8 100%)',
            opacity: 0.18,
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: 'auto',
          padding: '4.5rem 1.5rem 2.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {/* Heading */}
        <h2
          style={{
            color: '#e3e7f3',
            fontWeight: 900,
            fontSize: '2.1rem',
            margin: 0,
            marginBottom: '1.1rem',
            letterSpacing: '-1px',
          }}
        >
          Your Journey. Your Dreams. <br />Your Next University.
        </h2>
        {/* Subtitle */}
        <p
          style={{
            color: 'rgba(227,231,243,0.7)',
            fontSize: '1.13rem',
            margin: 0,
            marginBottom: '2.2rem',
            fontWeight: 500,
          }}
        >
          Subscribe to get the latest updates, tips, and university news.
        </p>
        {/* Email Subscription Box */}
        <form
          onSubmit={handleSubscribe}
          style={{
            display: 'flex',
            gap: '0.7rem',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2.8rem',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: 420,
          }}
        >
          <input
            type="email"
            required
            placeholder="Email for updates"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={submitted}
            style={{
              flex: 1,
              minWidth: 0,
              padding: '0.85rem 1.1rem',
              borderRadius: 100,
              border: 'none',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#fff',
              color: '#5727A3',
              fontWeight: 500,
              boxShadow: '0 2px 12px #842DD822',
            }}
          />
          <button
            type="submit"
            disabled={submitted}
            style={{
              background: '#9F7AEA',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.08rem',
              borderRadius: 100,
              padding: '0.85rem 2.1rem',
              border: 'none',
              cursor: submitted ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 12px #842DD822',
              transition: 'background .18s,color .18s',
            }}
          >
            {submitted ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>
        {/* Beautiful yournextuniversity branding below the box */}
        <div
          style={{
            marginTop: '-1.2rem',
            marginBottom: '.8rem',
            fontWeight: 900,
            fontSize: '2.2rem',
            letterSpacing: '-2px',
            textAlign: 'center',
            background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(196 173 242) 60%, rgb(255 255 255) 100%) text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 18px #9F7AEA55)',
            fontFamily: '"Montserrat", "Poppins", "Segoe UI", Arial, sans-serif',
            borderRadius: 12,
            display: 'inline-block',
            padding: '0.2em 0.7em',
            boxShadow: '0 2px 24px #842DD822',
            userSelect: 'none',
          }}
        >
          yournextuniversity
        </div>
        {/* Made with love line */}
        <div
          style={{
            color: '#fff',
            fontWeight: 500,
            fontSize: '1.07rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            letterSpacing: '.01em',
            opacity: 0.85,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          Made with
          <span style={{ color: '#ff6bcb', fontSize: '1.2em', verticalAlign: 'middle' }}>♥</span>
          
        </div>
      </div>
      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: 1,
          background: 'rgba(227,231,243,0.1)',
          margin: 0,
          border: 'none',
          zIndex: 2,
          position: 'relative',
        }}
      />
      {/* Lower Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1300,
          width: '100%',
          padding: '2.2rem 1.5rem 1.2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '1.2rem',
        }}
      >
        {/* Left: Social Icons */}
        <div style={{
          display: 'flex',
          gap: '.7rem',
          alignItems: 'center',
          flex: '0 0 auto',
          justifyContent: 'flex-start',
          minWidth: 100,
          padding: '0.4rem 0',
        }}>
          <a href="https://www.instagram.com/yournextuniversity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ opacity: 0.7 }}>
            <img src="https://framerusercontent.com/images/2SwbRWBkLWqfbe0SoyPLo4gomA.png" alt="Instagram" width={28} height={28} style={{ borderRadius: '50%' }} />
          </a>
          <a href="https://www.reddit.com/user/YourNextUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Reddit" style={{ opacity: 0.7 }}>
            <img src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-09-01%20at%2012.59.33%E2%80%AFAM.png" alt="Reddit" width={28} height={28} style={{ borderRadius: '50%', background: '#fff' }} />
          </a>
          <a href="https://www.quora.com/profile/Your-Next-University" target="_blank" rel="noopener noreferrer" aria-label="Quora" style={{ opacity: 0.7 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg" alt="Quora" width={28} height={28} style={{ borderRadius: '50%', background: '#fff' }} />
          </a>
          <a href="https://t.me/YourNextUniversity" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ opacity: 0.7 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" width={28} height={28} style={{ borderRadius: '50%', background: '#fff' }} />
          </a>
          <a href="https://x.com/YourNextUni" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ opacity: 0.7 }}>
            <img src="https://framerusercontent.com/images/tYmJjzMKDE8AlzuzRQRFQh4FkY.png" alt="X" width={28} height={28} style={{ borderRadius: '50%' }} />
          </a>
        </div>
        {/* Center: Copyright */}
        <div
          style={{
            color: '#e1e6f2',
            fontSize: '.97rem',
            letterSpacing: '.01em',
            opacity: 0.85,
            textAlign: 'center',
            fontWeight: 500,
            flex: '1 1 auto',
            minWidth: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span>
            © {new Date().getFullYear()} <span style={{ color: '#fff', fontWeight: 700, marginLeft: 4, marginRight: 4 }}>yournextuniversity</span>. All rights reserved.
          </span>
          <span style={{ color: '#e3e7f3', fontSize: '.93rem', fontWeight: 500, opacity: 0.8, marginTop: '0.2em' }}>
            100, Green Park, New Delhi
          </span>
        </div>
        {/* Right: Legal Links */}
        <div style={{
          display: 'flex',
          gap: '.9rem',
          alignItems: 'center',
          flex: '0 0 auto',
          justifyContent: 'flex-end',
          minWidth: 100,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }}>
          <a
            href="/career"
            style={{
              color: '#e3e7f3',
              textDecoration: 'none',
              fontWeight: 500,
              opacity: 0.8,
              whiteSpace: 'nowrap'
            }}
          >
            Career
          </a>
          <a href="./privacy" target="_blank" style={{ color: '#e3e7f3', textDecoration: 'none', fontWeight: 500, opacity: 0.8, whiteSpace: 'nowrap' }}>Privacy Policy</a>
          <a href="./terms" target="_blank" style={{ color: '#e3e7f3', textDecoration: 'none', fontWeight: 500, opacity: 0.8, whiteSpace: 'nowrap' }}>Terms of Service</a>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 1.2rem !important;
              text-align: center !important;
            }
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) > div {
              justify-content: center !important;
              margin-bottom: 0.5rem;
            }
          }
          @media (max-width: 600px) {
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) {
              padding: 1.5rem 1rem !important;
              flex-direction: column !important;
              gap: 1.2rem !important;
            }
            footer h2 {
              font-size: 1.3rem !important;
            }
            /* Stack links and copyright on mobile for no overlap */
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) > div {
              justify-content: center !important;
              margin-bottom: 0.5rem;
              flex-wrap: wrap !important;
              white-space: normal !important;
            }
          }
          @media (max-width: 1100px) {
            footer > div[style*="max-width: 1300px"] {
              flex-direction: column !important;
              align-items: center !important;
              gap: 0.8rem !important;
              padding: 1.5rem 1rem 1rem 1rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              justify-content: center !important;
              margin-bottom: 0.2rem;
              width: 100% !important;
              min-width: 0 !important;
              text-align: center !important;
            }
          }
          @media (max-width: 700px) {
            footer > div[style*="max-width: 1300px"] {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 0.7rem !important;
              padding: 1.2rem 0.5rem 0.7rem 0.5rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              justify-content: center !important;
              margin-bottom: 0.2rem;
              width: 100% !important;
              min-width: 0 !important;
              text-align: center !important;
              flex-wrap: wrap !important;
              white-space: normal !important;
            }
          }
          @media (max-width: 500px) {
            footer > div[style*="max-width: 1300px"] {
              padding: 1rem 0.2rem 0.5rem 0.2rem !important;
            }
            footer h2 {
              font-size: 1.1rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              font-size: .93rem !important;
              gap: .5rem !important;
            }
          }
        `}
      </style>
    </footer>
  );
};
export default Footer;
