import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Modal } from '../components/Modal';
import programsData from './programs.json';
import countriesData from './countries.json';
import universitiesData from './universities.json';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const BASE_URL = "https://studconnect-backend.onrender.com"; 
// const BASE_URL = "http://127.0.0.1:8000";
const PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 200;

interface ProgramItem {
  id: string;
  type: string;
  attributes: any;
  school_id: string;
}

export const UniversitiesPage: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [openIntakes, setOpenIntakes] = useState<any | null>(null); // <-- Add this line at the top-level of the component
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const [minTuition, setMinTuition] = useState('');
  const [maxTuition, setMaxTuition] = useState('');
  const [programName, setProgramName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [country, setCountry] = useState('');

  // Use JSON files for dropdowns
  const [allCountries, setAllCountries] = useState<{ label: string; value: string }[]>([]);
  const [allUniversities, setAllUniversities] = useState<string[]>([]);
  const [allProgramNames, setAllProgramNames] = useState<string[]>([]);

  useEffect(() => {
    const countryArr = Object.entries((countriesData as any).countries || {}).map(
      ([label, value]) => ({ label, value })
    );
    setAllCountries(countryArr);

    // Universities: array of names
    setAllUniversities(((universitiesData as any).universities || []));

    // Programs: array of names
    setAllProgramNames(((programsData as any).programs || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params: Record<string, string | number> = {
      page,
      page_size: rowsPerPage,
    };
    if (minTuition) params.min_fees = minTuition;
    if (maxTuition) params.max_fees = maxTuition;
    if (programName) params.program_name = programName;
    if (universityName) params.school_name = universityName;
    // For country, send the value (code) not the label
    if (country) params.country = country;

    fetch(`${BASE_URL}/api/programs/filter?${new URLSearchParams(params as any).toString()}`)
      .then(res => res.json())
      .then(res => {
        setPrograms(res.items || []);
        setTotal(res.total || 0);
      })
      .catch(e => setError(e.message || 'Failed loading programs'))
      .finally(() => setLoading(false));
  }, [minTuition, maxTuition, programName, universityName, country, page, rowsPerPage]);

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        marginTop: '2.5rem',
        borderRadius: '2.2rem',
        background: '#fff',
        boxShadow: '0 8px 32px 0 rgba(31,41,55,0.10), 0 1.5px 8px 0 #c7d2fe',
        padding: '2.2rem 2.2rem 1.5rem 2.2rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.2rem',
          gap: '1.5rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-1px',
              color: 'var(--uni-title, #1e293b)',
              transition: 'color 0.3s'
            }}>Programs</h1>
            <div style={{
              fontSize: '1.05rem',
              color: 'var(--uni-desc, #64748b)',
              marginTop: '.3rem',
              transition: 'color 0.3s'
            }}>Find and compare programs worldwide.</div>
          </div>
          <div style={{ display: 'flex', gap: '.9rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 140,
                background: '#f8fafc'
              }}>
              <option value="">All Countries</option>
              {allCountries.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select value={universityName} onChange={e => setUniversityName(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 180,
                background: '#f8fafc'
              }}>
              <option value="">All Universities</option>
              {allUniversities.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <select value={programName} onChange={e => setProgramName(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 180,
                background: '#f8fafc'
              }}>
              <option value="">All Programs</option>
              {allProgramNames.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Tuition"
              value={minTuition}
              onChange={e => setMinTuition(e.target.value)}
              style={{
                padding: '.55rem .9rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 100,
                background: '#f8fafc'
              }}
            />
            <input
              type="number"
              placeholder="Max Tuition"
              value={maxTuition}
              onChange={e => setMaxTuition(e.target.value)}
              style={{
                padding: '.55rem .9rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 100,
                background: '#f8fafc'
              }}
            />
          </div>
        </div>
        {/* Results summary and pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', marginTop: '-1.2rem' }}>
          <div>
            <span className="css-9fpggw" aria-live="polite" aria-atomic="true" data-testid="temp">
              {programs.length > 0
                ? `${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, total)} of ${total} items`
                : '0 items'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <label htmlFor="items-per-page" style={{ fontSize: '.98rem', color: '#64748b' }}>
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{
                padding: '.4rem .9rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 70,
                background: '#f8fafc'
              }}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
            {/* Pagination buttons */}
            <button
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: page > 1 ? 'pointer' : 'not-allowed',
                fontSize: '1.3rem',
                color: page > 1 ? '#2563eb' : '#cbd5e1',
                padding: '0 .5rem'
              }}
            >‹</button>
            <span style={{ fontSize: '.98rem', color: '#64748b' }}>{page} / {totalPages || 1}</span>
            <button
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: page < totalPages ? 'pointer' : 'not-allowed',
                fontSize: '1.3rem',
                color: page < totalPages ? '#2563eb' : '#cbd5e1',
                padding: '0 .5rem'
              }}
            >›</button>
          </div>
        </div>
        {/* Program Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.7rem 2.2rem',
            alignItems: 'stretch',
            marginTop: '2.7rem' // increased top margin for more space
          }}
        >
          {loading && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b' }}>Loading programs...</div>}
          {error && <div style={{ gridColumn: '1/-1', color: '#dc2626', textAlign: 'center' }}>Error: {error}</div>}
          {!loading && !error && programs.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b' }}>No programs found.</div>
          )}
          {!loading && !error && programs.map((p, idx) => {
            const attrs = p.attributes || {};
            const school = attrs.school || {};
            const logoUrl = school.logoThumbnailUrl || '/placeholder.png';
            const universityName = school.name || '';
            const location = [school.province || school.state, school.countryCode || school.country].filter(Boolean).join(', ');
            const campusCity = school.city || '';
            const tuitionFee = attrs.tuition ? `$${attrs.tuition}${attrs.currency ? ' ' + attrs.currency : ''}` : 'N/A';
            const applicationFee = attrs.applicationFee !== undefined ? (attrs.applicationFee ? `$${attrs.applicationFee}` : 'Free') : (attrs.application_fee ? `$${attrs.application_fee}` : 'Free');
            const duration = attrs.maxLength && attrs.minLength
              ? attrs.maxLength === attrs.minLength
                ? `${attrs.maxLength} months`
                : `${attrs.minLength} - ${attrs.maxLength} months`
              : attrs.duration || 'N/A';
            const programName = attrs.name || '';
            const programLevel = attrs.programLevel || attrs.level || '';
            const intakes = attrs.programIntakes || [];
            const schoolId = school.id || p.school_id;

            return (
              <article
                key={p.id}
                className="program-card"
                style={{
                  background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
                  borderRadius: '2rem',
                  boxShadow: '0 4px 24px 0 #2563eb18, 0 2px 8px 0 #60a5fa11',
                  border: '1.5px solid #e0e7ef',
                  padding: '3.5rem 1.7rem 1.7rem 1.7rem', // increased top padding for logo space
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 440,
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible', // allow logo to overflow
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  animation: 'fadein 0.7s cubic-bezier(.4,2,.6,1) both',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px 0 #2563eb33, 0 2px 12px 0 #60a5fa22';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px 0 #2563eb18, 0 2px 8px 0 #60a5fa11';
                }}
              >
                {/* Accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 7,
                  borderTopLeftRadius: '2rem',
                  borderTopRightRadius: '2rem',
                  opacity: 0.18,
                  zIndex: 1
                }} />
                {/* Floating logo */}
                <div style={{
                  position: 'absolute',
                  top: -32,
                  right: 24,
                  zIndex: 3,
                  background: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 2px 12px #2563eb22',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2.5px solid #e0e7ef'
                }}>
                  <img
                    src={logoUrl}
                    alt={universityName}
                    style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: '50%' }}
                  />
                </div>
                {/* University Name and Location */}
                <div style={{ marginBottom: '.7rem', marginTop: '1.5rem' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.18rem',
                      fontWeight: 800,
                      color: '#2563eb',
                      lineHeight: 1.2,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px'
                    }}
                    onClick={() => {
                      if (schoolId) navigate(`/universities/${schoolId}`);
                    }}
                    title={`View details for ${universityName}`}
                  >
                    {universityName}
                  </h3>
                  <div style={{ fontSize: '.97rem', color: '#334155', fontWeight: 600, marginTop: '.2rem' }}>
                    {location}
                  </div>
                </div>
                {/* Program Title */}
                <div style={{ marginBottom: '.7rem' }}>
                  <h2 style={{
                    fontSize: '1.13rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    margin: 0,
                    lineHeight: 1.25,
                    wordBreak: 'break-word'
                  }}>
                    {programName}
                  </h2>
                  <div style={{ fontSize: '.98rem', color: '#2563eb', marginTop: '.2rem', fontWeight: 600 }}>
                    {programLevel
                      ? programLevel
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, c => c.toUpperCase())
                      : ''}
                  </div>
                </div>
                {/* Details */}
                <dl style={{
                  fontSize: '.98rem',
                  lineHeight: '1.7',
                  margin: 0,
                  marginBottom: '.7rem',
                  color: '#334155',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#64748b', flex: 1, textAlign: 'left' }}>Location:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#334155', fontWeight: 500 }}>{location}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#64748b', flex: 1, textAlign: 'left' }}>Campus city:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#334155', fontWeight: 500 }}>{campusCity}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#64748b', flex: 1, textAlign: 'left' }}>Tuition (1st year):</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#334155', fontWeight: 500 }}>{tuitionFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#64748b', flex: 1, textAlign: 'left' }}>Application fee:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#334155', fontWeight: 500 }}>{applicationFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#64748b', flex: 1, textAlign: 'left' }}>Duration:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#334155', fontWeight: 500 }}>{duration}</dd>
                  </div>
                </dl>
                {/* View Details Button */}
                <button
                  style={{
                    marginTop: 'auto',
                    background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '.7rem 1.5rem',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    border: 'none',
                    boxShadow: '0 2px 8px #2563eb22',
                    cursor: 'pointer',
                    transition: 'background 0.18s, box-shadow 0.18s'
                  }}
                  onClick={() => {
                    if (schoolId) navigate(`/universities/${schoolId}`);
                  }}
                >
                  View Details
                </button>
                {/* Fade-in animation */}
                <style>{`
                  @keyframes fadein {
                    0% { opacity: 0; transform: translateY(30px);}
                    100% { opacity: 1; transform: none;}
                  }
                `}</style>
              </article>
            );
          })}
        </div>
        {/* Modal for Success Prediction Details */}
        {openIntakes && (
          <div
            role="dialog"
            aria-modal="true"
            className="css-19pzjof"
            tabIndex={-1}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setOpenIntakes(null)}
          >
            <div
              className="css-14yws4s"
              style={{
                background: '#fff',
                borderRadius: '18px',
                maxWidth: 552,
                width: '95vw',
                maxHeight: '80vh',
                boxShadow: '0 8px 32px 0 rgba(31,41,55,0.18)',
                padding: '2rem 2rem 1.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Heading at top */}
              <h2 className="css-j24ftc" style={{ margin: 0, marginBottom: '1.2rem', textAlign: 'center' }}>
                <div className="css-1xh2rw1">
                  <div className="css-anbbrp">Success prediction</div>
                </div>
              </h2>
              {/* Scrollable content */}
              <IntakeAccordion intakes={openIntakes.intakes} />
              {/* Close button at bottom */}
              <div className="css-14tan51" style={{ textAlign: 'right', marginTop: '1.5rem' }}>
                <button
                  aria-disabled="false"
                  rel="noopener"
                  type="button"
                  className="css-22x0p3"
                  style={{
                    background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '.7rem 1.5rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px 0 rgba(37,99,235,0.18), 0 1.5px 8px 0 #93c5fd'
                  }}
                  onClick={() => setOpenIntakes(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <style>
              {`
                @media (min-width: 600px) {
                  .css-19pzjof > .css-14yws4s {
                    max-width: 552px;
                    max-height: calc(-48px + 100vh);
                  }
                }
                @media (min-width: 0px) {
                  .css-19pzjof > .css-14yws4s {
                    max-width: calc(-32px + 100vw);
                    max-height: calc(-48px + 100vh);
                  }
                }
              `}
            </style>
          </div>
        )}
      </div>
    </main>
  );
};

const IntakeAccordion: React.FC<{ intakes: any[] }> = ({ intakes }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
      {intakes.map((intake, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={intake.id || intake.startDate} style={{ borderRadius: '12px', overflow: 'hidden', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            {/* Summary row */}
            <div
              onClick={() => toggleOpen(index)}
              style={{
                cursor: 'pointer',
                padding: '.8rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                color: '#1e293b',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                {/* Intake start date */}
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>
                  {intake.startDate ? new Date(intake.startDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : ''}
                </div>
                {/* Arrow icon */}
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#e5e7eb',
                  position: 'absolute', right: '1rem', transition: 'transform 0.3s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                }} />
              </div>
            </div>
            {/* Details row (collapsible) */}
            {isOpen && (
              <div style={{
                padding: '1rem 1.2rem',
                borderTop: '1px solid #e5e7eb',
                background: '#fff',
                color: '#334155',
                fontSize: '.95rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 0
              }}>
                {/* Success score circles */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '.8rem' }}>
                  {intake.successScores && Object.entries(intake.successScores).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '70%', height: '70%', borderRadius: '50%',
                          background: key === 'overall' ? '#2563eb' : key === 'high' ? 'green' : key === 'average' ? 'orange' : 'red',
                          position: 'absolute', top: 0, left: 0
                        }} />
                        <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#fff', position: 'relative', zIndex: 1 }}>
                          {value}
                        </span>
                      </div>
                      <div style={{ fontSize: '.9rem', color: '#334155', fontWeight: 500 }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Details list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#334155', fontWeight: 500, lineHeight: 1.7 }}>
                  {intake.details && intake.details.map((detail, idx) => (
                    <li key={idx} style={{ paddingLeft: '1.2rem', position: 'relative', marginBottom: '.4rem' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#2563eb',
                        border: '2px solid #fff'
                      }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};