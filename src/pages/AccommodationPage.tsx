import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AccommodationPage: React.FC = () => {
  const navigate = useNavigate();

  // Responsive styles
  const heroSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2.5rem',
    padding: '2.2rem 1.5rem 0.2rem 1.5rem',
    maxWidth: 1300,
    margin: '0 auto',
    position: 'relative'
  };

  const heroTextStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 320,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 600
  };

  const heroImagesWrapper: React.CSSProperties = {
    flex: 1,
    minWidth: 320,
    textAlign: 'center',
    position: 'relative',
    minHeight: 520,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600
  };

  const heroImagesInner: React.CSSProperties = {
    position: 'relative',
    width: 540,
    height: 420,
    margin: '60px auto 1.5rem auto',
    perspective: 900,
    display: 'block',
    maxWidth: '100%',
    maxHeight: '70vw'
  };

  // Responsive adjustments using a style tag for mobile/tablet
  // (You can move this to a CSS/SCSS file if you wish)
  const responsiveStyle = `
    @media (max-width: 1100px) {
      .accom-hero-images-inner {
        width: 95vw !important;
        max-width: 380px !important;
        height: 220px !important;
      }
      .accom-hero-img-center {
        width: 170px !important;
        height: 170px !important;
        left: 50% !important;
        transform: translateX(-50%) scale(1.05) !important;
      }
      .accom-hero-img-side {
        width: 110px !important;
        height: 110px !important;
        top: 40px !important;
      }
      .accom-hero-img-side.left {
        left: 10px !important;
        right: auto !important;
        transform: rotate(-18deg) scale(1.02) !important;
      }
      .accom-hero-img-side.right {
        right: 10px !important;
        left: auto !important;
        transform: rotate(18deg) scale(1.02) !important;
      }
    }

    .accom-hero-images-inner::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <main style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', minHeight: '100vh' }}>
      <style>{responsiveStyle}</style>
      {/* Hero Section */}
      <section
        className="accom-hero-section"
        style={heroSectionStyle}
      >
        {/* Decorative Globe/Blob */}
        <div
          style={{
            position: 'absolute',
            left: -120,
            top: -80,
            width: 320,
            height: 320,
            background: 'radial-gradient(circle at 60% 40%, #60a5fa55 0%, #2563eb22 100%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 0,
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />
        <div className="accom-hero-text" style={heroTextStyle}>
          <h1 style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#1e3a8a',
            marginBottom: '1.2rem',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textShadow: '0 4px 24px #2563eb22, 0 1px 2px #fff8'
          }}>
            Find Your Home Abroad
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: '#334155',
            fontWeight: 500,
            marginBottom: '1.2rem',
            lineHeight: 1.6
          }}>
            Landing in a new country? Don’t stress. With our accommodation partners your student housing is sorted, safe, and student-approved—before you even step on the plane.
          </p>
          <button
            onClick={() => window.open('https://pfecglobal.com.bd/accommodations/', '_blank', 'noopener,noreferrer')}
            style={{
              marginTop: '1.2rem',
              background: 'linear-gradient(90deg, rgb(55, 81, 138) 0%, rgb(96, 165, 250) 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '1rem 2.3rem',
              fontWeight: 700,
              fontSize: '1.13rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px #2563eb33',
              transition: 'background 0.18s',
              letterSpacing: '.5px'
            }}
          >
            Book Accommodation Now
          </button>
        </div>
        <div style={heroImagesWrapper}>
          <div className="accom-hero-images-inner" style={heroImagesInner}>
            {/* Show as gallery in mobile, 3 images side by side */}
            <img
              className="accom-hero-img-side left"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.10.57%E2%80%AFPM.png"
              alt="Student Room"
              style={{
                position: 'absolute',
                left: 0,
                top: 70,
                width: 240,
                height: 240,
                objectFit: 'cover',
                borderRadius: 28,
                boxShadow: '0 8px 32px #2563eb22',
                border: '4px solid #fff',
                transform: 'rotate(-18deg) scale(1.06)',
                zIndex: 1,
                transition: 'transform 0.18s'
              }}
            />
            <img
              className="accom-hero-img-center"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.07.41%E2%80%AFPM.png"
              alt="Student Accommodation"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: 300,
                height: 300,
                objectFit: 'cover',
                borderRadius: 36,
                boxShadow: '0 8px 32px #2563eb33',
                border: '5px solid #fff',
                transform: 'translateX(-50%) scale(1.18)',
                zIndex: 3,
                transition: 'transform 0.18s'
              }}
            />
            <img
              className="accom-hero-img-side right"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/dillon-kydd-2keCPb73aQY-unsplash.jpg"
              alt="Student Apartment"
              style={{
                position: 'absolute',
                right: 0,
                top: 70,
                width: 240,
                height: 240,
                objectFit: 'cover',
                borderRadius: 28,
                boxShadow: '0 12px 48px #2563eb22',
                border: '4px solid #fff',
                transform: 'rotate(18deg) scale(1.06)',
                zIndex: 2,
                transition: 'transform 0.18s'
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Students Love Us */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '.2rem .5rem 0 .5rem', // further reduce top padding
      }}>
        <h2 style={{
          fontSize: '1.7rem',
          fontWeight: 900,
          color: '#2563eb',
          marginBottom: '2.5rem',
          textAlign: 'center',
          letterSpacing: '-1px'
        }}>
          Why Students Love Us
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2.5rem',
            marginBottom: '2.2rem',
            position: 'relative'
          }}
        >
          {/* Decorative connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '8%',
              right: '8%',
              height: 0,
              borderTop: '2.5px dashed #60a5fa',
              zIndex: 0,
              opacity: 0.25
            }}
            aria-hidden="true"
          />
          {/* Card 1 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#60a5fa 60%,#2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #2563eb22'
            }}>
              ✔️
            </div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a' }}>Verified Listings</b>
            <div style={{fontSize: '1.07rem', color: '#334155', marginTop: 8}}>Every property is checked by students who’ve actually lived there.</div>
          </div>
          {/* Card 2 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#60a5fa 60%,#2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #2563eb22'
            }}>
              ★
            </div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a' }}>Real Reviews</b>
            <div style={{fontSize: '1.07rem', color: '#334155', marginTop: 8}}>Honest feedback from peers, not fancy brochures.</div>
          </div>
          {/* Card 3 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#60a5fa 60%,#2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #2563eb22'
            }}>
              ⇄
            </div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a' }}>Flexible Options</b>
            <div style={{fontSize: '1.07rem', color: '#334155', marginTop: 8}}>Shared flats, private rooms, or everything in between.</div>
          </div>
          {/* Card 4 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#60a5fa 60%,#2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #2563eb22'
            }}>
              🖱
            </div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a' }}>Easy Booking</b>
            <div style={{fontSize: '1.07rem', color: '#334155', marginTop: 8}}>Reserve online without hidden fees.</div>
          </div>
          {/* Card 5 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#60a5fa 60%,#2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #2563eb22'
            }}>
              🛡
            </div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a' }}>Safe & Supportive</b>
            <div style={{fontSize: '1.07rem', color: '#334155', marginTop: 8}}>Because “home” should feel like home.</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 0 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 900,
          color: '#2563eb',
          marginBottom: '2.2rem',
          textAlign: 'center',
          letterSpacing: '-1px'
        }}>
          How It Works
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Step 1 */}
          <div style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.6rem 1.2rem 1.2rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: 44,
              height: 44,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: 12,
              boxShadow: '0 2px 8px #2563eb22'
            }}>1</div>
            <b style={{ fontSize: '1.09rem', color: '#1e3a8a', marginBottom: 6 }}>Browse Listings</b>
            <div style={{fontSize: '1.02rem', color: '#334155', textAlign: 'center'}}>Swipe through verified housing options in your city.</div>
          </div>
          {/* Step 2 */}
          <div style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.6rem 1.2rem 1.2rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: 44,
              height: 44,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: 12,
              boxShadow: '0 2px 8px #2563eb22'
            }}>2</div>
            <b style={{ fontSize: '1.09rem', color: '#1e3a8a', marginBottom: 6 }}>Read Student Reviews</b>
            <div style={{fontSize: '1.02rem', color: '#334155', textAlign: 'center'}}>Get the real scoop on each place.</div>
          </div>
          {/* Step 3 */}
          <div style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.6rem 1.2rem 1.2rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: 44,
              height: 44,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: 12,
              boxShadow: '0 2px 8px #2563eb22'
            }}>3</div>
            <b style={{ fontSize: '1.09rem', color: '#1e3a8a', marginBottom: 6 }}>Connect Directly</b>
            <div style={{fontSize: '1.02rem', color: '#334155', textAlign: 'center'}}>Chat with roommates or hosts to clarify doubts.</div>
          </div>
          {/* Step 4 */}
          <div style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #2563eb11',
            padding: '1.6rem 1.2rem 1.2rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: 44,
              height: 44,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: 12,
              boxShadow: '0 2px 8px #2563eb22'
            }}>4</div>
            <b style={{ fontSize: '1.09rem', color: '#1e3a8a', marginBottom: 6 }}>Book Confidently</b>
            <div style={{fontSize: '1.02rem', color: '#334155', textAlign: 'center'}}>Lock in your space and start your journey stress-free.</div>
          </div>
        </div>
      </section>
      {/* Pro Tips */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 0 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.18rem',
          fontWeight: 900,
          color: '#2563eb',
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          Pro Tips
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '1.5rem',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          {/* Tip 1 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #60a5fa'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #2563eb22',
              border: '3px solid #fff'
            }}>1</div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a', marginBottom: 6 }}>Start Early</b>
            <div style={{fontSize: '1.07rem', color: '#334155', textAlign: 'center'}}>The best rooms get booked fast.</div>
          </div>
          {/* Tip 2 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #60a5fa'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #2563eb22',
              border: '3px solid #fff'
            }}>2</div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a', marginBottom: 6 }}>Ask Questions</b>
            <div style={{fontSize: '1.07rem', color: '#334155', textAlign: 'center'}}>Don’t hesitate to reach out to current residents.</div>
          </div>
          {/* Tip 3 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #e0e7ff 0%, #fff 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2563eb11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #60a5fa'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #2563eb22',
              border: '3px solid #fff'
            }}>3</div>
            <b style={{ fontSize: '1.13rem', color: '#1e3a8a', marginBottom: 6 }}>Budget Smart</b>
            <div style={{fontSize: '1.07rem', color: '#334155', textAlign: 'center'}}>Compare options and pick what suits your lifestyle.</div>
          </div>
        </div>
      </section>
      {/* Our Promise & Testimonial */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 3rem 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.18rem',
          fontWeight: 900,
          color: '#2563eb',
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          Our Promise
        </h2>
        <div style={{
          background: 'linear-gradient(120deg,#fff 60%,#e0e7ff 100%)',
          borderRadius: 14,
          boxShadow: '0 2px 12px #2563eb11',
          padding: '1.3rem 1.7rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: 500,
          color: '#334155',
          fontSize: '1.07rem'
        }}>
          No hidden fees. No pressure. No surprises. Just student-approved housing, straight from those who’ve lived it.
        </div>
        <blockquote style={{
          background: '#f1f5fd',
          borderLeft: '4px solid #2563eb',
          borderRadius: 12,
          padding: '1.2rem 1.7rem',
          fontStyle: 'italic',
          color: '#1e3a8a',
          margin: 0,
          textAlign: 'center',
          fontSize: '1.08rem'
        }}>
          “Finding a place was the hardest part—until I found StudConnect. Booking my apartment was literally a 10-minute process, and I felt safe and prepared!”<br />
          <span style={{fontWeight: 700, color: '#2563eb'}}>– Student Ambassador</span>
        </blockquote>
      </section>
    </main>
  );
};

export default AccommodationPage;

