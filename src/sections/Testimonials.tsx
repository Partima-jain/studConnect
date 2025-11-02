import React from 'react';
import { useReveal } from '../hooks/useReveal';

// Updated testimonials data
const testimonials = [
	{
		name: 'Aarav',
		result: 'Delhi → University of Melbourne, Australia',
		text: '“Before I found Your Next University, I was juggling a dozen university websites and still had no clue what actually fit me. Their AI match showed me programs that aligned with my interests, not just my marks. I got into the University of Melbourne, and honestly — it feels like my dream finally got a roadmap.”',
	},
	{
		name: 'Sneha',
		result: 'Hyderabad → University of Toronto, Canada',
		text: '“I thought studying abroad was only for people with big budgets or family abroad. But the team at Your Next University made it feel doable — they found scholarships, guided my SOP, and even helped me prep for interviews. Today, I’m in Toronto, learning and growing every single day.”',
	},
	{
		name: 'Karan',
		result: 'Ahmedabad → University of Warwick, UK',
		text: '“After two rejections, I was mentally done. I randomly filled the assessment on Your Next University one night. Within a week, they helped me rewrite my SOP and shortlist better-fit universities. Warwick said yes. That ‘yes’ changed everything.”',
	},
	{
		name: 'Priya',
		result: 'Bhopal → Stanford University, USA',
		text: '“I wasn’t sure my small-town background would stand out in global applications. But the mentors at Your Next University saw my story differently — they helped me position it as my strength. I’m now studying Computer Science at Stanford. I didn’t just apply — I applied confidently.”',
	},
	{
		name: 'Aditi',
		result: 'Pune → National University of Singapore (NUS)',
		text: '“I panicked when my visa got delayed — but the support team didn’t leave me hanging. They guided me through every step and kept my admission active. I’m now studying at NUS, working with a global student team, and living my best life.”',
	},
	{
		name: 'Rohan',
		result: 'Chennai → TU Munich, Germany',
		text: '“Engineering abroad sounded fancy until I saw the paperwork. Your Next University literally made it a one-click journey — from finding the right program to uploading my docs. I’m now in Munich, working part-time at BMW, and couldn’t be happier.”',
	},
	{
		name: 'Mansi',
		result: 'Mumbai → Monash University, Australia',
		text: '“The idea of going abroad terrified me — not academically, but financially. Your Next University found me scholarships I didn’t even know existed. I got into Monash and now mentor other students online. It’s like coming full circle.”',
	},
	{
		name: 'Dev',
		result: 'Jaipur → University of British Columbia, Canada',
		text: '“I was that guy who thought his resume wasn’t impressive enough. But the way the team restructured my application made me realize I did have a story. Now, I’m studying Marketing at UBC and working part-time at a creative agency in Vancouver.”',
	},
	{
		name: 'Tanya',
		result: 'Delhi → Harvard University, USA',
		text: '“I didn’t come from privilege, but I had purpose. Your Next University helped me communicate that — through essays, projects, and clarity. Today, I’m at Harvard, working on policy research that actually makes impact.”',
	},
	{
		name: 'Isha',
		result: 'Bangalore → King’s College London, UK',
		text: '“I was completely lost — 4 countries, 6 universities, zero direction. Their counsellors actually listened to me, not just my grades. We picked King’s College London together, and it’s been the best decision of my life.”',
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
									background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
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
									color: '#5727A3',
									fontSize: '1.13rem',
									fontWeight: 500,
									marginBottom: 0,
									lineHeight: 1.7,
									maxWidth: 600,
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							>
								At <b style={{ color: '#9F7AEA' }}>Yournextuniversity</b>, your journey is our mission. Our students have earned admits to world-class universities, won life-changing scholarships, and built new lives abroad. Every story is unique—every achievement, a testament to honest guidance and real support.
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
										// Updated card background and border to match hero section theme
										background: 'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
										borderRadius: 22,
										boxShadow: '0 8px 32px 0 #9F7AEA22, 0 2px 8px 0 #9F7AEA11',
										border: '1.5px solid #9F7AEA',
										overflow: 'hidden',
										cursor: 'pointer',
										transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s',
										padding: '2.2rem 1.5rem 1.5rem 1.5rem',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										scrollSnapAlign: 'start',
										position: 'relative',
										color: '#5727A3',
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
											color: '#1B0044',
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
												)}&backgroundColor=9f7aea,e0c3fc&radius=50`}
												alt={t.name}
												style={{
													width: 48,
													height: 48,
													borderRadius: '50%',
													objectFit: 'cover',
													boxShadow: '0 2px 8px #9F7AEA22',
													border: '2px solid #9F7AEA',
													background: '#fff',
												}}
											/>
											<div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												<h6 style={{ fontWeight: 700, margin: 0, color: '#5727A3', fontSize: '1.08rem', letterSpacing: '-.5px' }}>{t.name}</h6>
												<p style={{ margin: 0, color: '#9F7AEA', fontWeight: 500, fontSize: '.98rem', letterSpacing: '-.2px' }}>{t.result}</p>
											</div>
										</div>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
											style={{ marginLeft: 'auto', opacity: 0.18 }}>
											<path d="M12 12H8V20H14V16H12V12ZM24 12H20V20H26V16H24V12Z" fill="#9F7AEA" />
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

export default Testimonials;
