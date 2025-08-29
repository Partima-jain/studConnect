import React, { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';


export const FeaturedUniversities: React.FC = () => {
  const ref = useReveal();
  const api = useApi();
  const navigate = useNavigate();

  return (
    <section
      className="section alt reveal"
      id="universities"
      ref={ref as any}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        minHeight: 420,
        background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 32px 0 #9F7AEA22, 0 2px 8px 0 #5727A322',
        border: '2.5px solid #D6C5F0',
        margin: '2.5rem auto 0 auto',
        maxWidth: 1400,
      }}
    >
      {/* Decorative blobs and sparkles */}
      <div aria-hidden style={{
        position: 'absolute', top: -80, left: -120, width: 320, height: 320,
        background: 'radial-gradient(circle at 60% 40%, #D6C5F0 0%, #9F7AEA22 100%)',
        borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, opacity: 0.7, pointerEvents: 'none'
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: -80, right: -120, width: 260, height: 260,
        background: 'radial-gradient(circle at 60% 60%, #9F7AEA 0%, #D6C5F033 100%)',
        borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, opacity: 0.5, pointerEvents: 'none'
      }} />
      {/* Animated sparkles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute',
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          width: 3 + Math.random() * 4,
          height: 3 + Math.random() * 4,
          background: 'linear-gradient(90deg,#9F7AEA 0%,#fff 100%)',
          borderRadius: '50%',
          opacity: 0.13 + Math.random() * 0.18,
          filter: 'blur(0.5px)',
          animation: `sparkle-move-fu${i} 7s ease-in-out infinite alternate`,
          zIndex: 1,
          pointerEvents: 'none'
        }} />
      ))}
      <style>
        {`
          ${[...Array(8)].map((_, i) => `
            @keyframes sparkle-move-fu${i} {
              0% { transform: scale(1) translateY(0);}
              100% { transform: scale(${0.8 + Math.random() * 0.7}) translateY(${Math.random() * 30 - 15}px);}
            }
          `).join('\n')}
        `}
      </style>
      {/* Section content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        padding: '3.5rem 2.5rem 2.5rem 2.5rem',
      }}>
        {/* Left: Title and search */}
        <div style={{
          flex: 1,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'left',
        }}>
          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              marginBottom: '0.7rem',
              textShadow: '0 2px 16px #9F7AEA44, 0 1px 2px #5727A344',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            UNIVERSITY EXPLORER
          </h2>
          <div
            style={{
              fontSize: '1.18rem',
              color: '#9F7AEA',
              fontWeight: 700,
              marginBottom: '1.5rem',
              maxWidth: 520,
              textShadow: '0 2px 12px #5727A344',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span role="img" aria-label="globe">🌍</span> 800+ Universities. 6+ Countries. One Platform.
          </div>
          <form
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 14,
              padding: '1.1rem 1rem',
              boxShadow: '0 2px 12px #9F7AEA11',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(4px) saturate(1.1)',
              WebkitBackdropFilter: 'blur(4px) saturate(1.1)',
              border: '1.5px solid #D6C5F0'
            }}
            onSubmit={e => { e.preventDefault(); navigate('/universities'); }}
          >
            <input
              type="text"
              placeholder="Country"
              style={{
                minWidth: 90,
                maxWidth: 140,
                padding: '0.7rem 1rem',
                borderRadius: 8,
                border: '1.5px solid #D6C5F0',
                fontSize: '1rem',
                background: '#fff',
                color: '#5727A3'
              }}
            />
            <input
              type="text"
              placeholder="Course"
              style={{
                minWidth: 90,
                maxWidth: 140,
                padding: '0.7rem 1rem',
                borderRadius: 8,
                border: '1.5px solid #D6C5F0',
                fontSize: '1rem',
                background: '#fff',
                color: '#5727A3'
              }}
            />
            <input
              type="text"
              placeholder="Tuition Range"
              style={{
                minWidth: 90,
                maxWidth: 140,
                padding: '0.7rem 1rem',
                borderRadius: 8,
                border: '1.5px solid #D6C5F0',
                fontSize: '1rem',
                background: '#fff',
                color: '#5727A3'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.07rem',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.6rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #9F7AEA22',
                transition: 'background 0.18s'
              }}
            >
              Explore
            </button>
          </form>
          <div style={{ fontSize: '.97rem', color: '#5727A3', opacity: 0.8, marginBottom: '0.5rem' }}>
            Discover top universities, compare programs, and find your dream campus.
          </div>
        </div>
        {/* Right: Step-wise list */}
        <div style={{
          flex: 1.2,
          minWidth: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 260,
        }}>
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            width: '100%',
            maxWidth: 420
          }}>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#5727A3',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D6C5F011'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA 100%)',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0
              }}>1</span>
              <span>Shortlist your dream destination</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              borderRadius: 14,
              padding: '1.1rem 1.3rem',
              fontWeight: 700,
              color: '#fff',
              fontSize: '1.13rem',
              boxShadow: '0 4px 16px #9F7AEA22, 0 2px 8px #5727A344',
              border: '2px solid #9F7AEA',
              transform: 'scale(1.04)',
              zIndex: 2
            }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#fff',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0,
                border: '2px solid #9F7AEA'
              }}>2</span>
              <span>Find the right university &amp; course</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#5727A3',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D6C5F011'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA 100%)',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0
              }}>3</span>
              <span>Apply, get guidance, and succeed</span>
            </li>
          </ol>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            #universities h2 {
              font-size: 1.5rem !important;
            }
            #universities div[style*="font-size: 1.18rem"] {
              font-size: 1.01rem !important;
            }
            #universities form {
              flex-direction: column !important;
              gap: 0.7rem !important;
              padding: 0.7rem 0.5rem !important;
            }
            #universities .btn-primary {
              font-size: 0.98rem !important;
              padding: 0.7rem 1.2rem !important;
            }
            #universities .container {
              margin-top: 180px !important;
            }
            #universities > div[style*="left: 0"] {
              width: 100% !important;
              padding-left: 1.2rem !important;
              padding-right: 1.2rem !important;
              align-items: center !important;
              text-align: center !important;
            }
            #universities > div[style*="flex-direction: row"] {
              flex-direction: column !important;
              gap: 1.5rem !important;
              padding: 2rem 0.7rem 1.5rem 0.7rem !important;
            }
            #universities > div[style*="flex-direction: row"] > div:last-child {
              flex-direction: row !important;
              gap: 1rem !important;
              justify-content: flex-start !important;
              overflow-x: auto !important;
              padding: 0.5rem 0 !important;
            }
          }
          @media (max-width: 600px) {
            #universities h2 {
              font-size: 1.1rem !important;
            }
            #universities div[style*="font-size: 1.18rem"] {
              font-size: 0.89rem !important;
            }
            #universities form {
              flex-direction: column !important;
              gap: 0.5rem !important;
              padding: 0.5rem 0.2rem !important;
            }
            #universities .btn-primary {
              font-size: 0.89rem !important;
              padding: 0.5rem 0.8rem !important;
            }
            #universities .container {
              margin-top: 100px !important;
            }
            #universities > div[style*="left: 0"] {
              width: 100% !important;
              padding-left: 0.7rem !important;
              padding-right: 0.7rem !important;
              align-items: center !important;
              text-align: center !important;
            }
            #universities > div[style*="flex-direction: row"] {
              flex-direction: column !important;
              gap: 1rem !important;
              padding: 1.2rem 0.3rem 1rem 0.3rem !important;
            }
            #universities > div[style*="flex-direction: row"] > div:last-child {
              flex-direction: row !important;
              gap: 0.7rem !important;
              justify-content: flex-start !important;
              overflow-x: auto !important;
              padding: 0.5rem 0 !important;
            }
          }
        `}
      </style>
    </section>
  );
};
     