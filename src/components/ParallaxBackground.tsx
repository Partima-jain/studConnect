import React, { useEffect, useRef } from 'react';

// Use Unsplash + gradients for cinematic vibes
const layers = [
  {
    className: 'parallax-layer parallax-layer-back',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(214,197,240,0.7) 0%,rgba(159,122,234,0.3) 100%), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-deep',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(120,120,255,0.4) 0%,rgba(200,150,240,0.2) 100%), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-mid',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(159,122,234,0.5) 0%,rgba(214,197,240,0.2) 100%), url(https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-front',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(159,122,234,0.25) 100%), url(https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-top',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(240,240,255,0.25) 0%,rgba(180,160,255,0.15) 100%), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80)',
    },
  },
];

export const ParallaxBackground: React.FC = () => {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let ticking = false;
    // More layers with smoother motion & slight depth
    const speeds = [
      { y: 0.12, r: -1, s: 1.03 },
      { y: 0.20, r: 1, s: 1.05 },
      { y: 0.35, r: -2, s: 1.08 },
      { y: 0.55, r: 2, s: 1.12 },
      { y: 0.75, r: -3, s: 1.16 },
    ];

    const updateParallax = () => {
      const scrollY = window.scrollY;
      layerRefs.current.forEach((layer, i) => {
        if (layer) {
          const { y, r, s } = speeds[i];
          layer.style.transform = `translateY(${scrollY * y}px) scale(${s}) rotateZ(${r * scrollY / 1500}deg)`;
        }
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-bg">
      {layers.map((layer, i) => (
        <div
          key={i}
          className={layer.className}
          style={{
            ...layer.style,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          ref={(el) => (layerRefs.current[i] = el)}
        />
      ))}
      {/* Soft overlay for dreamy feel */}
      <div className="parallax-overlay" />
      <style>{`
        .parallax-bg {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: -10;
          overflow: hidden;
          pointer-events: none;
        }
        .parallax-layer {
          will-change: transform;
          transition: opacity 0.4s ease-in-out;
        }
        .parallax-layer-back { z-index: 1; opacity: 0.65; }
        .parallax-layer-deep { z-index: 2; opacity: 0.75; }
        .parallax-layer-mid { z-index: 3; opacity: 0.85; }
        .parallax-layer-front { z-index: 4; opacity: 0.95; }
        .parallax-layer-top { z-index: 5; opacity: 1; }
        .parallax-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 6;
          background: radial-gradient(circle at top, rgba(255,255,255,0.2), transparent 70%),
                      linear-gradient(180deg, #ffffff22 0%, #00000044 100%);
          pointer-events: none;
          mix-blend-mode: soft-light;
        }
      `}</style>
    </div>
  );
};
