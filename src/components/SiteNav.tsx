import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SiteNav.css';
import { useAuth } from '../context/AuthContext';

// const ThemeToggle: React.FC = () => {
//   const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light');
//   useEffect(() => {
//     document.documentElement.dataset.theme = theme;
//     localStorage.setItem('theme', theme);
//   }, [theme]);
//   return (
//     <button aria-label="Toggle theme" className="btn btn-small" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
//       {theme === 'light' ? '🌙' : '☀️'}
//     </button>
//   );
// };

export const SiteNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <nav
      className="site-nav"
      role="navigation"
      aria-label="Main Navigation"
      style={{
        background: 'rgba(245, 247, 251, 0.98)',
        color: '#1e293b',
        borderRadius: '22px',
        margin: '1.2rem auto 1.5rem auto',
        maxWidth: '1200px',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 4px 24px 0 rgba(37,99,235,0.08), 0 1.5px 8px 0 rgba(59,130,246,0.06)',
        transition: 'box-shadow 0.3s, transform 0.3s'
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.01)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px 0 rgba(37,99,235,0.13), 0 2px 12px 0 rgba(59,130,246,0.09)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 rgba(37,99,235,0.08), 0 1.5px 8px 0 rgba(59,130,246,0.06)';
      }}
    >
      <div className="container site-nav__inner" style={{
        backdropFilter:'blur(8px)',
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
              boxShadow: open ? '0 2px 12px 0 #3b82f644' : '0 1px 4px 0 #2563eb22',
              borderRadius: '50%',
              border: 'none',
              transition: 'box-shadow 0.3s, background 0.3s',
              outline: open ? '2px solid #3b82f6' : 'none'
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
              color: '#1e3a8a',
              background: 'none',
              WebkitBackgroundClip: 'initial',
              WebkitTextFillColor: 'initial',
              backgroundClip: 'initial',
              textShadow: '0 2px 12px #fff3, 0 1px 2px #2563eb11'
            }}
          >
            StudConnect
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
            style={({isActive}) => ({
              background: isActive ? 'linear-gradient(90deg, rgb(55 81 138) 0%, rgb(96, 165, 250) 100%)' : '#fff',
              color: isActive ? '#fff' : '#1e3a8a',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: isActive
                ? '0 4px 16px 0 #2563eb55, 0 1.5px 8px 0 #3b82f622'
                : '0 2px 8px 0 #e0e7ef',
              border: isActive ? 'none' : '1px solid #e0e7ef',
              transition: 'all 0.25s'
            })}
          >About</NavLink>
          <NavLink
            to="/services"
            onClick={()=>setOpen(false)}
            style={({isActive}) => ({
              background: isActive ? 'linear-gradient(90deg, rgb(55 81 138) 0%, rgb(96, 165, 250) 100%)' : '#fff',
              color: isActive ? '#fff' : '#1e3a8a',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: isActive
                ? '0 4px 16px 0 #2563eb55, 0 1.5px 8px 0 #3b82f622'
                : '0 2px 8px 0 #e0e7ef',
              border: isActive ? 'none' : '1px solid #e0e7ef',
              transition: 'all 0.25s'
            })}
          >Services</NavLink>
          <NavLink
            to="/universities"
            onClick={()=>setOpen(false)}
            style={({isActive}) => ({
              background: isActive ? 'linear-gradient(90deg, rgb(55 81 138) 0%, rgb(96, 165, 250) 100%)' : '#fff',
              color: isActive ? '#fff' : '#1e3a8a',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: isActive
                ? '0 4px 16px 0 #2563eb55, 0 1.5px 8px 0 #3b82f622'
                : '0 2px 8px 0 #e0e7ef',
              border: isActive ? 'none' : '1px solid #e0e7ef',
              transition: 'all 0.25s'
            })}
          >Universities</NavLink>
          <NavLink
            to="/contact"
            onClick={()=>setOpen(false)}
            style={({isActive}) => ({
              background: isActive ? 'linear-gradient(90deg, rgb(55 81 138) 0%, rgb(96, 165, 250) 100%)' : '#fff',
              color: isActive ? '#fff' : '#1e3a8a',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: isActive
                ? '0 4px 16px 0 #2563eb55, 0 1.5px 8px 0 #3b82f622'
                : '0 2px 8px 0 #e0e7ef',
              border: isActive ? 'none' : '1px solid #e0e7ef',
              transition: 'all 0.25s'
            })}
          >Contact</NavLink>
          {/* <ThemeToggle /> */}
          {user ? (
            <div style={{display:'flex',alignItems:'center',gap:'.5rem', flexWrap: 'nowrap'}}>
              <span style={{
                fontSize:'.9rem',
                opacity:.85,
                color:'#1e3a8a',
                background:'#e0e7ef',
                borderRadius:'12px',
                padding:'.4rem 1rem',
                fontWeight:700,
                boxShadow:'0 1px 6px #2563eb11',
                whiteSpace: 'nowrap'
              }}>{user.full_name || user.email}</span>
              <button
                className="btn btn-small"
                type="button"
                onClick={logout}
                style={{
                  background: 'linear-gradient(180deg,#3b82f6 0%,#1e3a8a 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: '0 6px 18px -4px #2563eb55, 0 2px 8px 0 #3b82f622',
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
                  background: isActive ? 'linear-gradient(180deg,#3b82f6 0%,#1e3a8a 100%)' : '#fff',
                  color: isActive ? '#fff' : '#1e3a8a',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #2563eb55, 0 2px 8px 0 #3b82f622'
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
                  background: isActive ? 'linear-gradient(180deg,#3b82f6 0%,#1e3a8a 100%)' : '#fff',
                  color: isActive ? '#fff' : '#1e3a8a',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #2563eb55, 0 2px 8px 0 #3b82f622'
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
    </nav>
  );
};
