import React, { useEffect } from 'react';
import PastelGlobeScene from '../components/PastelGlobeScene';

export const Hero: React.FC = () => {
  useEffect(() => {
    const link = document.querySelector('.hero-cta');
    const handler = (e: Event) => {
      e.preventDefault();
      document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth'});
    };
    link?.addEventListener('click', handler);
    return () => link?.removeEventListener('click', handler);
  }, []);
  return (
    <header className="hero hero--cinematic hero--globe" style={{overflow: 'hidden'}}>
      <div
        className="hero-flex"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 1.5rem',
          minHeight: 520,
          position: 'relative'
        }}
      >
        {/* Button left-aligned on laptop */}
        <div
          className="hero__cta-container"
          style={{
            flex: '0 0 220px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: 180,
            zIndex: 2,
            height: '100%'
          }}
        >
          <div className="hero__cta-inner" style={{width: '100%'}}>
            <a
              href="#contact"
              className="btn btn-primary hero-cta hero-cta-3d"
              style={{
                fontWeight: 700,
                fontSize: '1.08rem',
                letterSpacing: '.2px',
                boxShadow: '0 6px 24px -4px #2563eb55, 0 1.5px 8px 0 #60a5fa33',
                borderRadius: '16px',
                padding: '1.05rem 2.1rem',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1), background 0.18s',
                background: 'linear-gradient(100deg, rgb(237 238 240) 60%, rgb(51 107 177) 100%)',
                color: 'rgb(17 29 81)',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 2,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem'
              }}>
                Book Your Consultation
                {/* Large arrow icon, top-right direction, as provided */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    marginLeft: 10,
                    flexShrink: 0,
                    transform: 'rotate(-45deg)'
                  }}
                >
                  <circle cx="16" cy="16" r="16" fill="#fff2"></circle>
                  <path d="M11 17L21 17M21 17L17.5 13.5M21 17L17.5 20.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
              {/* 3D shine effect */}
              <span className="hero-cta-3d-shine" style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '60%',
                background: 'linear-gradient(90deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 100%)',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
            </a>
          </div>
        </div>
        {/* Globe center */}
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minWidth: 320}}>
          <PastelGlobeScene />
        </div>
        <div className="container hero__content" style={{flex: 1, minWidth: 320, zIndex: 2}}>
        </div>
        <div
          className="hero__decor-image"
          style={{
            flex: '0 0 350px',
            display: 'flex',
            alignItems: 'stretch',
            minWidth: 220,
            height: '100%',
            zIndex: 1
          }}
        >
          <img
            src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Untitled.png"
            alt="Decorative"
            style={{
              maxWidth: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              margin: 0
            }}
          />
        </div>
      </div>
      <div className="hero__bg">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="gridlines" />
      </div>
      {/* Add responsive CSS */}
      <style>
        {`
          
          @media (max-width: 1199px) {
            .hero__cta-container {
              justify-content: center !important;
              align-items: center !important;
              width: 100%;
              flex-basis: 100% !important;
              display: flex !important;
              height: 100% !important;
            }
            .hero__cta-inner {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: 100% !important;
              height: 100% !important;
            }
            .hero__decor-image {
              display: none !important;
            }
          }
          
          
          @media (max-width: 900px) {
            .hero__cta-container a.hero-cta-3d {
              font-size: 0.98rem !important;
              padding: 0.85rem 1.5rem !important;
              border-radius: 13px !important;
            }
            .hero__cta-container svg {
              width: 26px !important;
              height: 26px !important;
              margin-left: 7px !important;
            }
            .hero-flex {
              min-height: 400px !important;
              padding: 0 0.5rem !important;
            }
          }
          @media (max-width: 600px) {
            .hero__cta-container a.hero-cta-3d {
              font-size: 0.89rem !important;
              padding: 0.7rem 1rem !important;
              border-radius: 9px !important;
            }
            .hero__cta-container svg {
              width: 20px !important;
              height: 20px !important;
              margin-left: 5px !important;
            }
            .hero-flex {
              min-height: 260px !important;
              padding: 0 0.2rem !important;
            }
          }
          .hero-cta-3d {
            box-shadow: 0 6px 24px -4px #2563eb55, 0 1.5px 8px 0 #60a5fa33;
            transform: perspective(600px) translateZ(0);
            will-change: transform, box-shadow;
          }
          .hero-cta-3d:hover, .hero-cta-3d:focus {
            transform: scale(1.055) perspective(600px) translateZ(8px) rotateX(-2deg) rotateY(1deg);
            box-shadow: 0 16px 48px -6px #2563eb88, 0 4px 16px 0 #60a5fa55;
            background: linear-gradient(100deg,#2563eb 40%,#60a5fa 100%);
            outline: none;
          }
          .hero-cta-3d:active {
            transform: scale(0.98) perspective(600px) translateZ(0);
            box-shadow: 0 2px 8px #2563eb33;
          }
          .hero-cta-3d .hero-cta-3d-shine {
            animation: heroCtaShine 2.5s linear infinite;
          }
          @keyframes heroCtaShine {
            0% { opacity: 0.18; }
            50% { opacity: 0.32; }
            100% { opacity: 0.18; }
          }
        `}
      </style>
    </header>
  );
};
