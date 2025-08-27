import React from 'react';
import { useReveal } from '../hooks/useReveal';

// Example images, replace with your own or use static imports
const stepImages = [
	'https://studconnect-assets.s3.amazonaws.com/step1.png',
	'https://studconnect-assets.s3.amazonaws.com/step2.png',
	'https://studconnect-assets.s3.amazonaws.com/step3.png',
	'https://studconnect-assets.s3.amazonaws.com/step4.png',
	'https://studconnect-assets.s3.amazonaws.com/step5.png',
	'https://studconnect-assets.s3.amazonaws.com/step6.png',
];

const steps = [
	{
		title: 'Real Stories, Real Advice',
		desc: 'No hidden agendas, just honest guidance.',
		img: stepImages[0],
	},
	{
		title: 'Affordable and Flexible',
		desc: 'Pay per session, not overpriced “packages.”',
		img: stepImages[1],
	},
	{
		title: 'Complete Student Journey Support',
		desc: 'From shortlisting courses to settling into your new home abroad.',
		img: stepImages[2],
	},
	{
		title: 'Built for Gen Z ',
		desc: 'A modern, mobile-first platform with community vibes and tools that make sense.',
		img: stepImages[3],
	},
];

export const HowItWorks: React.FC = () => {
	const ref = useReveal();
	return (
		<div
			ref={ref}
			style={{
				position: 'relative',
				zIndex: 1,
				padding: '0 0 4rem 0',
				background: 'radial-gradient(circle at 80% 10%, #e0e7ff 0%, #fff 80%)',
				overflow: 'hidden'
			}}
		>
			{/* Unique Decorative SVG Waves, Sparkles, and Animated Gradient Orbs */}
			<div
				aria-hidden
				style={{
					position: 'absolute',
					zIndex: 0,
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					pointerEvents: 'none',
					overflow: 'hidden',
				}}
			>
				{/* Soft pastel wave at top */}
				<svg
					width="100%"
					height="180"
					viewBox="0 0 1440 180"
					fill="none"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: 180,
						zIndex: 1,
						opacity: 0.7,
					}}
				>
					<path
						d="M0,80 Q360,160 720,80 T1440,80 V180 H0 Z"
						fill="url(#howitworks-wave1)"
					/>
					<defs>
						<linearGradient id="howitworks-wave1" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#a5b4fc" />
							<stop offset="100%" stopColor="#60a5fa" />
						</linearGradient>
					</defs>
				</svg>
				{/* Subtle bottom wave */}
				<svg
					width="100%"
					height="120"
					viewBox="0 0 1440 120"
					fill="none"
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						height: 120,
						zIndex: 1,
						opacity: 0.6,
					}}
				>
					<path
						d="M0,40 Q480,120 960,40 T1440,40 V120 H0 Z"
						fill="url(#howitworks-wave2)"
					/>
					<defs>
						<linearGradient id="howitworks-wave2" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#fbbf24" />
							<stop offset="100%" stopColor="#60a5fa" />
						</linearGradient>
					</defs>
				</svg>
				{/* Animated sparkles */}
				{[...Array(18)].map((_, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${8 + Math.random() * 84}%`,
							top: `${10 + Math.random() * 75}%`,
							width: 2 + Math.random() * 3,
							height: 2 + Math.random() * 3,
							background: 'linear-gradient(90deg,#fbbf24 0%,#fff 100%)',
							borderRadius: '50%',
							opacity: 0.13 + Math.random() * 0.18,
							filter: 'blur(0.5px)',
							animation: `sparkle-move-${i} 7s ease-in-out infinite alternate`,
						}}
					/>
				))}
				{/* Animated floating gradient orbs */}
				<div
					style={{
						position: 'absolute',
						top: '18%',
						left: '7%',
						width: 110,
						height: 110,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 30% 30%, #fbbf24cc 0%, #fbbf2400 80%)',
						filter: 'blur(8px)',
						opacity: 0.45,
						animation: 'orbFloat1 9s ease-in-out infinite alternate'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '12%',
						right: '10%',
						width: 140,
						height: 140,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 70% 70%, #60a5fa99 0%, #60a5fa00 80%)',
						filter: 'blur(12px)',
						opacity: 0.38,
						animation: 'orbFloat2 11s ease-in-out infinite alternate'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '40%',
						left: '60%',
						width: 70,
						height: 70,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 50% 50%, #a5b4fcbb 0%, #a5b4fc00 80%)',
						filter: 'blur(6px)',
						opacity: 0.32,
						animation: 'orbFloat3 13s ease-in-out infinite alternate'
					}}
				/>
				<style>
					{[...Array(18)].map((_, i) => `
						@keyframes sparkle-move-${i} {
							0% { transform: scale(1) translateY(0);}
							100% { transform: scale(${0.8 + Math.random() * 0.7}) translateY(${Math.random() * 30 - 15}px);}
						}
					`).join('\n') +
`
@keyframes orbFloat1 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(-30px) scale(1.08);}
}
@keyframes orbFloat2 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(40px) scale(1.12);}
}
@keyframes orbFloat3 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(-20px) scale(1.05);}
}
`}
				</style>
			</div>
			<div
				style={{
					position: 'relative',
					zIndex: 1,
				}}
			>
				{/* Section Heading */}
				<div
					style={{
						maxWidth: 900,
						margin: '0 auto',
						padding: '2.5rem 1.5rem 0 1.5rem',
					}}
				>
					<h2
						style={{
							fontSize: '2.2rem',
							fontWeight: 900,
							textAlign: 'center',
							letterSpacing: '-1px',
							color: '#2563eb',
							marginBottom: '2.2rem',
							perspective: 400,
							lineHeight: 1.1,
							textShadow: '0 2px 8px #2563eb11',
							position: 'relative',
						}}
					>
						<span
							style={{
								display: 'inline-block',
								background:
									'linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(14 26 40) 100%) text',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontWeight: 900,
								letterSpacing: '-1px',
							}}
						>
							Why Students Choose Us
						</span>
					</h2>
				</div>
				{/* Steps Carousel */}
				<div
					style={{
						maxWidth: 1200,
						margin: '0 auto',
						padding: '0 1.5rem',
						overflowX: 'auto',
					}}
				>
					<div
						className="howitworks-carousel"
						style={{
							display: 'flex',
							gap: '2.2rem',
							padding: '2rem 0 2.5rem 0',
							overflowX: 'auto',
							scrollSnapType: 'x mandatory',
							WebkitOverflowScrolling: 'touch',
						}}
					>
						{steps.map((step, idx) => (
							<div
								key={step.title}
								className="howitworks-step-card"
								style={{
									minWidth: 270,
									maxWidth: 320,
									background: '#fff',
									borderRadius: 22,
									boxShadow: '0 4px 24px #2563eb11',
									padding: '2.2rem 1.5rem 1.5rem 1.5rem',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									position: 'relative',
									scrollSnapAlign: 'start',
									transition: 'box-shadow .18s, transform .18s',
									cursor: 'pointer',
									borderLeft: `6px solid ${
										idx % 2 === 0 ? '#2563eb' : '#60a5fa'
									}`,
									zIndex: 1,
								}}
								onMouseOver={(e) => {
									(e.currentTarget as HTMLDivElement).style.boxShadow =
										'0 8px 32px #2563eb22';
									(e.currentTarget as HTMLDivElement).style.transform =
										'translateY(-4px) scale(1.03)';
								}}
								onMouseOut={(e) => {
									(e.currentTarget as HTMLDivElement).style.boxShadow =
										'0 4px 24px #2563eb11';
									(e.currentTarget as HTMLDivElement).style.transform = '';
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: -28,
										left: 24,
										width: 48,
										height: 48,
										background:
											idx % 2 === 0
												? 'linear-gradient(135deg,#2563eb 0%,#60a5fa 100%)'
												: 'linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)',
										color: '#fff',
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontWeight: 800,
										fontSize: '1.3rem',
										boxShadow: '0 2px 12px #2563eb22',
										border: '3px solid #fff',
										zIndex: 2,
									}}
								>
									{idx + 1}
								</div>
								<div
									style={{
										width: 80,
										height: 80,
										margin: '1.5rem auto 1.1rem auto',
										borderRadius: '50%',
										background: '#e0e7ff',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										overflow: 'hidden',
										boxShadow: '0 2px 12px #2563eb22',
									}}
								>
									<img
										src={step.img}
										alt={step.title}
										style={{
											width: 64,
											height: 64,
											objectFit: 'contain',
											display: 'block',
										}}
										loading="lazy"
									/>
								</div>
								<h4
									style={{
										fontSize: '1.13rem',
										color: '#2563eb',
										fontWeight: 800,
										margin: '0 0 .5rem 0',
										textAlign: 'center',
										letterSpacing: '-.5px',
									}}
								>
									{step.title}
								</h4>
								<p
									style={{
										fontSize: '1.07rem',
										color: '#334155',
										textAlign: 'center',
										margin: 0,
										fontWeight: 500,
										minHeight: 48,
									}}
								>
									{step.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Responsive styles */}
			<style>
				{`
        @media (max-width: 900px) {
          .howitworks-carousel {
            gap: 1.2rem !important;
          }
          .howitworks-step-card {
            min-width: 220px !important;
            max-width: 260px !important;
            padding: 1.5rem 1rem 1rem 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .howitworks-carousel {
            gap: .7rem !important;
            padding: 1rem 0 1.5rem 0 !important;
          }
          .howitworks-step-card {
            max-width: 220px !important;
            padding: 1rem .7rem 1rem .7rem !important;
          }
        }
        `}
			</style>
		</div>
	);
};
