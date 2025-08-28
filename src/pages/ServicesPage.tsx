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
  // {
  //   code: 'university-representative',
  //   name: 'University Representative Counselling',
  //   desc: 'Official sessions with university representatives for program clarity.',
  //   path: '/services/university-representative',
  //   img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/308597795_10159867060511195_7794074239140869476_n.jpg'
  // },
  {
    code: 'accommodation-assistance',
    name: 'Accommodation Assistance',
    desc: 'Find and secure student accommodation in your destination country.',
    path: '/accommodation', // updated path
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
    desc: 'Get help with education loans and funding options.',
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
      {/* Removed 3D/Glassmorphism/Animated Background Elements */}
      <h1 style={{
        fontSize: '2.7rem',
        fontWeight: 900,
        color: '#5727A3',
        marginBottom: '1.2rem',
        letterSpacing: '-2px',
        lineHeight: 1.1,
        textAlign: 'center',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 2px 16px #9F7AEA22'
      }}>Our Services</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '1.18rem',
        color: '#1B0044',
        fontWeight: 500,
        marginBottom: '2.2rem',
        letterSpacing: '-.5px'
      }}>
        Explore our full range of support for your study abroad journey.
      </p>
      <section style={{
        maxWidth: 1400,
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        margin: '0 auto',
        background: 'linear-gradient(120deg, #D6C5F0 0%, #fff 100%)',
        borderRadius: 40,
        boxShadow: '0 12px 48px 0 #9F7AEA22, 0 2px 8px 0 #5727A322',
        border: '2.5px solid #D6C5F0',
        overflow: 'visible'
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '5.5rem 3.2rem', // Increased row gap
            padding: '1.5rem 0',
            marginBottom: '1.5rem'
          }}
        >
          {allServices.map((s, idx) => (
            <div
              key={s.code + idx}
              className="work-process-area landing-service-card"
              style={{
                background: 'linear-gradient(135deg, #fff 60%, #D6C5F0 100%)',
                borderRadius: 32,
                boxShadow: '0 12px 36px 0 #9F7AEA22, 0 2px 8px 0 #D6C5F022',
                border: '2.5px solid #9F7AEA22',
                overflow: 'visible',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                animation: 'fadein 0.7s cubic-bezier(.4,2,.6,1) both',
                position: 'relative',
                minWidth: 0,
                alignItems: 'center',
                padding: 0,
                zIndex: 1
              }}
              onClick={() => nav(s.path)}
              tabIndex={0}
              aria-label={s.name}
            >
              {/* Unique floating image with shadow and border */}
              <div style={{
                position: 'absolute',
                top: -48,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 110,
                height: 110,
                zIndex: 3,
                background: 'linear-gradient(135deg,#D6C5F0 60%,#9F7AEA 100%)',
                borderRadius: '50%',
                boxShadow: '0 8px 32px #9F7AEA33, 0 2px 8px #D6C5F044',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '5px solid #fff',
                overflow: 'hidden'
              }}>
                <img
                  src={s.img}
                  alt={s.name}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block',
                    boxShadow: '0 2px 12px #9F7AEA22'
                  }}
                />
              </div>
              {/* Card content */}
              <div style={{
                padding: '5.5rem 1.7rem 1.7rem 1.7rem',
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative'
              }}>
                <h3 style={{
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: '#5727A3',
                  margin: '0 0 .7rem 0',
                  letterSpacing: '-.5px',
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px #9F7AEA11'
                }}>{s.name}</h3>
                <div style={{
                  fontSize: '1.09rem',
                  color: '#1B0044',
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
              {/* Unique bottom action bar with glass effect and floating arrow */}
              <div style={{
                width: '100%',
                height: 54,
                background: 'rgba(151, 117, 234, 0.13)',
                color: '#5727A3',
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.13rem',
                letterSpacing: '-.5px',
                gap: 10,
                cursor: 'pointer',
                transition: 'background 0.18s',
                position: 'relative',
                boxShadow: '0 2px 8px #9F7AEA22'
              }}>
                <span style={{
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 800
                }}>Learn More</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg,#D6C5F0 60%,#9F7AEA 100%)',
                  borderRadius: '50%',
                  marginLeft: 6,
                  boxShadow: '0 2px 8px #9F7AEA22'
                }}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ transform: 'rotate(-45deg)' }}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="12" fill="#fff2" />
                    <path d="M7 13H17M17 13L13.5 9.5M17 13L13.5 16.5" stroke="#5727A3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {/* Decorative floating gradient ring */}
              <div style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 50%, #D6C5F0 0%, #9F7AEA33 80%, transparent 100%)',
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: 'none'
              }} />
              <style>{`
                @keyframes fadein {
                  0% { opacity: 0; transform: translateY(30px);}
                  100% { opacity: 1; transform: none;}
                }
                .landing-service-card:hover, .landing-service-card:focus {
                  box-shadow: 0 24px 64px 0 #9F7AEA55, 0 4px 16px 0 #D6C5F033 !important;
                  transform: scale(1.06) !important;
                  border-color: #9F7AEA !important;
                  background: linear-gradient(135deg, #fff 40%, #D6C5F0 100%);
                }
                .landing-service-card:hover h3, .landing-service-card:focus h3 {
                  background: linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%);
                  WebkitBackgroundClip: text;
                  WebkitTextFillColor: transparent;
                  background-clip: text;
                  color: transparent;
                  text-shadow: 0 2px 16px #fff8, 0 1px 2px #9F7AEA44;
                }
                .landing-service-card:hover .bottom-bar, .landing-service_card:focus .bottom-bar {
                  background: linear-gradient(90deg, #9F7AEA 0%, #5727A3 100%);
                }
              `}</style>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
                  