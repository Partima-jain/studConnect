import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const valuePoints = [
  { title:'Real Student Insights', text:'Current international students share up‑to‑date campus & lifestyle realities.' },
  { title:'Profile Alignment', text:'Get candid feedback on goals, competitiveness & strategic positioning.' },
  { title:'Country & Program Clarity', text:'Compare destinations on cost, outcomes, culture & career pathways.' },
  { title:'Actionable Next Steps', text:'Leave every session with prioritized, time‑bound tasks.' }
];

// Combine flow into 3 wrapped steps for better readability and no overflow
const flow = [
  {
    step: 1,
    title: 'Book & Match',
    text: 'Request a session, share your goals, and we’ll pair you with a relevant mentor. You’ll get a mini prep brief before your call.',
  },
  {
    step: 2,
    title: 'Live Peer Call',
    text: '45–50 min structured conversation with open Q&A. Get candid feedback, compare options, and receive actionable next steps.',
  },
  {
    step: 3,
    title: 'Recap & Support',
    text: 'Receive a session recap, key links, and a next-step checklist. Enjoy 72h of follow-up support for any clarifications.',
  },
];


const faqs = [
  { q:'Who are the peers?', a:'Vetted current international students / recent grads matched by destination & discipline.' },
  { q:'How fast is matching?', a:'Usually under 24 hours; niche profiles may take a bit longer.' },
  { q:'Can I change mentor?', a:'Yes—one complimentary rematch with reason provided.' },
  { q:'Do peers edit SOP/essays?', a:'They give directional feedback only; drafting sits in Application Assistance.' }
];

const testimonials = [
  { name:'Ishika • CS Canada', text:'Gave me realistic insight on co‑ops & budgeting I never saw on blogs.' },
  { name:'Daniel • MS Germany', text:'Helped me choose between two programs with a clear ROI perspective.' },
  { name:'Fatima • UK Health', text:'Left with a concrete 6‑week prep checklist. Removed uncertainty.' }
];

const API_BASE = 'http://localhost:8000'; // Change to your backend URL if needed

