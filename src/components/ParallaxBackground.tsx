import React, { useEffect, useRef } from 'react';

// Use visually rich Unsplash images for each layer, with gradients for depth
const layers = [
  {
    className: 'parallax-layer parallax-layer-back',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(214,197,240,0.7) 0%,rgba(159,122,234,0.3) 100%), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-mid',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(159,122,234,0.5) 0%,rgba(214,197,240,0.2) 100%), url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80)',
    },
  },
  {
    className: 'parallax-layer parallax-layer-front',
    style: {
      backgroundImage:
        'linear-gradient(120deg,rgba(255,255,255,0.2) 0%,rgba(159,122,234,0.2) 100%), url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80)',
    },
  },
];

export const ParallaxBackground: React.FC = () => {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let ticking = false;
    // More pronounced 3D effect with scale and slight rotation
    const speeds = [
      { y: 0.18, r: -2, s: 1.05 },
      { y: 0.38, r: 2, s: 1.10 },
      { y: 0.75, r: -4, s: 1.16 },
    ];

    const updateParallax = () => {
      const scrollY = window.scrollY;
      layerRefs.current.forEach((layer, i) => {
        if (layer) {
          const { y, r, s } = speeds[i];
          layer.style.transform = `translateY(${scrollY * y}px) scale(${s}) rotateZ(${r * scrollY / 1000}deg)`;
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
          ref={el => (layerRefs.current[i] = el)}
        />
      ))}
      {/* Overlay for contrast and soft light */}
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
          transition: opacity 0.3s;
        }
        .parallax-layer-back { z-index: 1; opacity: 0.7; }
        .parallax-layer-mid { z-index: 2; opacity: 0.85; }
        .parallax-layer-front { z-index: 3; opacity: 1; }
        .parallax-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 4;
          background: linear-gradient(180deg, #fff8 0%, #fff4 100%);
          pointer-events: none;
          mix-blend-mode: lighten;
        }
      `}</style>
    </div>
  );
};
          
