import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AccommodationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '3rem 1.5rem 2rem 1.5rem',
          maxWidth: 1200,
          margin: '0 auto'
        }}
      >
        <div style={{ flex: 1, minWidth: 320 }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#1e3a8a',
            marginBottom: '1.2rem',
            letterSpacing: '-2px',
            lineHeight: 1.1
          }}>
            Find Your Perfect Student Accommodation
          </h1>
          <p style={{
            fontSize: '1.13rem',
            color: '#334155',
            fontWeight: 500,
            marginBottom: '1.2rem'
          }}>
            Secure safe, affordable, and comfortable housing in your destination country. We help you compare options, book with confidence, and settle in smoothly.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              marginTop: '1.2rem',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.7rem 1.6rem',
              fontWeight: 700,
              fontSize: '1.07rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #2563eb22',
              transition: 'background 0.18s'
            }}
          >
            Book a Free Consultation
          </button>
        </div>
        <div style={{ flex: 1, minWidth: 320, textAlign: 'center', position: 'relative', minHeight: 340 }}>
          <img
            src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/hotel-6862159_1920.jpg"
            alt="Student Accommodation"
            style={{
              width: 340,
              height: 340,
              objectFit: 'cover',
              borderRadius: 24,
              boxShadow: '0 8px 32px #2563eb22',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>
      </section>
      {/* Steps/Features Section */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2rem 1.5rem 3rem 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#2563eb',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          How Our Accommodation Assistance Works
        </h2>
        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <li style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.2rem 1.5rem'
          }}>
            <b>1. Share Your Preferences:</b> Tell us your budget, location, and housing type.
          </li>
          <li style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.2rem 1.5rem'
          }}>
            <b>2. Get Curated Options:</b> We shortlist safe, verified, and affordable accommodations for you.
          </li>
          <li style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.2rem 1.5rem'
          }}>
            <b>3. Book & Move In:</b> Reserve your room with our support and settle in with confidence.
          </li>
        </ol>
      </section>
    </main>
  );
};

export default AccommodationPage;
