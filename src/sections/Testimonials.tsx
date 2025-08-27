import React from 'react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
	{
		name: 'Aarav',
		result: 'UC Berkeley (MS CS) — Scholarship Winner',
		text: '“StudConnect’s mentors didn’t just review my essays—they helped me find my unique story. The honest feedback from real students made all the difference. I never felt like just another applicant.”',
	},
	{
		name: 'Meera',
		result: 'Full Tuition Scholarship — Germany',
		text: '“I was overwhelmed by the DAAD process, but StudConnect broke it down step by step. Their document checks and real-life tips made my application stand out. I got in, and with funding!”',
	},
	{
		name: 'Yusuf',
		result: 'Visa Approved & Scholarship',
		text: '“From SOPs to mock interviews, StudConnect made the whole process stress-free. I got my visa and a scholarship—couldn’t have done it alone.”',
	},
	{
		name: 'Fatima',
		result: 'Masters in UK — 50% Scholarship',
		text: '“My peer mentor helped me compare universities and funding options. I landed a top UK admit with a huge scholarship and felt supported at every step.”',
	},
	{
		name: 'Daniel',
		result: 'MS in Germany — Internship Secured',
		text: '“The candid advice from current students helped me pick the right program and city. I found an internship before even landing in Germany!”',
	},
];

export const Testimonials: React.FC = () => {
	const ref = useReveal();
	return (
		<section
			className="testimonial13-section-area"
			id="testimonials"
			ref={ref as any}
			style={{
				background: 'radial-gradient(circle at 60% 10%, #0f172a 0%, #1e293b 100%)',
				padding: '0 0 3rem 0',
			}}
		>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 m-auto">
						<div
							className="testimonial13-header heading20 space-margin60 m-auto"
						>
							<h2
								className="text-center mb-3 text-anime-style-3"
								style={{
									margin: 'auto',
									perspective: 400,
									fontWeight: 900,
									fontSize: '2.2rem',
									letterSpacing: '-1px',
									background: 'linear-gradient(90deg,#60a5fa 0%,#fbbf24 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									textAlign: 'center',
								}}
							>
								Success Stories
							</h2>
							<p
								style={{
									textAlign: 'center',
									color: '#cbd5e1',
									fontSize: '1.13rem',
									fontWeight: 500,
									marginBottom: 0,
									lineHeight: 1.7,
									maxWidth: 600,
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							>
								At <b style={{ color: '#60a5fa' }}>StudConnect</b>, your journey is our mission. Our students have earned admits to world-class universities, won life-changing scholarships, and built new lives abroad. Every story is unique—every achievement, a testament to honest guidance and real support.
							</p>
						</div>
					</div>
				</div>
				<div className="row" style={{ marginTop: 32 }}>
					<div className="col-lg-12 mt-4">
						<div
							className="testimonial13-slider"
							style={{
								display: 'flex',
								gap: '2.2rem',
								overflowX: 'auto',
								scrollSnapType: 'x mandatory',
								padding: '1rem 0',
								WebkitOverflowScrolling: 'touch',
							}}
						>
							{testimonials.map((t, idx) => (
								<div
									key={t.name}
									className="testimonial13-boxrea"
									style={{
										minWidth: 340,
										maxWidth: 370,
										background: 'linear-gradient(135deg,#1e293b 60%,#0f172a 100%)',
										borderRadius: 22,
										boxShadow: '0 8px 32px 0 #2563eb22, 0 2px 8px 0 #60a5fa11',
										border: '1.5px solid #334155',
										overflow: 'hidden',
										cursor: 'pointer',
										transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s',
										padding: '2.2rem 1.5rem 1.5rem 1.5rem',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										scrollSnapAlign: 'start',
										position: 'relative',
										color: '#e0e7ff',
										textAlign: 'center',
									}}
								>
									<ul
										style={{
											display: 'flex',
											gap: 2,
											margin: 0,
											padding: 0,
											listStyle: 'none',
											marginBottom: 12,
											justifyContent: 'center',
										}}
									>
										{Array.from({ length: 5 }).map((_, i) => (
											<li key={i} style={{ color: '#fbbf24', fontSize: '1.1rem' }}>
												<i className="fa-solid fa-star" />
											</li>
										))}
									</ul>
									<p
										style={{
											fontSize: '1.13rem',
											color: '#f1f5f9',
											fontWeight: 500,
											margin: '1.2rem 0 1.5rem 0',
											minHeight: 80,
											lineHeight: 1.7,
											textAlign: 'center',
											letterSpacing: '-.2px',
											fontStyle: 'italic',
										}}
									>
										{t.text}
									</p>
									<div
										className="name-area"
										style={{
											display: 'flex',
											alignItems: 'center',
											marginTop: 'auto',
											gap: '1rem',
											justifyContent: 'center',
										}}
									>
										<div className="name-text" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
											<img
												src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
													t.name
												)}&backgroundColor=60a5fa,a5b4fc&radius=50`}
												alt={t.name}
												style={{
													width: 48,
													height: 48,
													borderRadius: '50%',
													objectFit: 'cover',
													boxShadow: '0 2px 8px #2563eb22',
													border: '2px solid #334155',
													background: '#1e293b',
												}}
											/>
											<div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												<h6 style={{ fontWeight: 700, margin: 0, color: '#60a5fa', fontSize: '1.08rem', letterSpacing: '-.5px' }}>{t.name}</h6>
												<p style={{ margin: 0, color: '#fbbf24', fontWeight: 500, fontSize: '.98rem', letterSpacing: '-.2px' }}>{t.result}</p>
											</div>
										</div>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
											style={{ marginLeft: 'auto', opacity: 0.18 }}>
											<path d="M12 12H8V20H14V16H12V12ZM24 12H20V20H26V16H24V12Z" fill="#60a5fa" />
										</svg>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<style>{`
				.testimonial13-slider::-webkit-scrollbar { display: none; }
				.testimonial13-slider { scrollbar-width: none; }
				
			`}</style>
		</section>
	);
};