const PeerCounsellingPage: React.FC = () => {
  const nav = useNavigate();
  // Add ref for counsellor section
  const counsellorSectionRef = useRef<HTMLDivElement>(null);
  // Directory state
  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [bookingStep, setBookingStep] = useState<'profile'|'slot'|'payment'|'confirmed'|null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [bookingLoading, setBookingLoading] = useState(false);
  // Stripe loader
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState<any | null>(null);

  useEffect(() => {
    // Load Stripe.js script if not already present
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => setStripeLoaded(true);
      document.body.appendChild(script);
    } else {
      setStripeLoaded(true);
    }
  }, []);

  // Fetch peer counsellors from API
  useEffect(() => {
    fetch(`${API_BASE}/peer-counsellors`)
      .then(r => r.json())
      .then(setCounsellors);
  }, []);

  // Fetch available slots when counsellor or date changes
  useEffect(() => {
    if (selected && bookingStep === 'slot' && selectedDate) {
      fetch(`${API_BASE}/peer-counsellors/${selected.id}/available-slots`)
        .then(r => r.json())
        .then(data => {
          // Filter slots for selectedDate
          setSlots(data.filter((s:any) => s.date === selectedDate));
        });
    }
  }, [selected, bookingStep, selectedDate]);

  // Start booking: show profile modal
  const startBooking = (c: any) => {
    setSelected(c);
    setBookingStep('profile');
    setSelectedDate('');
    setSelectedSlot(null);
    setBookingId(null);
    setMeetingLink('');
  };

  // Book slot (status: pending)
  const handleBookSlot = async () => {
    setBookingLoading(true);
    const user = { id: 1, email: 'user@example.com' }; // TODO: Replace with real user
    const payload = {
      user_id: user.id,
      user_email: user.email,
      counsellor_id: selected.id,
      counsellor_email: selected.email,
      slot_id: selectedSlot.slot_id,
      slot_date: `${selectedSlot.date}T${selectedSlot.start_time}`,
      payment_status: 'pending'
    };
    const res = await fetch(`${API_BASE}/peer-counsellors/book-slot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setBookingId(data.id);
    setBookingStep('payment');
    setBookingLoading(false);
  };

  // Razorpay payment integration
  const handleRazorpayPayment = async () => {
    setBookingLoading(true);
    // TODO: Replace with your Razorpay key and amount
    const razorpayKey = 'rzp_test_xxxxxxxx';
    const amount = 99900; // in paise (₹999)
    const options = {
      key: razorpayKey,
      amount,
      currency: 'INR',
      name: 'Peer Counselling Session',
      description: 'Session Fee',
      handler: async function (response: any) {
        // On payment success, confirm payment
        await fetch(`${API_BASE}/peer-counsellors/confirm-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            booking_id: bookingId,
            // meeting_link: ... // Optionally set
          })
        });
        setBookingStep('confirmed');
        setBookingLoading(false);
      },
      prefill: {
        email: 'user@example.com'
      }
    };
    // Load Razorpay script if not loaded
    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } else {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  };

  // Scroll to counsellor section on Book Session click
  const goContact = () => {
    if (counsellorSectionRef.current) {
      counsellorSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      nav('/contact');
      requestAnimationFrame(()=>document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth'}));
    }
  };

  // Handle Stripe redirect result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setBookingStep('confirmed');
      setSelected(selected => selected); // keep selected
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <main
      className="peer-page"
      style={{
        background: 'radial-gradient(at 70% 0%, rgb(224, 195, 252) 0%, rgb(223 196 255) 35%, rgb(240, 230, 255) 70%, rgb(255, 255, 255) 100%)',
        minHeight: '100vh',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      <section className="peer-hero" style={{
        background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
        color: '#fff',
        padding: '3.5rem 0 2.5rem 0',
        borderRadius: '0 0 36px 36px',
        boxShadow: '0 8px 48px #9F7AEA22',
        marginBottom: '2.5rem'
      }}>
        <div className="peer-hero__inner" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h1>
            <span className="gradient-text" style={{
              background: 'linear-gradient(90deg, #fff 0%, #9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 900,
              fontSize: '2.5rem',
              letterSpacing: '-1px',
              display: 'inline-block'
            }}>Peer Counselling</span>
            <span style={{ display: 'block', fontWeight: 700, fontSize: '1.3rem', marginTop: '.7rem', color: '#e0e7ff' }}>
              Connect With Current International Students
            </span>
          </h1>
          <p className="peer-lead" style={{ color: '#e0e7ff', fontSize: '1.18rem', margin: '1.2rem 0 2rem 0', fontWeight: 500 }}>
            Validate your plan, compare countries & programs, and avoid costly mistakes by speaking to students already living your next step.
          </p>
          <div className="peer-cta-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <button className="btn btn-primary" style={{
              background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1.13rem',
              padding: '0.8rem 2.2rem',
              boxShadow: '0 2px 8px #9F7AEA33',
              cursor: 'pointer'
            }} onClick={goContact}>Book Session</button>
            <button className="btn btn-small" style={{
              background: '#fff',
              color: '#5727A3',
              border: '1.5px solid #9F7AEA',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1.13rem',
              padding: '0.8rem 2.2rem',
              cursor: 'pointer'
            }} onClick={()=>nav('/services')}>All Services</button>
          </div>
          <div className="peer-stats" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '2rem', color: '#fff', fontWeight: 900 }}>3k+</strong><span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Peer Sessions</span></div>
            <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '2rem', color: '#fff', fontWeight: 900 }}>800+</strong><span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Universities</span></div>
            <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '2rem', color: '#fff', fontWeight: 900 }}>6</strong><span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Countries</span></div>
          </div>
        </div>
      </section>


      {/* --- Peer Counsellor Directory --- */}
      <section
        className="peer-section"
        ref={counsellorSectionRef}
        style={{
          background: 'linear-gradient(120deg, #f8e8ff 0%, #e0c3fc 100%)',
          borderRadius: 32,
          boxShadow: '0 8px 48px #9F7AEA22',
          maxWidth: 1200,
          margin: '2.5rem auto 0 auto',
          padding: '3.5rem 1.5rem 2.5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* Animated Glow Behind Heading */}
        <div style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 320,
          height: 80,
          background: 'radial-gradient(circle at 50% 50%, #c084fc55 0%, #fff0 80%)',
          filter: 'blur(18px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'glowPulse 3s infinite alternate'
        }} />
        {/* Gradient Animated Heading */}
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2.5rem',
          marginBottom: '1.2rem',
          letterSpacing: '-1px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 50%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Meet Our Peer Counsellors
        </h2>
        {/* Decorative Underline */}
        <div style={{
          width: 90,
          height: 7,
          borderRadius: 8,
          margin: '0 auto 2.2rem auto',
          background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 50%, #f472b6 100%)',
          opacity: 0.7,
          boxShadow: '0 2px 12px #a21caf33'
        }} />
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1.5\' fill=\'%239F7AEA\' fill-opacity=\'0.13\'/%3E%3C/svg%3E") repeat',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div className="peer-directory" style={{
          display:'flex',
          flexWrap:'wrap',
          gap:'2.2rem',
          justifyContent:'center',
          position: 'relative',
          zIndex: 1
        }}>
          {counsellors.map(c => (
            <div
              key={c.id}
              className="peer-profile-card"
              style={{
                background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
                borderRadius:20,
                boxShadow:'0 4px 24px #a78bfa33, 0 1.5px 8px #f472b633',
                padding:'2rem 1.5rem 1.5rem 1.5rem',
                width:320,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-7px) scale(1.025)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #a78bfa55, 0 2px 16px #f472b655';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px #a78bfa33, 0 1.5px 8px #f472b633';
              }}
            >
              {/* Card Glow Accent */}
              <div style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 60,
                background: 'radial-gradient(circle at 50% 50%, #f472b655 0%, #fff0 80%)',
                filter: 'blur(12px)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />
              <img
                src={c.profile_image_url}
                alt={c.name}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '.8rem',
                  border: '4px solid #a21caf',
                  boxShadow: '0 2px 12px #f472b655',
                  flexShrink: 0
                }}
              />
              <h3 style={{
                marginBottom:'.2rem',
                color:'#7c3aed',
                fontWeight:900,
                fontSize:'1.25rem',
                letterSpacing:'-0.5px'
              }}>{c.name}</h3>
              <div style={{
                fontSize:'.99rem',
                color:'#a21caf',
                marginBottom:'.2rem',
                fontWeight:700
              }}>{c.university}</div>
              <div style={{
                fontSize:'.93rem',
                color:'#1B0044',
                marginBottom:'.2rem'
              }}>{c.program}</div>
              {/* Only show minimal info here */}
              <div style={{
                fontSize:'.93rem',
                color:'#475569',
                marginBottom:'.5rem'
              }}>{c.location}</div>
              <div style={{
                marginBottom:'.7rem',
                color:'#a21caf',
                fontWeight:700,
                fontSize:'.98rem'
              }}>
                Fee: <span style={{color:'#7c3aed'}}>₹{c.charges}</span>
              </div>
              <div style={{display: 'flex', gap: '0.7rem', marginTop: '.5rem'}}>
                <button className="btn btn-primary btn-small" style={{
                  background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '1.07rem',
                  padding: '0.7rem 1.6rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #a21caf33'
                }} onClick={()=>startBooking(c)}>
                  Book Session
                </button>
                <button className="btn btn-secondary btn-small" style={{
                  background: '#fff',
                  color: '#a21caf',
                  border: '1.5px solid #a21caf',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: '1.07rem',
                  padding: '0.7rem 1.6rem',
                  cursor: 'pointer'
                }} onClick={()=>setShowDetails(c)}>
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Details Modal */}
        {showDetails && (
          <div className="modal-overlay" style={{
            position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(87,39,163,0.13)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center'
          }} onClick={()=>setShowDetails(null)}>
            <div className="modal" style={{
              background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
              borderRadius:22,
              boxShadow:'0 8px 48px #9F7AEA22, 0 2px 16px #9F7AEA33',
              padding:'2.5rem 2.2rem 2.2rem 2.2rem',
              minWidth:360,
              maxWidth:540,
              position:'relative',
              overflow:'auto',
              maxHeight:'92vh',
              border: '2.5px solid #9F7AEA'
            }} onClick={e=>e.stopPropagation()}>
              {/* Profile Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.3rem',
                marginBottom: '1.5rem'
              }}>
                <img
                  src={showDetails.profile_image_url}
                  alt={showDetails.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #9F7AEA',
                    boxShadow: '0 2px 12px #9F7AEA33',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h2 style={{
                    color:'#5727A3',
                    fontWeight:900,
                    fontSize:'1.7rem',
                    margin:0,
                    letterSpacing:'-1px'
                  }}>{showDetails.name}</h2>
                  <div style={{color:'#7c3aed', fontWeight:700, fontSize:'1.08rem', marginTop:'.2rem'}}>{showDetails.university}</div>
                  <div style={{color:'#1B0044', fontWeight:500, fontSize:'.98rem'}}>{showDetails.program}</div>
                  <div style={{color:'#475569', fontWeight:500, fontSize:'.97rem'}}>{showDetails.location}</div>
                </div>
              </div>
              {/* Charges */}
              <div style={{
                background: 'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                color: '#5727A3',
                fontWeight: 800,
                fontSize: '1.08rem',
                borderRadius: 10,
                padding: '0.5rem 1.2rem',
                display: 'inline-block',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 8px #9F7AEA22'
              }}>
                Fee: <span style={{color:'#7c3aed'}}>₹{showDetails.charges}</span>
              </div>
              {/* About Section */}
              <section style={{
                marginBottom: '1.2rem',
                background: '#f8fafc',
                borderRadius: 12,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 1px 8px #9F7AEA11'
              }}>
                <h3 style={{
                  color:'#7c3aed',
                  fontWeight:800,
                  fontSize:'1.13rem',
                  margin:'0 0 .5rem 0',
                  letterSpacing:'-0.5px'
                }}>About</h3>
                <div style={{color:'#475569', fontSize:'1.01rem', fontWeight:500}}>{showDetails.about}</div>
              </section>
              {/* Expertise & Languages */}
              <section style={{
                marginBottom: '1.2rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{flex:1, minWidth:120}}>
                  <h4 style={{color:'#7c3aed', fontWeight:700, fontSize:'.99rem', margin:'0 0 .3rem 0'}}>Expertise</h4>
                  <div style={{display:'flex', flexWrap:'wrap', gap:'.4rem'}}>
                    {showDetails.expertise && showDetails.expertise.split(',').map((a:string) =>
                      <span key={a} style={{
                        background:'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                        color:'#5727A3',
                        borderRadius:8,
                        padding:'2px 10px',
                        fontSize:'.87rem',
                        fontWeight:700,
                        boxShadow:'0 1px 4px #9F7AEA22'
                      }}>{a}</span>
                    )}
                  </div>
                </div>
                <div style={{flex:1, minWidth:120}}>
                  <h4 style={{color:'#7c3aed', fontWeight:700, fontSize:'.99rem', margin:'0 0 .3rem 0'}}>Languages</h4>
                  <div style={{color:'#7c3aed', fontWeight:600, fontSize:'.97rem'}}>{showDetails.languages}</div>
                </div>
              </section>
              {/* Contact Section */}
              <section style={{
                marginBottom: '1.2rem',
                background: '#f8fafc',
                borderRadius: 12,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 1px 8px #9F7AEA11'
              }}>
                <h3 style={{
                  color:'#7c3aed',
                  fontWeight:800,
                  fontSize:'1.13rem',
                  margin:'0 0 .5rem 0'
                }}>Contact</h3>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.2rem'}}><b>Email:</b> {showDetails.email}</div>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.2rem'}}><b>Phone:</b> {showDetails.phone}</div>
                <div style={{color:'#475569', fontSize:'.99rem'}}><b>Preferred:</b> {showDetails.contact_method}</div>
              </section>
              {/* Experience Section */}
              <section style={{
                marginBottom: '1.2rem',
                background: '#f8fafc',
                borderRadius: 12,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 1px 8px #9F7AEA11'
              }}>
                <h3 style={{
                  color:'#7c3aed',
                  fontWeight:800,
                  fontSize:'1.13rem',
                  margin:'0 0 .5rem 0'
                }}>Experience & Journey</h3>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Work:</b> {showDetails.work_experience}</div>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Peer Support:</b> {showDetails.peer_support_experience}</div>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Projects:</b> {showDetails.projects}</div>
                <div style={{color:'#475569', fontSize:'.99rem'}}><b>Journey:</b> {showDetails.journey}</div>
              </section>
              {/* Book/Close Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem', // Increased gap for better spacing
                marginTop: '1.5rem',
                margin: '0.3rem',
              }}>
                <button
                  className="btn btn-primary btn-small"
                  style={{
                    background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800
                  }}
                  onClick={() => {
                    setShowDetails(null);
                    startBooking(showDetails);
                  }}
                >
                  Book Session
                </button>
                <button
                  className="btn btn-secondary btn-small"
                  style={{}}
                  onClick={()=>setShowDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Keyframes for glow animation */}
        <style>
          {`
            @keyframes glowPulse {
              0% { opacity: 0.7; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </section>

      {/* --- Booking Modal --- */}
      {selected && bookingStep && (
        <div className="modal-overlay" style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(87,39,163,0.13)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'
        }} onClick={()=>{setSelected(null); setBookingStep(null);}}>
          <div className="modal" style={{
            background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
            borderRadius:16,
            boxShadow:'0 2px 24px #9F7AEA22',
            padding:'2rem',
            minWidth:320,
            maxWidth:400,
            position:'relative'
          }} onClick={e=>e.stopPropagation()}>
            {bookingStep === 'profile' && (
              <>
                <h3 style={{color:'#6366f1'}}>Book Session with {selected.name}</h3>
                <img src={selected.profile_image_url} alt={selected.name} style={{width:60, borderRadius:30, margin:'1rem auto'}} />
                <div style={{fontSize:'.97rem', color:'#334155'}}>{selected.university}, {selected.program}</div>
                <div style={{margin:'1rem 0', color:'#475569'}}>{selected.about}</div>
                <button
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800
                  }}
                  onClick={()=>setBookingStep('slot')}
                >
                  Choose Time Slot
                </button>
              </>
            )}
            {bookingStep === 'slot' && (
              <>
                <h3 style={{color:'#6366f1'}}>Select a Date</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(null); }}
                  style={{marginBottom: '1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd'}}
                />
                {/* Slot Picker */}
                {selectedDate && (
                  <div style={{display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'1rem'}}>
                    {selectedSlot && slots.length === 0 && <span style={{color:'#64748b'}}>No slots available</span>}
                    {slots.map(slot => (
                      <button
                        key={slot.slot_id}
                        disabled={false}
                        style={{
                          padding: '.5rem 1.1rem',
                          borderRadius: 8,
                          border: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '1.5px solid #9F7AEA' : '1.5px solid #e5e7eb',
                          background: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '#9F7AEA' : '#fff',
                          color: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '#fff' : '#5727A3',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot.start_time} - {slot.end_time}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800
                  }}
                  onClick={handleBookSlot}
                  disabled={!selectedSlot || bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Proceed to Payment'}
                </button>
              </>
            )}
            {bookingStep === 'payment' && (
              <>
                <h3 style={{color:'#6366f1'}}>Payment</h3>
                <p>Session Fee: <strong>₹{selected.charges}</strong></p>
                <div style={{marginBottom:'.7rem', color:'#6366f1', fontWeight:600}}>
                  Date: {selectedSlot?.date} <br />
                  Slot: {selectedSlot?.start_time} - {selectedSlot?.end_time}
                </div>
                <button
                  className="btn btn-primary"
                  style={{marginBottom:'.7rem', background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                    color: '#fff'}}
                  onClick={handleRazorpayPayment}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Pay with Razorpay'}
                </button>
                <div style={{fontSize:'.85rem', color:'#64748b', marginTop:'.7rem'}}>
                  Payment confirmation triggers a booking confirmation email.
                </div>
              </>
            )}
            {bookingStep === 'confirmed' && (
              <>
                <h3 style={{color:'#22c55e'}}>Booking Confirmed!</h3>
                <p>
                  You will receive a confirmation email and WhatsApp message with your meeting link and reminders.
                  <br />
                  {meetingLink && (
                    <span>
                      <b>Meeting Link:</b> <a href={meetingLink} target="_blank" rel="noopener">{meetingLink}</a>
                    </span>
                  )}
                </p>
                <button
                  className="btn btn-primary"
                  style={{marginTop:'1.2rem',
                margin: '0.3rem',}} // Add marginTop for spacing
                  onClick={()=>{setSelected(null); setBookingStep(null); setSelectedDate(''); setSelectedSlot(null); setMeetingLink('');}}
                >Done</button>
              </>
            )}
            <button
              className="btn btn-small"
              style={{marginTop:'1.2rem',
                margin: '0.3rem',}} // Add marginTop for spacing
              onClick={()=>{setSelected(null); setBookingStep(null); setSelectedDate(''); setSelectedSlot(null); setMeetingLink('');}}
            >Close</button>
          </div>
        </div>
      )}

      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>Session Flow</h2>
        <ol className="peer-flow" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {flow.map(f=>(
            <li key={f.step} style={{
              background: 'linear-gradient(135deg, rgb(238 229 253) 60%, rgb(235 199 254) 100%)',
              borderRadius: 16,
              boxShadow: '0 2px 12px #9F7AEA11',
              padding: '1.5rem 1.2rem',
              minWidth: 200,
              maxWidth: 260,
              textAlign: 'center',
              flex: '1 1 200px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div className="peer-flow__num" style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem',
                margin: '0 auto 1rem auto',
                boxShadow: '0 2px 8px #9F7AEA22'
              }}>{f.step}</div>
              {/* Heading and step number in same row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                marginBottom: '.7rem',
                width: '100%',
                flexWrap: 'nowrap'
              }}>
                {/* Hide the number here, since it's above */}
                <h3 style={{
                  color: '#5727A3',
                  fontWeight: 800,
                  fontSize: '1.13rem',
                  margin: 0,
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  flex: 1,
                  textAlign: 'center'
                }}>{f.title}</h3>
              </div>
              <p style={{
                color: '#1B0044',
                fontSize: '1.01rem',
                fontWeight: 500,
                margin: 0,
                wordBreak: 'break-word',
                whiteSpace: 'normal'
              }}>{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>Real Outcomes</h2>
        <div className="peer-testimonials" style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {testimonials.map(t=>(
            <div key={t.name} className="peer-testimonial" style={{
              background: 'linear-gradient(135deg,#e7c7fe 40%,#fff 100%)',
              borderRadius: 16,
              boxShadow: '0 2px 12px #9F7AEA11',
              padding: '1.5rem 1.2rem',
              minWidth: 220,
              maxWidth: 320,
              textAlign: 'center',
              color: '#5727A3',
              fontWeight: 600
            }}>
              <p style={{ fontStyle: 'italic', color: '#1B0044', fontWeight: 500 }}>"{t.text}"</p>
              <span style={{ color: '#9F7AEA', fontWeight: 700 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>


      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 2.5rem auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>FAQs</h2>
        <div className="peer-faq">
          {faqs.map(f=>(
            <details key={f.q} style={{
              background: '#f8fafc',
              borderRadius: 10,
              marginBottom: '.9rem',
              padding: '.7rem 1rem',
              color: '#1B0044',
              border: '1.5px solid #e0e7ff'
            }}>
              <summary style={{ color: '#5727A3', fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
              <p style={{ margin: '.5rem 0 0 0', color: '#334155' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PeerCounsellingPage;
