import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Custom 3D Globe Component (simple animated sphere with world map texture)
const Globe: React.FC = () => (
  <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
    <mesh>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial
        color="#2D4EF5"
        roughness={0.5}
        metalness={0.2}
        // Optionally, add a world map texture here for more realism
      />
    </mesh>
    <ambientLight intensity={0.7} />
    <directionalLight position={[5, 5, 5]} intensity={0.7} />
  </Float>
);

const CountUp: React.FC<{ value: number; duration?: number; suffix?: string; label: string }> = ({ value, duration = 1400, suffix = '', label }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if(!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !started.current){
          started.current = true;
          const start = performance.now();
          const animate = (t: number) => {
            const prog = Math.min(1, (t - start) / duration);
            setDisplay(Math.round(value * prog));
            if(prog < 1) requestAnimationFrame(animate); else setDisplay(value);
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return (
    <div ref={ref} className="about-counter" aria-label={label} title={label}>
      <strong>{display.toLocaleString()}{display === value ? suffix : ''}</strong>
      <span>{label}</span>
    </div>
  );
};

// Enhanced Feature3DCard: image fills top half, text is always visible, card is interactive and visually balanced
const Feature3DCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
}> = ({ icon, title, desc, to }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax tilt effect
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

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(to); }}
      style={{
        background: 'rgba(255,255,255,0.92)',
        borderRadius: '1.7rem',
        boxShadow: '0 4px 24px 0 #2563eb22',
        padding: 0,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
        outline: 'none',
        willChange: 'transform',
        userSelect: 'none',
        height: 320,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        border: '2.5px solid rgba(96,165,250,0.13)',
        backdropFilter: 'blur(7px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(7px) saturate(1.2)',
      }}
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
      aria-label={title}
    >
      {/* Top image area */}
      <div
        style={{
          width: '100%',
          height:250,
          background: '#e0e7ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: '1.7rem',
          borderTopRightRadius: '1.7rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Ensure icon is always an image that fills the area */}
        {React.isValidElement(icon) && icon.type === 'img'
          ? React.cloneElement(icon, {
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 0,
                display: 'block'
              }
            })
          : icon}
        {/* Subtle overlay for 3D effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(96,165,250,0.07) 0%,rgba(37,99,235,0.04) 100%)',
          pointerEvents: 'none'
        }} />
      </div>
      {/* Content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1.1rem 1.1rem 1.1rem 1.1rem',
        background: 'transparent'
      }}>
        <h3 style={{
          fontSize: '1.18rem',
          fontWeight: 700,
          color: '#5727A3',
          marginBottom: '.6rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>{title}</h3>
        <p style={{
          fontSize: '1.01rem',
          color: '#334155',
          fontWeight: 500,
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>{desc}</p>
      </div>
      {/* Animated arrow on hover/focus */}
      <span
        className="feature-arrow"
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
        .feature-card-hover .feature-arrow,
        .feature-card:focus .feature-arrow {
          opacity: 1 !important;
          transform: translateX(6px);
        }
      `}</style>
    </div>
  );
};

// Features with image icons, ensure images are displayed properly in the card
const features = [
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/101521_CampusScenes_05_-1.jpg"
        alt="Explore Universities"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Explore Universities',
    desc: "Explore universities across 8+ countries, like you’re shopping for your dream course.",
    to: '/universities'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/Screenshot%202025-08-26%20at%201.15.52%E2%80%AFPM.png"
        alt="Book Mentors"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Book Mentors',
    desc: "Book real students and alumni as mentors—people who’ve lived the journey, not just sold it.",
    to: '/services#mentors'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/1_-_LakeheadU_Simcoe_Hall_Orillia_Campus.jpg"
        alt="Verified Housing"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Verified Housing',
    desc: "Secure verified housing before you even board the flight.",
    to: '/services#housing'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/image-from-rawpixel-id-17439769-jpeg.jpg"
        alt="Scholarships & Loans"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Scholarships & Loans',
    desc: "Compare loans, find scholarships, and manage your finances smartly.",
    to: '/services#finance'
  }
];

// Animated "3D" Globe Image (as before)
const AnimatedGlobeImage: React.FC = () => {
  const globeRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      const y = Math.sin(frame * 0.025) * 10;
      const scale = 1 + Math.sin(frame * 0.018) * 0.07;
      if (globeRef.current) {
        globeRef.current.style.transform = `translateY(${y}px) scale(${scale})`;
        globeRef.current.style.transition = 'transform 0.12s cubic-bezier(.4,2,.6,1)';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <img
      ref={globeRef}
      src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Adobe%20Express%20-%20file.png"
      alt="Dreaming of Abroad"
      style={{
        width: 110,
        height: 110,
        objectFit: 'contain',
        position: 'absolute',
        left: 380,
        top: 0,
        zIndex: 3,
        filter: 'drop-shadow(0 4px 16px #2563eb22)',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    />
  );
};

// Dotted line (not array of dots) between head and globe, tightly in the gap and not covering girl's face
const DottedLine: React.FC = () => {
  // These coordinates are tuned to fit the gap between the girl's head and the globe image
  const startX = 350; // just right of girl's head
  const startY = 100; // near top of girl's head
  const endX = 400;   // left edge of globe
  const endY = 50;    // center-top of globe
  const cpx = (startX + endX) / 2 + 10;
  const cpy = startY - 70;

  return (
    <svg
      width={endX - startX + 40}
      height={startY - endY + 40}
      style={{
        position: 'absolute',
        left: startX,
        top: endY - 20,
        zIndex: 4,
        pointerEvents: 'none'
      }}
    >
      <path
        d={`M0,${startY - endY + 20} Q${(endX - startX) / 2 + 5},${cpy - endY + 20} ${endX - startX},10`}
        stroke="#2563eb"
        strokeWidth={3}
        fill="none"
        strokeDasharray="8,10"
        opacity={0.7}
      />
    </svg>
  );
};

export const AboutPage: React.FC = () => {
  const aboutRef = useReveal();

  return (
    <main
      className="page container about"
      ref={aboutRef as any}
      style={{
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        background: 'linear-gradient(135deg, rgb(242 234 255) 0%, rgb(248, 250, 252) 100%)',
        color: '#1B0044',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        width: '100vw',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      {/* Hero Section */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        padding: '3rem 1.5rem 2rem 1.5rem',
        boxSizing: 'border-box',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 900,
            color: '#5727A3',
            marginBottom: '1.2rem',
            letterSpacing: '-2px',
            lineHeight: 1.1
          }}>
            Our Story: <span style={{
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>The Amazon for Studying Abroad</span>
          </h1>
          <p style={{
            fontSize: '1.13rem',
            color: '#1B0044',
            fontWeight: 500,
            marginBottom: '1.2rem'
          }}>
            We didn’t build <b>Yournextuniversity</b> because we wanted to be another consultancy. We built it because we got tired of watching students get lost in a system full of half-truths, hidden costs, and overhyped promises.
          </p>
          <p style={{
            fontSize: '1.13rem',
            color: '#1B0044',
            fontWeight: 500,
            marginBottom: '1.2rem'
          }}>
            We’ve sat in the university offices. We’ve worked as official representatives for many international universities. We’ve seen firsthand how students are pushed into courses they don’t need, charged for services they never asked for, and left clueless once they land abroad.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 320, textAlign: 'center', position: 'relative', minHeight: 420 }}>
          {/* Radiant effect behind the girl */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 170,
              transform: 'translateX(-50%)',
              width: 340,
              height: 340,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #93c5fd 0%, #60a5fa88 40%, #2563eb33 70%, transparent 100%)',
              filter: 'blur(18px) brightness(1.15)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
          {/* Girl image */}
          <img
            src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/image-from-rawpixel-id-15542441-png.png"
            alt="Thinking Girl"
            style={{
              width: 300,
              height: 420,
              objectFit: 'contain',
              borderRadius: 32,
              margin: '0 auto',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
          />
          {/* Dotted line (thinking effect) in gap between girl head and globe */}
          <DottedLine />
          {/* Animated Globe */}
          <AnimatedGlobeImage />
        </div>
      </section>

      {/* Enhanced Interactive Features Section */}
      <section style={{
        maxWidth: 1200,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem',
        background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA11 100%)',
        borderRadius: '2.2rem',
        boxShadow: '0 4px 24px 0 #5727A322',
        position: 'relative',
        overflow: 'visible'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.1rem',
          fontWeight: 800,
          color: '#5727A3',
          marginBottom: '2.2rem'
        }}>
          Not a Consultancy—A Marketplace
        </h2>
        <p style={{
          fontSize: '1.13rem',
          color: '#1B0044',
          fontWeight: 500,
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          <b style={{ color: '#5727A3' }}>Yournextuniversity</b> is not a consultancy—it’s a <span style={{ color: '#5727A3', fontWeight: 700 }}>marketplace</span>. Think of us as the <b style={{ color: '#5727A3' }}>Amazon for studying abroad</b>.
        </p>
        <div
          className="about-features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            alignItems: 'stretch',
            width: '100%',
            position: 'relative',
            color: '#1B0044'
          }}
        >
          {features.map((f, i) => (
            <Feature3DCard key={f.title} {...f} />
          ))}
        </div>
        {/* Decorative animated gradient line below cards */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            right: 40,
            bottom: 18,
            height: 6,
            borderRadius: 4,
            background: 'linear-gradient(90deg,#60a5fa 0%,#2563eb 100%)',
            opacity: 0.13,
            filter: 'blur(2px)'
          }}
        />
        <style>{`
          @media (max-width: 700px) {
            .about-features-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </section>
      
      {/* Promise Section */}
      <section
        style={{
          width: '100vw',
          margin: '2.5rem 0 0 0',
          padding: '0',
          color: '#1B0044',
          textAlign: 'center',
          borderRadius: 0,
          fontWeight: 600,
          position: 'relative',
        }}
      >
        {/* Decorative gradient border and subtle background effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        <div style={{
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <h2 style={{
            fontSize: '2.1rem',
            fontWeight: 900,
            marginBottom: '1.1rem',
            letterSpacing: '-1px',
            color: '#5727A3',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 16px #9F7AEA22',
            lineHeight: 1.13,
            display: 'inline-block',
            padding: '0.2em 0.7em',
            borderRadius: 18,
            boxShadow: '0 2px 12px #9F7AEA22'
          }}>
            No Packages. No Pressure. No Sales Pitch.
          </h2>
          <p style={{
            fontSize: '1.18rem',
            fontWeight: 500,
            marginBottom: '1.2rem',
            color: '#1B0044',
            lineHeight: 1.7,
            textShadow: '0 1px 2px #fff8'
          }}>
            Just <span style={{ color: '#5727A3', fontWeight: 700 }}>choice</span>, <span style={{ color: '#5727A3', fontWeight: 700 }}>clarity</span>, and <span style={{ color: '#5727A3', fontWeight: 700 }}>control</span>.<br />
            We built this for the students who value honesty over hype, who want to learn from people who’ve actually been there, done that, and who want studying abroad to feel as easy as adding items to a cart.
          </p>
          <p style={{
            fontSize: '1.18rem',
            color: '#9F7AEA',
            fontWeight: 700,
            margin: '1.2rem 0 0 0',
            textShadow: '0 1px 2px #fff8'
          }}>
            We’re not here to “sell” you a dream. We’re here to help you <span style={{ textDecoration: 'underline', color: '#1B0044' }}>live it</span>.
          </p>
        </div>
      </section>

      {/* Short Bio Section */}
      <section
        style={{
          maxWidth: 700,
          margin: '2.5rem auto 10px auto',
          padding: '2.2rem 1.5rem 2.5rem 1.5rem',
          background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA 100%)',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px 0 #5727A322, 0 2px 8px 0 #9F7AEA22',
          color: '#1B0044',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1.13rem',
          letterSpacing: '-0.5px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative gradient border */}
        <div
          style={{
            position: 'absolute',
            inset: -5,
            borderRadius: '1.7rem',
            background: 'conic-gradient(from 90deg, #5727A3 0deg 120deg, #9F7AEA 120deg 240deg, #5727A3 240deg 360deg)',
            opacity: 0.13,
            zIndex: 0,
            filter: 'blur(4px)',
            pointerEvents: 'none'
          }}
        />
        {/* Removed Floating icon */}
        <span style={{
          display: 'inline-block',
          fontSize: '1.25rem',
          fontWeight: 800,
          marginBottom: '.7rem',
          letterSpacing: '-1px',
          background: 'rgb(87, 39, 163)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 2,
          position: 'relative'
        }}>
          We’re <b>Yournextuniversity</b> — the Amazon for Studying Abroad.
        </span>
        <div style={{
          margin: '1.1rem 0 0 0',
          color: '#1B0044',
          fontWeight: 600,
          fontSize: '1.13rem',
          zIndex: 2,
          position: 'relative',
          borderRadius: 12,
          padding: '1.1rem 1rem 1.1rem 1rem',
          boxShadow: '0 2px 8px 0 #5727A322',
          lineHeight: 1.6
        }}>
        Tired of overpriced packages, fake promises, and confusing agents? We give you <b>real students</b>, <b>verified housing</b>, <b>scholarships</b>, and guidance that actually works. Pick what you need. Skip the hype. Own your journey.
        </div>
        <style>{`
          @keyframes bio-bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-7px);}
          }
        `}</style>
      </section>
    </main>
  );
};
