import React, { useRef, useState } from 'react';

const metrics = [
	{ value: '50+', label: 'Tutors' },
	{ value: '2K+', label: 'Top Universities' },
	{ value: '97%', label: 'Visa Success' }
];

export const Hero: React.FC = () => {
	// Scroll to Contact section on button click
	const handleScrollToContact = (e: React.MouseEvent) => {
		e.preventDefault();
		const el = document.getElementById('contact');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	// 3D tilt state and refs
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const imgRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const el = imgRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
		const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
		setTilt({ x: y * 15, y: x * 15 });
	};
	const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

	return (
		<header
			style={{
				width: '100%',
				background: 'linear-gradient(120deg, #D6C5F0 0%, #F0E6FF 100%)',
				padding: 0,
				boxSizing: 'border-box',
				backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0) 83.4%, rgb(255,255,255) 100%)',
				minHeight: '900px',
				display: 'flex',
				alignItems: 'center',
				position: 'relative', // for animated bg
				overflow: 'hidden'
			}}
			className="hero-animated-bg"
		>
			{/* Animated multi-color gradient background */}
			<div className="hero-bg-gradient hero-bg-gradient-multicolor" />
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					gap: 50,
					maxWidth: 1500,
					margin: '0 auto',
					padding: '0 32px',
					flexWrap: 'wrap',
					width: '100%'
				}}
			>
				{/* Left: Text content */}
				<div
					style={{
						flex: '1 1 400px',
						minWidth: 280,
						maxWidth: 700,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
            padding: '0 8px',
					}}
					className="hero-fadein-left"
				>
					<div
						style={{
							fontWeight: 700,
							fontSize: 20,
							color: '#000',
							marginBottom: 0,
							letterSpacing: 0,
							lineHeight: '32px'
						}}
					>
						Your Study Abroad
					</div>
					<div
						style={{
							fontWeight: 700,
							fontSize: 'clamp(32px, 7vw, 64px)',
							color: '#5727A3',
							padding: '0 0 30px 0',
							lineHeight: '1.1',
							marginBottom: 0,
							position: 'relative',
							overflow: 'hidden',
							textShadow: '0 8px 32px #9F7AEA33, 0 2px 8px #5727A355',
							animation: 'heroPop3D 1.2s cubic-bezier(.4,2,.6,1) 0.2s both'
						}}
						className="hero-shine-heading"
					>
						Dream it, Plan it, Achieve it!
						<span className="hero-shine-anim" />
					</div>
					<div
						style={{
							fontSize: 'clamp(16px, 3vw, 24px)',
							color: '#000',
							fontWeight: 400,
							padding: '0 0 40px 0',
							lineHeight: '1.5'
						}}
					>
						Yournextuniversity is your one-stop platform, guiding you from university selection to visas, loans, accommodation, and peer counselling.
					</div>
					<a
						href="#contact"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							whiteSpace: 'nowrap',
							padding: 'clamp(14px,2vw,22px) clamp(18px,6vw,32px)',
							background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
							borderRadius: 100,
							border: 'none',
							color: '#fff',
							fontWeight: 700,
							fontSize: 'clamp(16px,2.5vw,20px)',
							lineHeight: '32px',
							textDecoration: 'none',
							transition: 'background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s',
							height: 'clamp(48px,4vw,60px)',
							minWidth: 0,
							width: '100%',
							maxWidth: 260,
							boxShadow: '0 4px 24px #5727A355, 0 1.5px 8px #9F7AEA33',
							gap: '0.7em',
							letterSpacing: '.5px',
							cursor: 'pointer',
							position: 'relative',
							overflow: 'hidden',
							textAlign: 'center'
						}}
						onClick={handleScrollToContact}
						onMouseOver={e => {
							e.currentTarget.style.background = 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)';
							e.currentTarget.style.color = '#fff';
							e.currentTarget.style.boxShadow = '0 8px 32px #5727A388, 0 2px 12px #9F7AEA44';
							e.currentTarget.style.transform = 'scale(1.04)';
						}}
						onMouseOut={e => {
							e.currentTarget.style.background = 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)';
							e.currentTarget.style.color = '#fff';
							e.currentTarget.style.boxShadow = '0 4px 24px #5727A355, 0 1.5px 8px #9F7AEA33';
							e.currentTarget.style.transform = '';
						}}
						className="hero-fadein-btn"
					>
						<span style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							width: '100%',
							textAlign: 'center',
							display: 'block'
						}}>
							Get Started
						</span>
						<svg width="32" height="28" viewBox="0 0 24 24" style={{ marginLeft: 8, transform: 'rotate(315deg)' }} fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						<span
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: 100,
								background: 'linear-gradient(120deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.02) 100%)',
								opacity: 0.5,
								pointerEvents: 'none'
							}}
						/>
					</a>
				</div>
				{/* Right: Larger Image with metrics on 3 sides */}
				<div
					style={{
						flex: '1 1 400px',
						minWidth: 280,
						maxWidth: 800,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'flex-start',
						position: 'relative',
						height: 700,
						minHeight: 320,
						perspective: 1200,
						perspectiveOrigin: '50% 40%'
					}}
					className="hero-fadein-right"
				>
					<div
						ref={imgRef}
						style={{
							position: 'relative',
							width: 'clamp(220px, 40vw, 540px)',
							height: 'clamp(220px, 40vw, 540px)',
							top: '30px',
							transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04,1.04,1.04)`,
							transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)'
						}}
						className="hero-float-img"
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						{/* Decorative floating star */}
						<svg
							className="hero-floating-star"
							width="48"
							height="48"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								position: 'absolute',
								top: '-18%',
								right: '-10%',
								zIndex: 2,
								filter: 'drop-shadow(0 2px 8px #9F7AEA66)'
							}}
						>
							<polygon
								points="24,2 29,18 46,18 32,28 37,44 24,34 11,44 16,28 2,18 19,18"
								fill="#F7E1FF"
								stroke="#9F7AEA"
								strokeWidth="2"
							/>
						</svg>
						<img
							src="https://assets-v2.codedesign.ai/storage/v1/object/public/playground_663f30ba/photo-1623632306901-e509641e7191.jpeg"
							alt="Study Abroad"
							style={{
								width: '100%',
								height: '100%',
								borderRadius: '100%',
								objectFit: 'cover',
								boxShadow: '0 10px 56px #1B004488',
								display: 'block'
							}}
						/>
						{/* Top: 50+ Tutors */}
						<div
							style={{
								position: 'absolute',
								top: '-12%',
								left: '50%',
								transform: 'translateX(-50%)',
								background: 'rgba(255,255,255,0.92)',
								borderRadius: 22,
								boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #5727A322',
								padding: 'clamp(12px,2vw,28px) clamp(18px,4vw,48px) clamp(8px,1.5vw,22px) clamp(18px,4vw,48px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
							className="hero-float-metric hero-float-metric-delay0"
						>
							<div style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 800, color: '#1B0044', lineHeight: 1 }}>{metrics[0].value}</div>
							<div style={{ fontSize: 'clamp(12px,1.5vw,22px)', fontWeight: 600, color: '#1B0044', opacity: 0.8 }}>{metrics[0].label}</div>
						</div>
						{/* Left: 2K+ Top Universities */}
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '-17%',
								transform: 'translateY(-50%)',
								background: 'rgba(255,255,255,0.92)',
								borderRadius: 22,
								boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #5727A322',
								padding: 'clamp(12px,2vw,28px) clamp(12px,3vw,36px) clamp(8px,1.5vw,22px) clamp(12px,3vw,36px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
							className="hero-float-metric hero-float-metric-delay1"
						>
							<div style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 800, color: '#1B0044', lineHeight: 1 }}>{metrics[1].value}</div>
							<div style={{ fontSize: 'clamp(12px,1.5vw,22px)', fontWeight: 600, color: '#1B0044', opacity: 0.8 }}>{metrics[1].label}</div>
						</div>
						{/* Bottom Right: 97% Visa Success */}
						<div
							style={{
								position: 'absolute',
								bottom: '0%',
								right: '-4%',
								background: 'rgba(255,255,255,0.92)',
								borderRadius: 22,
								boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #5727A322',
								padding: 'clamp(12px,2vw,28px) clamp(12px,3vw,36px) clamp(8px,1.5vw,22px) clamp(12px,3vw,36px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
							className="hero-float-metric hero-float-metric-delay2"
						>
							<div style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 800, color: '#1B0044', lineHeight: 1 }}>{metrics[2].value}</div>
							<div style={{ fontSize: 'clamp(12px,1.5vw,22px)', fontWeight: 600, color: '#1B0044', opacity: 0.8 }}>{metrics[2].label}</div>
						</div>
					</div>
				</div>
			</div>
			<style>
				{`
        /* Animated gradient background overlay */
        .hero-bg-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(120deg, #D6C5F0 0%, #F0E6FF 100%, #E9D8FD 100%);
          opacity: 0.7;
          animation: heroBgMove 12s ease-in-out infinite alternate;
        }
        @keyframes heroBgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* Multi-color animated gradient */
        .hero-bg-gradient.hero-bg-gradient-multicolor {
          background: linear-gradient(120deg, #d7c6f1 0%, #F0E6FF 40%, #ffffff 70%, #F7D6E0 100%);
          background-size: 200% 200%;
          animation: heroBgMoveMulti 16s ease-in-out infinite alternate;
          opacity: 0.85;
        }
        @keyframes heroBgMoveMulti {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Shine animation for heading */
        .hero-shine-heading {
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, #5727A3 40%, #9F7AEA 60%, #5727A3 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .hero-shine-anim {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          background: linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 100%);
          width: 120%;
          height: 100%;
          transform: translateX(-100%);
          animation: heroShine 2.8s cubic-bezier(.4,2,.6,1) infinite;
        }
        @keyframes heroShine {
          0% { transform: translateX(-100%);}
          60% { transform: translateX(120%);}
          100% { transform: translateX(120%);}
        }

        /* Floating star animation */
        .hero-floating-star {
          animation: heroStarFloat 4.2s ease-in-out infinite alternate, heroStarSpin3D 8s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes heroStarSpin3D {
          0% { transform: rotateY(0deg) rotateZ(0deg);}
          100% { transform: rotateY(360deg) rotateZ(360deg);}
        }

        /* Staggered metric float animations */
        .hero-float-metric {
          animation: heroMetricFloat 2.8s ease-in-out infinite alternate;
        }
        .hero-float-metric-delay0 { animation-delay: 0.1s; }
        .hero-float-metric-delay1 { animation-delay: 0.7s; }
        .hero-float-metric-delay2 { animation-delay: 1.2s; }

        /* Fade-in and float animations for hero section */
        .hero-fadein-left {
          animation: heroFadeInLeft 1.1s cubic-bezier(.4,2,.6,1) 0.1s both;
        }
        .hero-fadein-btn {
          animation: heroFadeInUp 1.2s cubic-bezier(.4,2,.6,1) 0.5s both;
        }
        .hero-fadein-right {
          animation: heroFadeInRight 1.1s cubic-bezier(.4,2,.6,1) 0.3s both;
        }
        .hero-float-img {
          animation: heroFloat 3.5s ease-in-out infinite alternate;
        }
        @keyframes heroFadeInLeft {
          0% { opacity: 0; transform: translateX(-60px);}
          100% { opacity: 1; transform: none;}
        }
        @keyframes heroFadeInRight {
          0% { opacity: 0; transform: translateX(60px);}
          100% { opacity: 1; transform: none;}
        }
        @keyframes heroFadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: none;}
        }
        @keyframes heroFloat {
          0% { transform: translateY(0);}
          100% { transform: translateY(-18px);}
        }
        @keyframes heroMetricFloat {
          0% { transform: translateY(0);}
          100% { transform: translateY(-8px);}
        }
        @keyframes heroPop3D {
          0% { transform: scale3d(0.92,0.92,1) translateZ(-40px); opacity: 0; }
          60% { transform: scale3d(1.08,1.08,1) translateZ(24px); opacity: 1; }
          100% { transform: none; opacity: 1; }
        }
        @media (max-width: 900px) {
          header {
            min-height: 600px !important;
            padding-top: 30px !important;
          }
          header > div {
            flex-direction: column !important;
            gap: 24px !important;
            align-items: center !important;
            padding: 0 8px !important;
          }
          header > div > div {
            max-width: 100% !important;
            min-width: 0 !important;
          }
          header a {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 600px) {
          header {
            padding-top: 20px !important;
            min-height: 400px !important;
          }
          header > div {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: center !important;
            padding: 0 2px !important;
          }
          header > div > div {
            max-width: 100% !important;
            min-width: 0 !important;
          }
          header a {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
        `}
			</style>
		</header>
	);
};

const navLinkStyleWhite: React.CSSProperties = {
	fontFamily: 'Open Sans, sans-serif',
	fontSize: 16,
	fontWeight: 400,
	color: '#fff',
	padding: '15px 15px',
	letterSpacing: 0,
	lineHeight: '26px',
	textDecoration: 'none',
	transition: 'color 0.2s',
	background: 'none'
};
