import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Service { code:string; name:string; category:string; description:string }

const allServices = [
  {
    code: 'peer-counselling',
    name: 'Main Counsellor Counselling & Peer Counselling',
    desc: 'Talk to experienced counsellors and real international students for authentic guidance.',
    path: '/services/peer-counselling',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/meeting-5395615_1920.jpg'
  },
  {
    code: 'university-representative',
    name: 'University Representative Counselling',
    desc: 'Official sessions with university representatives for program clarity.',
    path: '/services/university-representative',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/308597795_10159867060511195_7794074239140869476_n.jpg'
  },
  {
    code: 'accommodation-assistance',
    name: 'Accommodation Assistance',
    desc: 'Find and secure student accommodation in your destination country.',
    path: '/services/accommodation-assistance',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/hotel-6862159_1920.jpg'
  },
  {
    code: 'airport-pickup',
    name: 'Airport Pickup',
    desc: 'Book airport pickup and arrival support for a smooth landing.',
    path: '/services/airport-pickup',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/airplane-7359232.jpg'
  },
  {
    code: 'financial',
    name: 'Financial Services / Education Loans',
    desc: 'Get help with education loans, scholarships, and funding options.',
    path: '/financial-services',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/mentor-3512369_1920.jpg'
  },
  {
    code: 'international-application-process',
    name: 'International Study Application Process',
    desc: 'Step-by-step guidance through the entire international study application process.',
    path: '/services/international-application-process',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/desk-3139127_1920.jpg'
  }
];

export const ServicesPage: React.FC = () => {
  const { token } = useAuth();
  const api = useApi(token);
  const [data,setData] = useState<Service[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string|null>(null);
  const [category,setCategory] = useState('');
  const [selected,setSelected] = useState<Service | null>(null);
  const nav = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true); setError(null);
    api.get<Service[]>(`/services${category?`?category=${category}`:''}`)
      .then(setData)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false));
  }, [category]);

  const categories = useMemo(() => Array.from(new Set(data.map(s=>s.category))), [data]);

  return (
    <main className="page container" style={{ paddingBottom: '3rem', position: 'relative', zIndex: 1 }}>
      {/* 3D/Glassmorphism/Animated Background Elements (like landing page) */}
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
        {/* Blurred glassy blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle at 30% 30%, #60a5fa88 0%, #2563eb33 100%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            opacity: 0.7,
            animation: 'float1 12s ease-in-out infinite alternate'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: 320,
            height: 320,
            background: 'radial-gradient(circle at 70% 70%, #a5b4fc99 0%, #818cf833 100%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            opacity: 0.6,
            animation: 'float2 14s ease-in-out infinite alternate'
          }}
        />
        {/* 3D gradient ring */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          style={{
            position: 'absolute',
            top: '60%',
            left: '-120px',
            opacity: 0.18,
            filter: 'blur(1.5px)',
            transform: 'rotate(-18deg)',
            animation: 'spin 24s linear infinite'
          }}
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
          </defs>
          <ellipse
            cx="160"
            cy="160"
            rx="120"
            ry="48"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="18"
          />
        </svg>
        {/* Floating cubes */}
        <div
          style={{
            position: 'absolute',
            left: '60vw',
            top: '10vh',
            width: 60,
            height: 60,
            perspective: 200,
            opacity: 0.25,
            animation: 'cubeFloat 10s ease-in-out infinite alternate'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg,#2563eb 60%,#a5b4fc 100%)',
              borderRadius: 12,
              boxShadow: '0 8px 32px #2563eb33',
              transform: 'rotateY(30deg) rotateX(20deg)'
            }}
          />
        </div>
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
      {/* --- End 3D/Glassmorphism/Animated Background Elements --- */}

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 900,
        color: '#1e3a8a',
        marginBottom: '1.2rem',
        letterSpacing: '-2px',
        lineHeight: 1.1,
        textAlign: 'center'
      }}>Our Services</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '1.13rem',
        color: '#334155',
        fontWeight: 500,
        marginBottom: '2.2rem'
      }}>
        Explore our full range of support for your study abroad journey.
      </p>
      <section style={{
        maxWidth: 1400,
        padding: '2.2rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        margin: '0 auto'
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.2rem',
            padding: '1rem 0',
            marginBottom: '1.5rem'
          }}
        >
          {allServices.map((s, idx) => (
            <div
              key={s.code + idx}
              className="work-process-area landing-service-card"
              style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 8px 32px 0 #2563eb11, 0 2px 8px 0 #60a5fa11',
                border: '1.5px solid #e0e7ff',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                animation: 'fadein 0.7s cubic-bezier(.4,2,.6,1) both',
                position: 'relative',
                minWidth: 0
              }}
              onClick={() => nav(s.path)}
              tabIndex={0}
              aria-label={s.name}
            >
              <div style={{position: 'relative', width: '100%', height: 200}}>
                <img
                  src={s.img}
                  alt={s.name}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    boxShadow: '0 2px 12px #2563eb11'
                  }}
                />
                {/* Shaded banner overlay */}
                <div
                  className="service-banner"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1.1rem',
                    background: 'linear-gradient(90deg, #1e293bcc 0%, #2563ebcc 100%)',
                    color: '#fff',
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '1.08rem',
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '-.5px'
                    }}
                  >
                    {s.name}
                  </span>
                  {/* Arrow icon (SVG) */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{marginLeft: 10, flexShrink: 0, transform: 'rotate(-45deg)'}}
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="16" fill="#fff2" />
                    <path d="M11 17L21 17M21 17L17.5 13.5M21 17L17.5 20.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div style={{
                padding: '1.1rem 1.2rem 1.2rem 1.2rem',
                textAlign: 'left',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  fontSize: '1.08rem',
                  color: '#334155',
                  fontWeight: 500,
                  margin: 0,
                  marginBottom: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
                }}>{s.desc}</div>
              </div>
              <style>{`
                @keyframes fadein {
                  0% { opacity: 0; transform: translateY(30px);}
                  100% { opacity: 1; transform: none;}
                }
              `}</style>
            </div>
          ))}
        </div>
        <style>{`
          .landing-service-card {
            position: relative;
          }
          .landing-service-card::after {
            content: '';
            pointer-events: none;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 180%;
            height: 180%;
            transform: translate(-50%, -50%) scale(0.6);
            border-radius: 50%;
            background: radial-gradient(circle at 50% 40%, #60a5fa44 0%, #fbbf2433 40%, #2563eb22 70%, transparent 100%);
            opacity: 0;
            transition: opacity 0.25s, transform 0.25s;
            z-index: 2;
            filter: blur(2px) saturate(1.3);
            mix-blend-mode: lighten;
          }
          .landing-service-card:hover::after,
          .landing-service-card:focus::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          .landing-service-card:hover, .landing-service_card:focus {
            background: radial-gradient(circle at 60% 40%, #2563eb 0%, #60a5fa 60%, #1e293b 100%);
            box-shadow: 0 24px 64px 0 #2563eb55, 0 4px 16px 0 #60a5fa33 !important;
            transform: scale(1.06) !important;
            border-color: #2563eb !important;
          }
          .landing-service-card:hover h6, .landing-service-card:focus h6 {
            background: linear-gradient(90deg,#fff 0%,#fbbf24 100%);
            WebkitBackgroundClip: text;
            WebkitTextFillColor: transparent;
            background-clip: text;
            color: transparent;
            text-shadow: 0 2px 16px #fff8, 0 1px 2px #fbbf2444;
          }
        `}</style>
      </section>
    </main>
  );
};
         