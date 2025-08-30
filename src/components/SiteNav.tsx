import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SiteNav.css';
import { useAuth } from '../context/AuthContext';

const servicesDropdown = [
  {
    name: 'Main Counsellor Counselling & Peer Counselling',
    path: '/services/peer-counselling',
  },
  {
    name: 'Accommodation Assistance',
    path: '/accommodation',
  },
  {
    name: 'Airport Pickup',
    path: '/services/airport-pickup',
  },
  {
    name: 'Financial Services / Education Loans',
    path: '/financial-services',
  },
  {
    name: 'International Study Application Process',
    path: '/services/international-application-process',
  },
];

export const SiteNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navIn, setNavIn] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setNavIn(true), 80);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 10) {
        setShowSticky(true);
        setVisible(currentY < lastScrollY.current); // Show when scrolling up, hide when down
      } else {
        // setShowSticky(false);
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`site-nav${navIn ? ' site-nav-3d-in' : ''}${showSticky ? ' site-nav-sticky' : ''}${visible ? ' site-nav-visible' : ' site-nav-hidden'}`}
      role="navigation"
      aria-label="Main Navigation"
      style={{
        background: 'linear-gradient(90deg, #D6C5F0 0%, #9F7AEA 100%)',
        color: '#1B0044',
        borderRadius: '22px',
        margin: '1.2rem auto 1.5rem auto',
        maxWidth: '1200px',
        position: showSticky ? 'fixed' : 'relative',
        top: showSticky ? 0 : undefined,
        left: showSticky ? 0 : undefined,
        right: showSticky ? 0 : undefined,
        width: showSticky ? '100%' : 'auto',
        boxShadow: showSticky
          ? '0 8px 32px 0 #5727A355, 0 1.5px 8px 0 #9F7AEA33'
          : '0 4px 24px 0 #5727A355, 0 1.5px 8px 0 #9F7AEA33',
        zIndex: 100,
        transition: 'box-shadow 0.3s, transform 0.3s, position 0s',
        transform: !visible && showSticky ? 'translateY(-150%)' : undefined,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.01)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px 0 #5727A388, 0 2px 12px 0 #9F7AEA44';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 #5727A355, 0 1.5px 8px 0 #9F7AEA33';
      }}
    >
      <div className="container site-nav__inner" style={{
        WebkitBackdropFilter:'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div className="site-nav__left" style={{
          flex: '0 0 auto',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex'
        }}>
          <button
            className="hamburger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            style={{
              background: '#fff',
              boxShadow: open ? '0 2px 12px 0 #9F7AEA44' : '0 1px 4px 0 #5727A322',
              borderRadius: '50%',
              border: 'none',
              transition: 'box-shadow 0.3s, background 0.3s',
              outline: open ? '2px solid #9F7AEA' : 'none'
            }}
          >
            <span /><span /><span />
          </button>
          <NavLink
            to="/"
            className="logo"
            onClick={() => setOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: '1.7rem',
              letterSpacing: '-1px',
              color: '#5727A3',
              background: 'none',
              WebkitBackgroundClip: 'initial',
              WebkitTextFillColor: 'initial',
              backgroundClip: 'initial',
              textShadow: '0 2px 12px #fff3, 0 1px 2px #5727A311'
            }}
          >
            Yournextuniversity
          </NavLink>
        </div>
        <div
          className={`links ${open ? 'links--open' : ''}`}
          style={{
            gap: '.5rem',
            alignItems: 'center',
            flex: '1 1 auto',
            justifyContent: 'flex-end',
            display: 'flex',
            flexWrap: 'nowrap'
          }}
        >
          <NavLink
            to="/about"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >About</NavLink>
          <div
            className="nav-services-dropdown"
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink
              to="/services"
              onClick={()=>setOpen(false)}
              style={{
                background: 'none',
                color: '#5727A3',
                borderRadius: '18px',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '.65rem 1.2rem',
                boxShadow: 'none',
                border: 'none',
                transition: 'all 0.25s',
                position: 'relative',
                zIndex: 2
              }}
            >
              Services
              <svg style={{ marginLeft: 6, verticalAlign: 'middle' }} width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M6 8l4 4 4-4" stroke="#5727A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </NavLink>
            {servicesOpen && (
              <div
                className="services-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  minWidth: 240,
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F022',
                  padding: '0.5rem 0',
                  zIndex: 100,
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'fadein .18s cubic-bezier(.4,2,.6,1)'
                }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {servicesDropdown.map((item) => (
                  <div
                    key={item.path}
                    style={{
                      padding: '0.85rem 1.3rem',
                      color: '#5727A3',
                      fontWeight: 600,
                      fontSize: '1.03rem',
                      textDecoration: 'none',
                      border: 'none',
                      background: 'none',
                      borderRadius: 12,
                      transition: 'background 0.15s, color 0.15s',
                      margin: '0 0.2rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    tabIndex={0}
                    aria-label={item.name}
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                      navigate(item.path);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setOpen(false);
                        setServicesOpen(false);
                        navigate(item.path);
                      }
                    }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA22 100%)';
                      (e.currentTarget as HTMLDivElement).style.color = '#9F7AEA';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'none';
                      (e.currentTarget as HTMLDivElement).style.color = '#5727A3';
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <NavLink
            to="/universities"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >Universities</NavLink>
          <NavLink
            to="/contact"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >Contact</NavLink>
          {/* <ThemeToggle /> */}
          {user ? (
            <div style={{display:'flex',alignItems:'center',gap:'.5rem', flexWrap: 'nowrap'}}>
              <span style={{
                fontSize:'.9rem',
                opacity:.85,
                color:'#5727A3',
                background:'#E9D8FD',
                borderRadius:'12px',
                padding:'.4rem 1rem',
                fontWeight:700,
                boxShadow:'0 1px 6px #9F7AEA22',
                whiteSpace: 'nowrap'
              }}>{user.full_name || user.email}</span>
              <button
                className="btn btn-small"
                type="button"
                onClick={logout}
                style={{
                  background: 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap'
                }}
              >Logout</button>
            </div>
          ) : (
            <div style={{display:'flex', gap:'.5rem', flexWrap: 'nowrap'}}>
              <NavLink
                to="/auth/login"
                onClick={()=>setOpen(false)}
                className={({isActive}) => 'btn btn-small' + (isActive ? ' btn-primary' : '')}
                style={({isActive}) => ({
                  background: isActive ? 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)' : '#fff',
                  color: isActive ? '#fff' : '#5727A3',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33'
                    : '0 2px 8px 0 #e0e7ef',
                  border: isActive ? 'none' : '1px solid #e0e7ef',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap'
                })}
              >Login</NavLink>
              <NavLink
                to="/auth/register"
                onClick={()=>setOpen(false)}
                className={({isActive}) => 'btn btn-small' + (isActive ? ' btn-primary' : '')}
                style={({isActive}) => ({
                  background: isActive ? 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)' : '#fff',
                  color: isActive ? '#fff' : '#5727A3',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33'
                    : '0 2px 8px 0 #e0e7ef',
                  border: isActive ? 'none' : '1px solid #e0e7ef',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap'
                })}
              >Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: none;}
        }
        .services-dropdown-menu a:active {
          background: linear-gradient(90deg,#D6C5F0 0%,#9F7AEA22 100%) !important;
          color: #9F7AEA !important;
        }
        @media (max-width: 900px) {
          .nav-services-dropdown .services-dropdown-menu {
            position: static !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin-top: 0 !important;
            min-width: 0 !important;
          }
        }
        .site-nav {
          opacity: 0;
          transform: perspective(900px) translateY(-80px) rotateX(18deg) scale3d(0.97,0.97,1);
          transition: transform 0.85s cubic-bezier(.4,2,.6,1), opacity 0.85s cubic-bezier(.4,2,.6,1);
        }
        .site-nav.site-nav-3d-in {
          opacity: 1;
          transform: none;
        }
        .site-nav.site-nav-sticky {
          animation: navStickyFadeIn .4s;
        }
        .site-nav.site-nav-hidden {
          pointer-events: none;
        }
        .site-nav.site-nav-visible {
          pointer-events: auto;
        }
        @keyframes navStickyFadeIn {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </nav>
  );
};

