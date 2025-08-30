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

// --- New: Peer Counsellor Directory Template Data ---
const DUMMY_COUNSELLORS = [
  {
    id: 'c1',
    name: 'Aarav Sharma',
    university: 'MIT',
    course: 'Computer Science',
    year: '2024',
    areas: ['Admissions', 'Campus Life', 'Part-time Jobs'],
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Happy to share my MIT journey and tips for international students.',
    calendlyUrl: 'https://calendly.com/demo-counsellor/30min'
  },
  {
    id: 'c2',
    name: 'Sofia Lee',
    university: 'University of Toronto',
    course: 'Mechanical Engineering',
    year: '2025',
    areas: ['Scholarships', 'Living Costs', 'Internships'],
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Ask me about life in Canada and how to balance studies and work!',
    calendlyUrl: 'https://calendly.com/demo-counsellor2/30min'
  }
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'bank', label: 'Bank Transfer' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'stripe', label: 'Stripe' }
];

const PeerCounsellingPage: React.FC = () => {
  const nav = useNavigate();
  // Add ref for counsellor section
  const counsellorSectionRef = useRef<HTMLDivElement>(null);
  // Directory state
  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [bookingStep, setBookingStep] = useState<'profile'|'calendly'|'payment'|'confirmed'|null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [bookingLoading, setBookingLoading] = useState(false);
  // Stripe loader
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<{time: string, booked: boolean}[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [meetingLink, setMeetingLink] = useState<string>('');

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

  // Use dummy data for now
  useEffect(() => {
    setCounsellors(DUMMY_COUNSELLORS);
  }, []);

  // Fetch slots when date or counsellor changes
  useEffect(() => {
    if (selected && bookingStep === 'calendly' && selectedDate) {
      fetch(`/api/counsellors/${selected.id}/slots?date=${selectedDate}`)
        .then(r => r.json())
        .then(data => setSlots(data.slots || []));
    }
  }, [selected, bookingStep, selectedDate]);

  // Booking workflow handlers
  const startBooking = (c: any) => {
    setSelected(c);
    setBookingStep('profile');
  };

  // Payment mock
  const handlePayment = async () => {
    setBookingLoading(true);
    // Dummy API call
    await new Promise(res => setTimeout(res, 1200));
    setBookingStep('confirmed');
    setBookingLoading(false);
  };

  // Payment with Stripe (after slot selection)
  const handleStripePayment = async () => {
    setBookingLoading(true);
    // Replace with your Stripe publishable key and price ID
    const STRIPE_PK = 'pk_test_51Nw...yourkey...'; // TODO: Replace with your key
    const PRICE_ID = 'price_1Nw...yourpriceid...'; // TODO: Replace with your price id

    if (!window.Stripe && !stripeLoaded) {
      alert('Stripe is loading. Please wait a moment and try again.');
      setBookingLoading(false);
      return;
    }
    // Create Stripe instance
    const stripe = window.Stripe ? window.Stripe(STRIPE_PK) : (window as any).Stripe(STRIPE_PK);

    // Optionally, create Checkout Session on backend for security.
    // For demo, use client-only mode (test mode).
    await stripe.redirectToCheckout({
      lineItems: [{ price: PRICE_ID, quantity: 1 }],
      mode: 'payment',
      successUrl: window.location.origin + '/peer-counselling?payment=success',
      cancelUrl: window.location.origin + '/peer-counselling?payment=cancel',
      customerEmail: '', // Optionally prefill
    });

    // After payment success, book slot and get meeting link
    // (simulate here, replace with real API call)
    const res = await fetch('/api/book-slot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        counsellorId: selected.id,
        date: selectedDate,
        slot: selectedSlot,
        // ...user info...
      })
    });
    const result = await res.json();
    setMeetingLink(result.meetingLink || '');
    setBookingStep('confirmed');
    setBookingLoading(false);
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
    <main className="peer-page" style={{ background: 'radial-gradient(at 70% 0%, rgb(224, 195, 252) 0%, rgb(223 196 255) 35%, rgb(240, 230, 255) 70%, rgb(255, 255, 255) 100%)', minHeight: '100vh' }}>
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
            <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '2rem', color: '#fff', fontWeight: 900 }}>40+</strong><span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Universities</span></div>
            <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '2rem', color: '#fff', fontWeight: 900 }}>32</strong><span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Countries</span></div>
          </div>
        </div>
      </section>


      {/* --- Peer Counsellor Directory --- */}
      <section
        className="peer-section"
        ref={counsellorSectionRef}
        style={{
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
        }}>Meet Our Peer Counsellors</h2>
        <div className="peer-directory" style={{display:'flex', flexWrap:'wrap', gap:'2rem', justifyContent:'center'}}>
          {counsellors.map(c => (
            <div key={c.id} className="peer-profile-card" style={{
              background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
              borderRadius:16,
              boxShadow:'0 2px 16px #9F7AEA22',
              padding:'1.5rem',
              width:320,
              display:'flex',
              flexDirection:'column',
              alignItems:'center'
            }}>
              <img src={c.photo} alt={c.name} className="peer-profile-photo" style={{width:80, height:80, borderRadius:'50%', objectFit:'cover', marginBottom:'.8rem', border:'3px solid #9F7AEA'}} />
              <h3 style={{marginBottom:'.2rem', color:'#5727A3', fontWeight:800}}>{c.name}</h3>
              <div style={{fontSize:'.97rem', color:'#9F7AEA', marginBottom:'.2rem', fontWeight:700}}>{c.university}</div>
              <div style={{fontSize:'.9rem', color:'#1B0044', marginBottom:'.2rem'}}>{c.course} ({c.year})</div>
              <div className="peer-profile-areas" style={{display:'flex', flexWrap:'wrap', gap:'.4rem', marginBottom:'.5rem'}}>
                {c.areas.map((a:string) => <span key={a} className="chip" style={{background:'#e0e7ff', color:'#5727A3', borderRadius:8, padding:'2px 8px', fontSize:'.8rem', fontWeight:600}}>{a}</span>)}
              </div>
              <p style={{fontSize:'.95rem', color:'#475569', marginBottom:'.7rem', textAlign:'center'}}>{c.bio}</p>
              <div style={{width:'100%', marginBottom:'.7rem'}}>
                <strong style={{fontSize:'.93rem', color:'#5727A3'}}>Availability</strong>
                <div style={{marginTop:'.3rem', width:'100%', minHeight:60, background:'#f8fafc', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <iframe
                    src={c.calendlyUrl}
                    style={{width:'100%', minHeight:60, border:'none'}}
                    title="Calendly"
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-small" style={{
                background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '1.07rem',
                padding: '0.7rem 1.6rem',
                marginTop: '.5rem',
                cursor: 'pointer'
              }} onClick={()=>startBooking(c)}>
                Book Session
              </button>
            </div>
          ))}
        </div>
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
                <img src={selected.photo} alt={selected.name} style={{width:60, borderRadius:30, margin:'1rem auto'}} />
                <div style={{fontSize:'.97rem', color:'#334155'}}>{selected.university}, {selected.course} ({selected.year})</div>
                <div style={{margin:'1rem 0', color:'#475569'}}>{selected.bio}</div>
                <button className="btn btn-primary" onClick={()=>setBookingStep('calendly')}>Choose Time Slot</button>
              </>
            )}
            {bookingStep === 'calendly' && (
              <>
                <h3 style={{color:'#6366f1'}}>Select a Date & Time Slot</h3>
                {/* Date Picker */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(''); }}
                  style={{marginBottom: '1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd'}}
                />
                {/* Slot Picker */}
                {selectedDate && (
                  <div style={{display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'1rem'}}>
                    {slots.length === 0 && <span style={{color:'#64748b'}}>No slots available</span>}
                    {slots.map(slot => (
                      <button
                        key={slot.time}
                        disabled={slot.booked}
                        style={{
                          padding: '.5rem 1.1rem',
                          borderRadius: 8,
                          border: slot.booked ? '1.5px solid #e5e7eb' : '1.5px solid #9F7AEA',
                          background: slot.booked ? '#f1f5f9' : (selectedSlot === slot.time ? '#9F7AEA' : '#fff'),
                          color: slot.booked ? '#a1a1aa' : (selectedSlot === slot.time ? '#fff' : '#5727A3'),
                          fontWeight: 600,
                          cursor: slot.booked ? 'not-allowed' : 'pointer',
                          opacity: slot.booked ? 0.5 : 1
                        }}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  onClick={()=>setBookingStep('payment')}
                  disabled={!selectedSlot}
                >
                  Proceed to Payment
                </button>
              </>
            )}
            {bookingStep === 'payment' && (
              <>
                <h3 style={{color:'#6366f1'}}>Payment</h3>
                <p>Session Fee: <strong>₹999 / $20</strong></p>
                <div style={{marginBottom:'.7rem', color:'#6366f1', fontWeight:600}}>
                  Date: {selectedDate} <br />
                  Slot: {selectedSlot}
                </div>
                {/* Stripe payment button */}
                <button
                  className="btn btn-primary"
                  style={{marginBottom:'.7rem'}}
                  onClick={handleStripePayment}
                  disabled={bookingLoading || !stripeLoaded}
                >
                  {bookingLoading ? 'Processing...' : 'Pay with Card (Stripe)'}
                </button>
                <div style={{fontSize:'.85rem', color:'#64748b', marginTop:'.7rem'}}>
                  Payment confirmation triggers a booking confirmation email and WhatsApp message.
                </div>
              </>
            )}
            {bookingStep === 'confirmed' && (
              <>
                <h3 style={{color:'#22c55e'}}>Booking Confirmed!</h3>
                <p>
                  You will receive a confirmation email and WhatsApp message with your Zoom/Google Meet link and reminders.
                  <br />
                  {meetingLink && (
                    <span>
                      <b>Meeting Link:</b> <a href={meetingLink} target="_blank" rel="noopener">{meetingLink}</a>
                    </span>
                  )}
                </p>
                <button className="btn btn-primary" onClick={()=>{setSelected(null); setBookingStep(null); setSelectedDate(''); setSelectedSlot(''); setMeetingLink('');}}>Done</button>
              </>
            )}
            <button className="btn btn-small" style={{marginTop:'1rem'}} onClick={()=>{setSelected(null); setBookingStep(null); setSelectedDate(''); setSelectedSlot(''); setMeetingLink('');}}>Close</button>
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
