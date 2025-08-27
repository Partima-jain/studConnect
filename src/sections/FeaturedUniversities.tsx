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
        minHeight: 500
      }}
    >
      {/* Big background image */}
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/low-angle-cheerful-team-students-passed-test-by-preparing-all-together.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(0.97)'
        }}
      />
      {/* Diagonal overlay: left half shaded, right half clear */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(120deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.62) 48%, rgba(30,41,59,0.0) 52%, rgba(30,41,59,0.0) 100%)'
        }}
      />
      {/* Overlay for text and button, only on shaded part */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '60%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'left',
          paddingLeft: 'clamp(2rem, 8vw, 7rem)',
          paddingRight: '2rem',
          pointerEvents: 'none'
        }}
      >
        {/* --- REPLACED SECTION START --- */}
        <h2
          style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-1.5px',
            marginBottom: '0.7rem',
            textShadow: '0 2px 16px #1e293b88, 0 1px 2px #2563eb44',
            textTransform: 'uppercase',
            pointerEvents: 'auto'
          }}
        >
          UNIVERSITY EXPLORER
        </h2>
        <div
          style={{
            fontSize: '1.18rem',
            color: '#fbbf24',
            fontWeight: 700,
            marginBottom: '1.5rem',
            maxWidth: 520,
            textShadow: '0 2px 12px #1e293b88',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span role="img" aria-label="globe">🌍</span> 800+ Universities. 6+ Countries. One Platform.
        </div>
        {/* Search Bar */}
        <form
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            background: '#fff3',
            borderRadius: 14,
            padding: '1.1rem 1rem',
            boxShadow: '0 2px 12px #2563eb11',
            marginBottom: '1.5rem',
            pointerEvents: 'auto'
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
              border: '1.5px solid #c7d2fe',
              fontSize: '1rem',
              background: '#fff',
              color: '#1e293b'
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
              border: '1.5px solid #c7d2fe',
              fontSize: '1rem',
              background: '#fff',
              color: '#1e293b'
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
              border: '1.5px solid #c7d2fe',
              fontSize: '1rem',
              background: '#fff',
              color: '#1e293b'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.07rem',
              border: 'none',
              borderRadius: 8,
              padding: '0.7rem 1.6rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #2563eb22',
              transition: 'background 0.18s'
            }}
          >
            Explore
          </button>
        </form>
        {/* --- REPLACED SECTION END --- */}
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
          }
        `}
      </style>
    </section>
  );
};
