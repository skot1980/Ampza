import SubmissionForm from '@/components/SubmissionForm';

const steps = [
  { number: '01', title: 'Locate a station', copy: 'Find a charger nearby and see its status before you head over.', icon: '⌖' },
  { number: '02', title: 'AmpTap to connect', copy: 'Scan the charger to start your session. No separate RFID card required at launch.', icon: '↗' },
  { number: '03', title: 'Watch it charge', copy: 'Follow your session and see what you’re spending as you go.', icon: 'ϟ' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> LAUNCHING SOON · TAMIL NADU & KERALA FIRST</div>
          <h1>Charging, for people.<br /><span>Not just for cars.</span></h1>
          <p className="hero-lede">A calmer, clearer way to find a charger, plug in and get on with your day.</p>
          <div className="hero-actions"><a className="button button-dark" href="#waitlist">Get early access <span>↗</span></a><a className="text-link" href="/charging">See how it works <span>↓</span></a></div>
          <p className="prelaunch-note">Pre-launch: building the app and our first station partnerships.</p>
        </div>
        <div className="hero-art" aria-label="Illustration of the Ampza charging app">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="map-card"><span className="map-road road-a" /><span className="map-road road-b" /><span className="map-road road-c" /><span className="map-label">NAGERCOIL</span><i className="pin pin-a">ϟ</i><i className="pin pin-b">ϟ</i><i className="pin pin-c">ϟ</i></div>
          <div className="phone"><div className="phone-island" /><div className="phone-top"><span>9:41</span><span>● ● ▰</span></div><div className="phone-brand">ampza<span>⌖</span></div><div className="phone-greeting">Good morning,<br /><b>Arun.</b></div><div className="phone-search">⌕ &nbsp; Find a charger</div><div className="phone-map"><span className="mini-road mini-road-a"/><span className="mini-road mini-road-b"/><i>ϟ</i><i>ϟ</i><b>Near you</b></div><div className="station-card"><div><b>Ampza · Town Centre</b><small>Available now · 2 connectors</small></div><strong>₹20<small>/kWh</small></strong></div><div className="phone-tabs"><span>⌖<small>Explore</small></span><span>◷<small>Sessions</small></span><span>☺<small>Profile</small></span></div></div>
          <div className="art-note"><span className="art-note-dot"/> Concept screen · app in development</div>
        </div>
      </section>

      <section className="ticker" aria-label="Ampza launch message"><div>MADE FOR THE EVERYDAY <span>✳</span> BUILT FOR THE ROAD AHEAD <span>✳</span> TAMIL NADU & KERALA FIRST <span>✳</span> MADE FOR THE EVERYDAY <span>✳</span></div></section>

      <section className="how-section section-wrap" id="how-it-works">
        <div className="section-heading"><div><div className="eyebrow">CHARGING, WITHOUT THE GUESSWORK</div><h2>Three taps.<br /><span>Zero hunting.</span></h2></div><p>From finding a plug to finishing your session, the plan is to keep every step simple and clear.</p></div>
        <div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.number}><div className="step-top"><span>{step.number} / 03</span><span className="step-icon">{step.icon}</span></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
      </section>

      <section className="trust-section"><div className="section-wrap trust-inner"><div><div className="eyebrow">NO SURPRISES AT THE SOCKET</div><h2>Built to be the<br />charger <span>you trust.</span></h2><p>Clear information before, during and after every charge. We’re building for the moments that make a network dependable.</p><a className="text-link" href="/charging">Explore the charging plan <span>↗</span></a></div><div className="trust-cards"><article><span className="trust-icon">₹</span><h3>Transparent pricing</h3><p>See applicable pricing before you start a session.</p></article><article><span className="trust-icon">◉</span><h3>Real-time status</h3><p>Know what’s available before you make the trip.</p></article><article><span className="trust-icon">97%</span><h3>Reliability by design</h3><p>Proposed uptime standards, tracked station by station.</p></article></div></div></section>

      <section className="waitlist-section section-wrap" id="waitlist"><div className="waitlist-card"><div><div className="eyebrow">GET THE FIRST UPDATE</div><h2>Be there<br /><span>from the start.</span></h2><p>We’re building our first station partnerships in Tamil Nadu and Kerala. Leave your email and we’ll share launch updates.</p></div><SubmissionForm kind="waitlist" submitLabel="Notify me" fields={[{name:"email",label:"Email address",type:"email",required:true}]} /><div className="waitlist-mark">a</div></div></section>
    </>
  );
}
