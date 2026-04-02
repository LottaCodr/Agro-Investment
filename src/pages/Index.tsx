import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Users, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f7f3ed", minHeight: "100vh", overflowX: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --green: #0e2a1a;
                    --green-mid: #1a4a2e;
                    --green-light: #2d6b47;
                    --gold: #c8903c;
                    --gold-light: #e8b060;
                    --ivory: #f7f3ed;
                    --ivory-dark: #ede5d8;
                    --text: #0e2a1a;
                    --text-muted: #5a6b5e;
                }
                .ayf-serif { font-family: 'Cormorant Garant', serif; }
                a { text-decoration: none; }

                /* Nav */
                .nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
                    padding: 0 2rem;
                    height: 72px;
                    display: flex; align-items: center; justify-content: space-between;
                    transition: background 0.3s, border-color 0.3s;
                }
                .nav.scrolled {
                    background: rgba(247, 243, 237, 0.96);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #ddd6c8;
                }
                .nav-logo-mark {
                    width: 36px; height: 36px;
                    background: var(--gold);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 600; font-size: 12px;
                    color: white; letter-spacing: 0.5px;
                    flex-shrink: 0;
                }
                .nav-links { display: flex; gap: 2.5rem; list-style: none; }
                .nav-links a { font-size: 14px; font-weight: 400; color: var(--text); opacity: 0.7; transition: opacity 0.2s; }
                .nav-links a:hover { opacity: 1; }
                .btn-ghost {
                    border: 1.5px solid rgba(14,42,26,0.25);
                    background: transparent;
                    padding: 9px 20px; border-radius: 100px;
                    font-size: 14px; font-weight: 500;
                    color: var(--text); cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                    font-family: 'Outfit', sans-serif;
                }
                .btn-ghost:hover { border-color: var(--text); background: rgba(14,42,26,0.04); }
                .btn-primary {
                    background: var(--green);
                    border: 1.5px solid var(--green);
                    padding: 9px 22px; border-radius: 100px;
                    font-size: 14px; font-weight: 500;
                    color: white; cursor: pointer;
                    display: inline-flex; align-items: center; gap: 6px;
                    transition: background 0.2s, transform 0.15s;
                    font-family: 'Outfit', sans-serif;
                }
                .btn-primary:hover { background: var(--green-mid); transform: translateY(-1px); }
                .btn-primary-lg {
                    padding: 14px 32px; font-size: 16px;
                    gap: 8px; border-radius: 100px;
                }
                .btn-outline-lg {
                    background: transparent;
                    border: 1.5px solid rgba(14,42,26,0.3);
                    padding: 14px 32px; border-radius: 100px;
                    font-size: 16px; font-weight: 500;
                    color: var(--text); cursor: pointer;
                    display: inline-flex; align-items: center; gap: 8px;
                    transition: border-color 0.2s, background 0.2s;
                    font-family: 'Outfit', sans-serif;
                }
                .btn-outline-lg:hover { border-color: var(--text); background: rgba(14,42,26,0.04); }

                /* Hero */
                .hero {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding-top: 72px;
                }
                .hero-left {
                    padding: 80px 64px 80px 80px;
                    display: flex; flex-direction: column; justify-content: center;
                }
                .hero-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: rgba(200, 144, 60, 0.12);
                    border: 1px solid rgba(200,144,60,0.25);
                    padding: 6px 14px; border-radius: 100px;
                    font-size: 12px; font-weight: 600;
                    color: var(--gold); letter-spacing: 0.8px;
                    text-transform: uppercase; margin-bottom: 28px;
                    width: fit-content;
                }
                .hero-eyebrow-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--gold);
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
                .hero-title {
                    font-family: 'Cormorant Garant', serif;
                    font-size: clamp(48px, 5vw, 72px);
                    font-weight: 600; line-height: 1.1;
                    color: var(--text); margin-bottom: 24px;
                    letter-spacing: -0.5px;
                }
                .hero-title em { font-style: italic; color: var(--green-light); }
                .hero-subtitle {
                    font-size: 17px; font-weight: 300; line-height: 1.7;
                    color: var(--text-muted); margin-bottom: 40px;
                    max-width: 420px;
                }
                .hero-cta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

                .hero-right {
                    position: relative; overflow: hidden;
                    clip-path: polygon(6% 0, 100% 0, 100% 100%, 0% 100%);
                }
                .hero-img {
                    width: 100%; height: 100%; object-fit: cover;
                    display: block;
                }
                .hero-img-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(14,42,26,0.3) 0%, transparent 60%);
                }

                /* Stats strip */
                .stats-strip {
                    background: var(--green);
                    padding: 40px 80px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .stat-item { text-align: center; }
                .stat-number {
                    font-family: 'Cormorant Garant', serif;
                    font-size: 42px; font-weight: 700;
                    color: white; line-height: 1;
                    margin-bottom: 6px;
                }
                .stat-number span { color: var(--gold-light); }
                .stat-label { font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 400; letter-spacing: 0.4px; }
                .stat-divider { width: 1px; height: 60px; background: rgba(255,255,255,0.12); }

                /* Features */
                .features {
                    padding: 100px 80px;
                    background: var(--ivory);
                }
                .section-tag {
                    font-size: 11px; font-weight: 600;
                    letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 14px;
                }
                .section-title {
                    font-family: 'Cormorant Garant', serif;
                    font-size: clamp(36px, 3.5vw, 52px);
                    font-weight: 600; line-height: 1.15;
                    color: var(--text); margin-bottom: 60px;
                    letter-spacing: -0.3px; max-width: 480px;
                }
                .section-title em { font-style: italic; color: var(--green-light); }
                .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .feature-card {
                    background: white;
                    border: 1px solid #e8e0d4;
                    border-radius: 16px;
                    padding: 40px 36px;
                    transition: transform 0.25s, border-color 0.25s;
                    position: relative; overflow: hidden;
                }
                .feature-card::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    background: var(--gold);
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.3s;
                }
                .feature-card:hover { transform: translateY(-4px); border-color: #d4c8b8; }
                .feature-card:hover::before { transform: scaleX(1); }
                .feature-icon {
                    width: 52px; height: 52px;
                    background: rgba(14,42,26,0.06);
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 24px;
                    color: var(--green-mid);
                }
                .feature-title {
                    font-family: 'Cormorant Garant', serif;
                    font-size: 24px; font-weight: 600;
                    color: var(--text); margin-bottom: 12px;
                }
                .feature-desc { font-size: 15px; line-height: 1.7; color: var(--text-muted); font-weight: 300; }

                /* How it works */
                .how {
                    padding: 100px 80px;
                    background: var(--ivory-dark);
                    display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;
                }
                .how-steps { display: flex; flex-direction: column; gap: 0; }
                .how-step {
                    display: flex; gap: 24px;
                    padding: 28px 0;
                    border-bottom: 1px solid rgba(14,42,26,0.08);
                    cursor: default;
                }
                .how-step:last-child { border-bottom: none; }
                .how-step-num {
                    font-family: 'Cormorant Garant', serif;
                    font-size: 48px; font-weight: 700;
                    color: rgba(14,42,26,0.08);
                    line-height: 1; flex-shrink: 0; width: 52px;
                    transition: color 0.2s;
                }
                .how-step:hover .how-step-num { color: var(--gold); }
                .how-step-body {}
                .how-step-title {
                    font-size: 17px; font-weight: 600;
                    color: var(--text); margin-bottom: 6px;
                }
                .how-step-desc { font-size: 14px; line-height: 1.65; color: var(--text-muted); font-weight: 300; }
                .how-visual {
                    background: var(--green);
                    border-radius: 20px;
                    padding: 48px;
                    position: relative; overflow: hidden;
                }
                .how-visual-inner {
                    position: relative; z-index: 1;
                }
                .how-card {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 12px;
                    padding: 20px 24px;
                    margin-bottom: 16px;
                }
                .how-card-label { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 6px; letter-spacing: 0.5px; text-transform: uppercase; }
                .how-card-value { font-size: 22px; font-weight: 600; color: white; margin-bottom: 2px; }
                .how-card-sub { font-size: 12px; color: rgba(255,255,255,0.5); }
                .roi-badge {
                    position: absolute; top: -10px; right: -10px;
                    background: var(--gold);
                    color: white; border-radius: 100px;
                    padding: 6px 14px; font-size: 13px; font-weight: 600;
                }
                .progress-bar-bg {
                    background: rgba(255,255,255,0.1);
                    border-radius: 100px; height: 6px; margin-top: 8px;
                }
                .progress-bar-fill {
                    height: 6px; border-radius: 100px; background: var(--gold-light);
                }

                /* CTA Section */
                .cta-section {
                    background: var(--green-mid);
                    padding: 100px 80px;
                    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
                    position: relative; overflow: hidden;
                }
                .cta-circle {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.06);
                }
                .cta-title {
                    font-family: 'Cormorant Garant', serif;
                    font-size: clamp(36px, 3.5vw, 56px);
                    font-weight: 600; line-height: 1.15;
                    color: white; letter-spacing: -0.3px;
                }
                .cta-title em { font-style: italic; color: var(--gold-light); }
                .cta-desc { font-size: 16px; color: rgba(255,255,255,0.55); font-weight: 300; line-height: 1.7; margin-top: 16px; }
                .cta-right { display: flex; flex-direction: column; gap: 20px; }
                .testimonial-card {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 14px;
                    padding: 24px 28px;
                }
                .testimonial-text { font-size: 15px; line-height: 1.65; color: rgba(255,255,255,0.8); font-style: italic; font-weight: 300; margin-bottom: 16px; }
                .testimonial-author { display: flex; align-items: center; gap: 12px; }
                .avatar {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: var(--gold); display: flex;
                    align-items: center; justify-content: center;
                    font-size: 13px; font-weight: 600; color: white;
                }
                .author-name { font-size: 14px; font-weight: 500; color: white; }
                .author-loc { font-size: 12px; color: rgba(255,255,255,0.4); }
                .btn-gold {
                    background: var(--gold);
                    border: none; padding: 15px 36px; border-radius: 100px;
                    font-size: 16px; font-weight: 600;
                    color: white; cursor: pointer;
                    display: inline-flex; align-items: center; gap: 8px;
                    transition: background 0.2s, transform 0.15s;
                    font-family: 'Outfit', sans-serif;
                    align-self: flex-start;
                }
                .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }

                /* Footer */
                .footer {
                    background: var(--green);
                    padding: 40px 80px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .footer-logo { display: flex; align-items: center; gap: 10px; }
                .footer-copy { font-size: 13px; color: rgba(255,255,255,0.35); }
                .footer-links { display: flex; gap: 28px; }
                .footer-links a { font-size: 13px; color: rgba(255,255,255,0.4); transition: color 0.2s; }
                .footer-links a:hover { color: rgba(255,255,255,0.8); }

                /* Responsive */
                @media (max-width: 900px) {
                    .hero { grid-template-columns: 1fr; min-height: auto; }
                    .hero-left { padding: 60px 24px 40px; }
                    .hero-right { height: 300px; clip-path: none; }
                    .stats-strip { padding: 32px 24px; gap: 12px; }
                    .stat-divider { display: none; }
                    .features { padding: 60px 24px; }
                    .features-grid { grid-template-columns: 1fr; }
                    .how { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }
                    .cta-section { grid-template-columns: 1fr; padding: 60px 24px; }
                    .footer { flex-direction: column; gap: 20px; padding: 32px 24px; text-align: center; }
                    .nav { padding: 0 20px; }
                    .nav-links, .nav-actions { display: none; }
                    .nav-mobile-toggle { display: flex !important; }
                }
                .nav-mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--text); }
            `}</style>

            {/* NAV */}
            <header className={`nav${scrolled ? " scrolled" : ""}`}>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                    <div className="nav-logo-mark">AYF</div>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "var(--text)", letterSpacing: "-0.2px" }}>
                        African Youth Forum
                    </span>
                </Link>

                <ul className="nav-links">
                    {["Features", "How it Works", "Farms"].map(item => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
                        </li>
                    ))}
                </ul>

                <div className="nav-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Link to="/auth"><button className="btn-ghost">Sign In</button></Link>
                    <Link to="/auth">
                        <button className="btn-primary">
                            Get Started <ArrowRight size={14} />
                        </button>
                    </Link>
                </div>

                <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 99,
                    background: "var(--ivory)", paddingTop: "72px",
                    display: "flex", flexDirection: "column",
                    padding: "72px 24px 40px",
                    gap: "8px"
                }}>
                    {["Features", "How it Works", "Farms"].map(item => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            style={{ padding: "14px 0", fontSize: "20px", color: "var(--text)", borderBottom: "1px solid #e8e0d4", fontFamily: "'Cormorant Garant', serif", fontWeight: 600 }}>
                            {item}
                        </a>
                    ))}
                    <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Link to="/auth" onClick={() => setMenuOpen(false)}><button className="btn-ghost" style={{ width: "100%", padding: "14px" }}>Sign In</button></Link>
                        <Link to="/auth" onClick={() => setMenuOpen(false)}><button className="btn-primary btn-primary-lg" style={{ width: "100%", justifyContent: "center" }}>Get Started <ArrowRight size={16} /></button></Link>
                    </div>
                </div>
            )}

            {/* HERO */}
            <section className="hero" ref={heroRef}>
                <div className="hero-left">
                    <div className="hero-eyebrow">
                        <div className="hero-eyebrow-dot" />
                        Now Live — West Africa
                    </div>
                    <h1 className="hero-title">
                        Invest in <em>African</em><br />Agriculture
                    </h1>
                    <p className="hero-subtitle">
                        Connect with verified farms across Liberia and West Africa. Earn attractive returns while empowering local communities.
                    </p>
                    <div className="hero-cta">
                        <Link to="/auth">
                            <button className="btn-primary btn-primary-lg">
                                Start Investing <ArrowRight size={16} />
                            </button>
                        </Link>
                        <Link to="/discover">
                            <button className="btn-outline-lg">Explore Farms</button>
                        </Link>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src="/farm-palm-trees.jpg"
                        alt="African palm tree farm"
                        className="hero-img"
                    />
                    <div className="hero-img-overlay" />
                </div>
            </section>

            {/* STATS STRIP */}
            <div className="stats-strip">
                {[
                    { value: "$11.8M", suffix: "+", label: "Total Invested" },
                    { value: "2,500", suffix: "+", label: "Active Investors" },
                    { value: "18.5", suffix: "%", label: "Average ROI" },
                    { value: "24", suffix: "", label: "Active Farm Projects" },
                ].map((s, i, arr) => (
                    <>
                        <div className="stat-item" key={s.label}>
                            <div className="stat-number">
                                {s.value}<span>{s.suffix}</span>
                            </div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                        {i < arr.length - 1 && <div className="stat-divider" key={`d${i}`} />}
                    </>
                ))}
            </div>

            {/* FEATURES */}
            <section id="features" className="features">
                <div className="section-tag">Why choose AYF</div>
                <h2 className="section-title">Built for <em>serious</em> investors</h2>

                <div className="features-grid">
                    {[
                        {
                            icon: <TrendingUp size={22} />,
                            title: "High Returns",
                            desc: "Earn up to 20% annual returns on verified agricultural investments with transparent performance reporting.",
                        },
                        {
                            icon: <Shield size={22} />,
                            title: "Verified Projects",
                            desc: "Every farm undergoes rigorous due diligence — legal, operational, and environmental — before listing.",
                        },
                        {
                            icon: <Users size={22} />,
                            title: "Community Impact",
                            desc: "Your investment directly supports local farmers and creates sustainable livelihoods across West Africa.",
                        },
                    ].map((f) => (
                        <div className="feature-card" key={f.title}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="how">
                <div>
                    <div className="section-tag">Process</div>
                    <h2 className="section-title" style={{ marginBottom: "40px" }}>
                        Simple steps to <em>grow</em> your wealth
                    </h2>
                    <div className="how-steps">
                        {[
                            { n: "01", title: "Create your account", desc: "Sign up in minutes with identity verification powered by secure, industry-standard KYC." },
                            { n: "02", title: "Browse verified farms", desc: "Explore curated agricultural projects with full financial disclosures, risk ratings, and projected returns." },
                            { n: "03", title: "Invest & track", desc: "Deploy capital in seconds. Monitor real-time performance, payouts, and farm milestones from your dashboard." },
                            { n: "04", title: "Earn returns", desc: "Receive quarterly distributions directly to your wallet as farms yield harvests and revenue." },
                        ].map((step) => (
                            <div className="how-step" key={step.n}>
                                <div className="how-step-num">{step.n}</div>
                                <div className="how-step-body">
                                    <div className="how-step-title">{step.title}</div>
                                    <div className="how-step-desc">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="how-visual">
                    <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
                    <div className="how-visual-inner">
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "24px", letterSpacing: "1px", textTransform: "uppercase" }}>
                            Portfolio Overview
                        </div>
                        {[
                            { label: "Palm Oil Farm — Liberia", value: "$4,200", sub: "+18.2% this quarter", pct: 78 },
                            { label: "Cassava Project — Ghana", value: "$2,800", sub: "+14.6% this quarter", pct: 60 },
                            { label: "Rubber Plantation — Sierra Leone", value: "$1,600", sub: "+21.1% this quarter", pct: 45 },
                        ].map((card) => (
                            <div className="how-card" key={card.label} style={{ position: "relative" }}>
                                <div className="how-card-label">{card.label}</div>
                                <div className="how-card-value">{card.value}</div>
                                <div className="how-card-sub">{card.sub}</div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: `${card.pct}%` }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: "24px", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Portfolio Value</div>
                                <div style={{ fontSize: "28px", fontWeight: "700", color: "white", fontFamily: "'Cormorant Garant', serif" }}>$8,600</div>
                            </div>
                            <div style={{ background: "rgba(200,144,60,0.15)", border: "1px solid rgba(200,144,60,0.3)", borderRadius: "100px", padding: "8px 16px", fontSize: "14px", fontWeight: "600", color: "var(--gold-light)" }}>
                                +18.5% ROI
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", top: "-200px", right: "20%" }} />
                <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", bottom: "-100px", right: "10%" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 className="cta-title">
                        Ready to grow your <em>wealth</em>?
                    </h2>
                    <p className="cta-desc">
                        Join thousands of investors building real returns while funding the future of African agriculture.
                    </p>
                    <Link to="/auth" style={{ display: "inline-block", marginTop: "36px" }}>
                        <button className="btn-gold">
                            Create Free Account <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>

                <div className="cta-right" style={{ position: "relative", zIndex: 1 }}>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"I've been investing with AYF for 18 months. The returns are consistent and the impact reporting is transparent — I know exactly where my money is going."</p>
                        <div className="testimonial-author">
                            <div className="avatar">AK</div>
                            <div>
                                <div className="author-name">Amara Kamara</div>
                                <div className="author-loc">Freetown, Sierra Leone</div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"The platform is clean, the farms are properly vetted. I've recommended it to my entire investment circle."</p>
                        <div className="testimonial-author">
                            <div className="avatar" style={{ background: "#2d6b47" }}>EO</div>
                            <div>
                                <div className="author-name">Emeka Okafor</div>
                                <div className="author-loc">Lagos, Nigeria</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-logo">
                    <div className="nav-logo-mark" style={{ background: "rgba(200,144,60,0.8)" }}>AYF</div>
                    <span className="footer-copy">© 2024 African Youth Forum. All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact</a>
                </div>
            </footer>
        </div>
    );
}