import React from 'react';

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

	return (
		<header
			style={{
				width: '100%',
				background: '#D6C5F0',
				padding: 0,
				boxSizing: 'border-box',
				backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0) 83.4%, rgb(255,255,255) 100%)',
				minHeight: '900px',
				display: 'flex',
				alignItems: 'center'
			}}
		>
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
							color: '#000',
							padding: '0 0 30px 0',
							lineHeight: '1.1',
							marginBottom: 0
						}}
					>
						Dream it, Plan it, Achieve it!
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
						minHeight: 320
					}}
				>
					<div
						style={{
							position: 'relative',
							width: 'clamp(220px, 40vw, 540px)',
							height: 'clamp(220px, 40vw, 540px)',
							top: '30px'
						}}
					>
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
								boxShadow: '0 2px 12px #1B004433',
								padding: 'clamp(12px,2vw,28px) clamp(18px,4vw,48px) clamp(8px,1.5vw,22px) clamp(18px,4vw,48px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
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
								boxShadow: '0 2px 12px #1B004433',
								padding: 'clamp(12px,2vw,28px) clamp(12px,3vw,36px) clamp(8px,1.5vw,22px) clamp(12px,3vw,36px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
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
								boxShadow: '0 2px 12px #1B004433',
								padding: 'clamp(12px,2vw,28px) clamp(12px,3vw,36px) clamp(8px,1.5vw,22px) clamp(12px,3vw,36px)',
								textAlign: 'center',
								border: '1.5px solid #fff',
								minWidth: 80,
								maxWidth: 180
							}}
						>
							<div style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 800, color: '#1B0044', lineHeight: 1 }}>{metrics[2].value}</div>
							<div style={{ fontSize: 'clamp(12px,1.5vw,22px)', fontWeight: 600, color: '#1B0044', opacity: 0.8 }}>{metrics[2].label}</div>
						</div>
					</div>
				</div>
			</div>
			<style>
				{`
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
