import React, { useRef, useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { FeaturedUniversities } from '../sections/FeaturedUniversities';
import { HowItWorks } from '../sections/HowItWorks';
import { Testimonials } from '../sections/Testimonials';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';
import { useNavigate } from 'react-router-dom';

// Inline minimal services preview (copy from ServicesPage)

// All services for the landing page carousel
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

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect for the services carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let frame: number;
    let scrollAmount = 0;
    let direction = 1;
    const speed = 0.7; // px per frame

    function animate() {
      if (!carousel) return;
      // If reached end, reverse direction (for infinite loop, use scrollLeft = 0)
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += speed * direction;
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // AboutPage Hero Section only (first section)
  const aboutHeroSection = (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2.5rem',
      flexWrap: 'wrap',
      padding: '3rem 1.5rem 2rem 1.5rem',
      boxSizing: 'border-box',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(90deg,#e0e7ff 0%,#f8fafc 100%)',
      boxShadow: '0 4px 24px #2563eb22',
      border: '2px solid #e0e7ff'
    }}>
      <div style={{ flex: 1, minWidth: 320 }}>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 900,
          color: '#1e3a8a',
          marginBottom: '1.2rem',
          letterSpacing: '-2px',
          lineHeight: 1.1
        }}>
          Our Story: <span style={{
            background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>The Amazon for Studying Abroad</span>
        </h1>
        <p style={{
          fontSize: '1.13rem',
          color: '#334155',
          fontWeight: 500,
          marginBottom: '1.2rem'
        }}>
          We didn’t build <b>StudConnect</b> because we wanted to be another consultancy. We built it because we got tired of watching students get lost in a system full of half-truths, hidden costs, and overhyped promises.
        </p>
        <p style={{
          fontSize: '1.13rem',
          color: '#334155',
          fontWeight: 500,
          marginBottom: '1.2rem'
        }}>
          We’ve sat in the university offices. We’ve worked as official representatives for many international universities. We’ve seen firsthand how students are pushed into courses they don’t need, charged for services they never asked for, and left clueless once they land abroad.
        </p>
        <button
          onClick={() => navigate('/about')}
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
          Show more
        </button>
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
        <svg
          width={90}
          height={70}
          style={{
            position: 'absolute',
            left: 350,
            top: 30,
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          <path
            d="M0,60 Q30,-30 80,10"
            stroke="#2563eb"
            strokeWidth={3}
            fill="none"
            strokeDasharray="8,10"
            opacity={0.7}
          />
        </svg>
        {/* Animated Globe */}
        <img
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
            pointerEvents: 'none',
            animation: 'aboutGlobeFloat 2.2s infinite cubic-bezier(.4,2,.6,1)'
          }}
        />
        <style>{`
          @keyframes aboutGlobeFloat {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-10px) scale(1.07);}
          }
        `}</style>
      </div>
    </section>
  );

  // Services Carousel Section
  const servicesSection = (
    <section style={{
      maxWidth: 1400,
      padding: '2.2rem 1.5rem',
      background: 'linear-gradient(90deg,#f8fafc 0%,#e0e7ff 100%)',
      boxShadow: '0 4px 24px #2563eb22',
      border: '2px solid #e0e7ff',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '2.2rem' }}>
        <h2 style={{
          fontSize: '2.1rem',
          fontWeight: 800,
          color: '#1b2e4b',
          marginBottom: '.7rem',
          letterSpacing: '-1px'
        }}>
          <span style={{
            display: 'inline-block',
            perspective: 400,
            textShadow: '0 2px 12px #2563eb11'
          }}>
            <span style={{ display: 'inline-block' }}>Our</span> <span style={{ display: 'inline-block' }}>Services</span>
          </span>
        </h2>
      </div>
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '1rem 0',
          marginBottom: '1.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="services-carousel"
      >
        {[...allServices, ...allServices].map((s, idx) => (
          <div
            key={s.code + idx}
            className="work-process-area landing-service-card"
            style={{
              minWidth: 340,
              maxWidth: 370,
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
              position: 'relative'
            }}
            onClick={() => navigate(s.path)}
            tabIndex={0}
            aria-label={s.name}
          >
            <div style={{position: 'relative', width: '100%', height: 170}}>
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: '100%',
                  height: 170,
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
        .services-carousel::-webkit-scrollbar { display: none; }
        .services-carousel { scrollbar-width: none; }
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
          /* Shiny, glassy, colored effect */
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
  );

  return (
    <>
      <Hero />
      {aboutHeroSection}
      {servicesSection}
      <FeaturedUniversities />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

