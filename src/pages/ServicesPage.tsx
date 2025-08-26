import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Service { code:string; name:string; category:string; description:string }

const categoryLabels: Record<string,string> = {
  counselling:'Counselling', planning:'Planning', application:'Application', compliance:'Compliance', funding:'Funding'
};

// Define all unique services as per requirements
const services = [
  {
    code: 'peer-counselling',
    name: 'Main Counsellor Counselling & Peer Counselling',
    desc: 'Talk to experienced counsellors and real international students for authentic guidance.',
    path: '/services/peer-counselling'
  },
  {
    code: 'university-representative',
    name: 'University Representative Counselling',
    desc: 'Official sessions with university representatives for program clarity.',
    path: '/services/university-representative'
  },
  {
    code: 'accommodation-assistance',
    name: 'Accommodation Assistance',
    desc: 'Find and secure student accommodation in your destination country.',
    path: '/services/accommodation-assistance'
  },
  {
    code: 'airport-pickup',
    name: 'Airport Pickup',
    desc: 'Book airport pickup and arrival support for a smooth landing.',
    path: '/services/airport-pickup'
  },
  {
    code: 'financial',
    name: 'Financial Services / Education Loans',
    desc: 'Get help with education loans, scholarships, and funding options.',
    path: '/financial-services'
  },
  {
    code: 'international-application-process',
    name: 'International Study Application Process',
    desc: 'Step-by-step guidance through the entire international study application process.',
    path: '/services/international-application-process'
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

  useEffect(() => {
    setLoading(true); setError(null);
    api.get<Service[]>(`/services${category?`?category=${category}`:''}`)
      .then(setData)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false));
  }, [category]);

  const categories = useMemo(() => Array.from(new Set(data.map(s=>s.category))), [data]);

  // 3D Card Component with tilt and shadow animation, clean look, animated icon
  const Service3DCard: React.FC<{
    name: string;
    desc: string;
    onClick: () => void;
    icon: React.ReactNode;
  }> = ({ name, desc, onClick, icon }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.045)`;
        card.style.boxShadow = '0 16px 48px 0 #2563eb33, 0 2px 8px 0 #60a5fa22';
      };
      const handleMouseLeave = () => {
        card.style.transform = '';
        card.style.boxShadow = '0 4px 24px 0 #2563eb22';
      };
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    // Animated icon (simple floating effect)
    const AnimatedIcon = () => (
      <div
        style={{
          width: 48,
          height: 48,
          margin: '0 auto 1.1rem auto',
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#2563eb 0%,#60a5fa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px 0 #2563eb22',
          position: 'relative',
          zIndex: 2,
          animation: 'service-bounce 2.2s infinite cubic-bezier(.4,2,.6,1)'
        }}
      >
        {icon}
      </div>
    );

    return (
      <div
        ref={cardRef}
        tabIndex={0}
        className="service-3d-card"
        style={{
          background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
          borderRadius: '1.7rem',
          boxShadow: '0 4px 24px 0 #2563eb22',
          padding: '2rem 1.5rem 1.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
          outline: 'none',
          willChange: 'transform',
          userSelect: 'none',
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          position: 'relative',
          border: '2.5px solid rgba(96,165,250,0.13)',
          backdropFilter: 'blur(7px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(7px) saturate(1.2)',
        }}
        onClick={onClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
        aria-label={name}
        onFocus={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px 0 #2563eb33, 0 2px 8px 0 #60a5fa22';
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.045)';
          (e.currentTarget as HTMLElement).style.border = '2.5px solid #2563eb55';
        }}
        onBlur={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 #2563eb22';
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.border = '2.5px solid rgba(96,165,250,0.13)';
        }}
      >
        <AnimatedIcon />
        <h3 style={{
          fontSize: '1.18rem',
          fontWeight: 700,
          color: '#1e3a8a',
          marginBottom: '.6rem',
          marginTop: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          zIndex: 2,
          position: 'relative'
        }}>{name}</h3>
        <p style={{
          fontSize: '1.01rem',
          color: '#334155',
          fontWeight: 500,
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          zIndex: 2,
          position: 'relative'
        }}>{desc}</p>
        {/* Animated arrow on hover/focus */}
        <span
          className="service-arrow"
          style={{
            position: 'absolute',
            right: 24,
            bottom: 18,
            opacity: 0,
            transition: 'opacity 0.18s cubic-bezier(.4,2,.6,1), transform 0.18s cubic-bezier(.4,2,.6,1)',
            fontSize: 22,
            color: '#2563eb',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        >→</span>
        <style>{`
          .service-3d-card:focus .service-arrow,
          .service-3d-card:hover .service-arrow {
            opacity: 1 !important;
            transform: translateX(6px);
          }
          @keyframes service-bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-7px);}
          }
        `}</style>
      </div>
    );
  };

  // SVG icons
  const PhoneIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <path d="M6.7 2.3A2.4 2.4 0 0 0 4.3 4.7c-.3 2.1.3 5.2 2.7 8.6 2.4 3.4 5.1 5.3 7.2 6.2a2.4 2.4 0 0 0 2.4-.3l1.6-1.3a1 1 0 0 0 .1-1.5l-2.2-2.2a1 1 0 0 0-1.2-.2l-1.2.6c-.3.2-.7.1-.9-.2l-2.2-2.2c-.3-.3-.3-.7-.2-.9l.6-1.2a1 1 0 0 0-.2-1.2L7.5 4.2a1 1 0 0 0-1.5.1l-.3.4z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
  const HomeIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <path d="M3 11.5L12 4l9 7.5M5 10v8a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2v-8" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="9" y="14" width="6" height="6" rx="1" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
  const TaxiIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="10" width="18" height="7" rx="2" stroke="#fff" strokeWidth="2"/>
      <path d="M7 17v2M17 17v2M5 10l1.5-4.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L19 10" stroke="#fff" strokeWidth="2"/>
      <circle cx="7.5" cy="19.5" r="1.5" fill="#fff"/>
      <circle cx="16.5" cy="19.5" r="1.5" fill="#fff"/>
    </svg>
  );
  const UniversityIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <path d="M3 10.5L12 5l9 5.5" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="5" y="11" width="14" height="7" rx="2" stroke="#fff" strokeWidth="2"/>
      <path d="M8 18v2h8v-2" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
  const CoinIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <ellipse cx="12" cy="12" rx="9" ry="9" stroke="#fff" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="7" ry="7" stroke="#fff" strokeWidth="2" opacity="0.5"/>
      <path d="M12 8v8M9.5 10.5h5M9.5 13.5h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  const ProcessIcon = (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="#fff" strokeWidth="2"/>
      <path d="M8 8h8M8 12h8M8 16h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Map icons to services
  const getServiceIcon = (code: string) => {
    if (code === 'peer-counselling') return PhoneIcon;
    if (code === 'university-representative') return UniversityIcon;
    if (code === 'accommodation-assistance') return HomeIcon;
    if (code === 'airport-pickup') return TaxiIcon;
    if (code === 'financial') return CoinIcon;
    if (code === 'international-application-process') return ProcessIcon;
    // fallback
    return (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/>
        <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  };

  return (
    <main className="page container" style={{paddingBottom: '3rem'}}>
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: 900,
        color: '#1e3a8a',
        marginBottom: '1.2rem',
        letterSpacing: '-2px',
        lineHeight: 1.1,
        textAlign: 'center'
      }}>Services</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '1.13rem',
        color: '#334155',
        fontWeight: 500,
        marginBottom: '2.2rem'
      }}>
        Explore our full range of support for your study abroad journey.
      </p>
      <div
        className="grid services__grid"
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2.2rem',
          alignItems: 'stretch',
          width: '100%',
          position: 'relative'
        }}
      >
        {services.map(s => (
          <Service3DCard
            key={s.code}
            name={s.name}
            desc={s.desc}
            icon={getServiceIcon(s.code)}
            onClick={() => nav(s.path)}
          />
        ))}
      </div>
    </main>
  );
};
