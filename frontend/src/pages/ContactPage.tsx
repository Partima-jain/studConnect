import React from 'react';
import { Contact } from '../sections/Contact';

export const ContactPage: React.FC = () => (
  <main
    style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      overflow: 'hidden'
    }}
  >
    {/* 3D/Luxury Background Elements */}
    <div
      aria-hidden
      style={{
        position: 'fixed',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Blurred luxury glassy blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-120px',
          width: 420,
          height: 420,
          background: 'radial-gradient(circle at 30% 30%, #60a5fa99 0%, #2563eb33 100%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          opacity: 0.75,
          animation: 'float1 13s ease-in-out infinite alternate'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-120px',
          width: 340,
          height: 340,
          background: 'radial-gradient(circle at 70% 70%, #a5b4fcbb 0%, #818cf855 100%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float2 15s ease-in-out infinite alternate'
        }}
      />
      {/* 3D golden ring */}
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        style={{
          position: 'absolute',
          top: '60%',
          left: '-100px',
          opacity: 0.22,
          filter: 'blur(1.5px)',
          transform: 'rotate(-18deg)',
          animation: 'spin 28s linear infinite'
        }}
      >
        <defs>
          <linearGradient id="goldring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e42" />
          </linearGradient>
        </defs>
        <ellipse
          cx="160"
          cy="160"
          rx="120"
          ry="48"
          fill="none"
          stroke="url(#goldring)"
          strokeWidth="18"
        />
      </svg>
      {/* Floating glass cube */}
      <div
        style={{
          position: 'absolute',
          left: '65vw',
          top: '12vh',
          width: 70,
          height: 70,
          perspective: 200,
          opacity: 0.23,
          animation: 'cubeFloat 11s ease-in-out infinite alternate'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg,#2563eb 60%,#a5b4fc 100%)',
            borderRadius: 16,
            boxShadow: '0 8px 32px #2563eb33, 0 0 0 2px #fbbf2440',
            transform: 'rotateY(30deg) rotateX(20deg)'
          }}
        />
      </div>
      {/* Subtle stars for luxury */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            background: 'linear-gradient(90deg,#fbbf24 0%,#fff 100%)',
            borderRadius: '50%',
            opacity: 0.18 + Math.random() * 0.18,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(60px) scale(1.08);}
          }
          @keyframes float2 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(-40px) scale(1.12);}
          }
          @keyframes spin {
            100% { transform: rotate(342deg);}
          }
          @keyframes cubeFloat {
            0% { transform: translateY(0) rotateY(30deg) rotateX(20deg);}
            100% { transform: translateY(-40px) rotateY(60deg) rotateX(40deg);}
          }
        `}
      </style>
    </div>
    <div style={{ position: 'relative', zIndex: 2 }}>
      <Contact />
      {/* Global Button Style */}
      <style>
        {`
          button, .global-btn {
            background: linear-gradient(90deg, rgb(55, 81, 138) 0%, rgb(96, 165, 250) 100%) !important;
            box-shadow: rgba(37, 99, 235, 0.333) 0px 4px 16px 0px, rgba(59, 130, 246, 0.133) 0px 1.5px 8px 0px !important;
            color: #fff !important;
            border-radius: 10px !important;
            font-weight: 700 !important;
            border: none !important;
            transition: background 0.2s, transform 0.2s;
          }
          button:hover, .global-btn:hover {
            background: linear-gradient(90deg, rgb(96, 165, 250) 0%, rgb(55, 81, 138) 100%) !important;
            transform: scale(1.04);
          }
        `}
      </style>
    </div>
  </main>
);
