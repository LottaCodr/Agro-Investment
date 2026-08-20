import { Link } from "react-router-dom";
import {
    ArrowRight,
    TrendingUp,
    Shield,
    Users,
    Menu,
    X,
    Leaf,
    ChevronDown,
    MapPin,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import heroAgro from "@/assets/hero-agro.jpg";
import { useApp } from "@/lib/store";
import { calculateFundingProgress, formatFullCurrency } from "@/lib/mock-data";

const faqs = [
    {
        q: "How are farms verified?",
        a: "Each listing goes through legal title review, an agronomy visit, and an environmental screen before it appears on AYF. We publish the key findings on the farm page.",
    },
    {
        q: "When do I get paid?",
        a: "Returns follow the cycle on each farm — typically at harvest or on a published quarterly schedule. Payouts land in your AYF wallet and can be withdrawn or reinvested.",
    },
    {
        q: "What is the minimum investment?",
        a: "Most farms start at $75–$250. You can hold several small positions instead of one large ticket.",
    },
    {
        q: "Is my capital guaranteed?",
        a: "No. Agriculture carries weather, price, and operational risk. We underwrite carefully and share risk ratings, but you can lose money. Only invest what you can leave in a cycle.",
    },
];

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const { farms, isAuthenticated } = useApp();

    const featured = useMemo(
        () => farms.filter((f) => f.status === "funding").slice(0, 3),
        [farms],
    );

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const startHref = isAuthenticated ? "/dashboard" : "/auth";

    return (
        <div className="min-h-screen overflow-x-hidden" style={{ background: "#f7f3ed" }}>
            <header
                className="fixed top-0 left-0 right-0 z-50 h-[72px] px-5 md:px-8 flex items-center justify-between transition-all"
                style={
                    scrolled
                        ? {
                              background: "rgba(247,243,237,0.96)",
                              backdropFilter: "blur(14px)",
                              borderBottom: "1px solid #ddd6c8",
                          }
                        : { background: "transparent" }
                }
            >
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#c8903c] text-white text-xs font-bold flex items-center justify-center">
                        AYF
                    </div>
                    <span className="font-semibold text-[#0e2a1a] tracking-tight">African Youth Forum</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm text-[#0e2a1a]/70">
                    <a href="#features" className="hover:text-[#0e2a1a]">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-[#0e2a1a]">
                        How it Works
                    </a>
                    <a href="#farms" className="hover:text-[#0e2a1a]">
                        Farms
                    </a>
                    <a href="#faq" className="hover:text-[#0e2a1a]">
                        FAQ
                    </a>
                </nav>

                <div className="hidden md:flex items-center gap-2.5">
                    <Link
                        to="/auth"
                        className="px-5 py-2 rounded-full text-sm font-medium border border-[#0e2a1a]/20 hover:bg-[#0e2a1a]/5"
                    >
                        Sign In
                    </Link>
                    <Link
                        to={startHref}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#0e2a1a] hover:bg-[#1a4a2e] inline-flex items-center gap-1.5"
                    >
                        Get Started <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-[#f7f3ed] pt-[72px] px-6 flex flex-col gap-1 md:hidden">
                    {[
                        ["Features", "#features"],
                        ["How it Works", "#how-it-works"],
                        ["Farms", "#farms"],
                        ["FAQ", "#faq"],
                    ].map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="py-3 text-2xl ayf-heading border-b border-[#e8e0d4]"
                        >
                            {label}
                        </a>
                    ))}
                    <Link to="/auth" onClick={() => setMenuOpen(false)} className="mt-6">
                        <span className="block text-center py-3 rounded-full border border-[#0e2a1a]/20">Sign In</span>
                    </Link>
                    <Link to={startHref} onClick={() => setMenuOpen(false)}>
                        <span className="block text-center py-3 rounded-full bg-[#0e2a1a] text-white">Get Started</span>
                    </Link>
                </div>
            )}

            <section className="pt-[72px] grid lg:grid-cols-2 min-h-[100svh]">
                <div className="flex flex-col justify-center px-6 md:px-16 py-16">
                    <div className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#c8903c] bg-[#c8903c]/10 border border-[#c8903c]/25 mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8903c] animate-pulse" />
                        Now live — West Africa
                    </div>
                    <h1 className="ayf-heading text-[48px] md:text-[68px] leading-[1.08] text-[#0e2a1a] mb-5">
                        Invest in <em className="italic text-[#2d6b47]">African</em>
                        <br />
                        agriculture
                    </h1>
                    <p className="text-[17px] font-light leading-relaxed text-[#5a6b5e] max-w-md mb-9">
                        Back verified farms across Liberia and West Africa. Earn a contracted return while capital
                        reaches growers who need it.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to={startHref}
                            className="px-7 py-3.5 rounded-full text-white bg-[#0e2a1a] font-medium inline-flex items-center gap-2 hover:-translate-y-0.5 transition"
                        >
                            Start Investing <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#farms"
                            className="px-7 py-3.5 rounded-full border border-[#0e2a1a]/25 font-medium hover:bg-[#0e2a1a]/5"
                        >
                            Explore Farms
                        </a>
                    </div>
                </div>
                <div className="relative min-h-[280px] lg:min-h-full overflow-hidden lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
                    <img src={heroAgro} alt="West African farmland at sunrise" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0e2a1a]/35 to-transparent" />
                </div>
            </section>

            <section className="bg-[#0e2a1a] px-6 md:px-16 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    ["$11.8M+", "Deployed to farms"],
                    ["2,500+", "Active investors"],
                    ["18.5%", "Average modeled ROI"],
                    ["24", "Live projects"],
                ].map(([value, label]) => (
                    <div key={label} className="text-center">
                        <div className="ayf-serif text-[40px] font-bold text-white leading-none mb-1.5">{value}</div>
                        <div className="text-[13px] text-white/50">{label}</div>
                    </div>
                ))}
            </section>

            <section id="features" className="px-6 md:px-16 py-24">
                <p className="section-tag">Why AYF</p>
                <h2 className="ayf-heading text-4xl md:text-5xl max-w-lg mb-14">
                    Built for <em className="italic text-[#2d6b47]">serious</em> capital
                </h2>
                <div className="grid md:grid-cols-3 gap-5">
                    {[
                        {
                            icon: TrendingUp,
                            title: "Clear returns",
                            desc: "Modeled yields up to 22% with a published duration, offtake notes, and a payout calendar on every listing.",
                        },
                        {
                            icon: Shield,
                            title: "Verified land",
                            desc: "Title, operations, and environmental checks happen before a farm is listed — not after you send funds.",
                        },
                        {
                            icon: Users,
                            title: "Local impact",
                            desc: "Capital pays for seed, irrigation, and mills that keep more of the harvest value in West African communities.",
                        },
                    ].map((f) => (
                        <div key={f.title} className="card-premium p-9 bg-white">
                            <div className="w-12 h-12 rounded-xl bg-[#0e2a1a]/6 flex items-center justify-center text-[#1a4a2e] mb-6">
                                <f.icon className="w-5 h-5" />
                            </div>
                            <h3 className="ayf-heading text-2xl mb-3">{f.title}</h3>
                            <p className="text-[15px] font-light leading-relaxed text-[#5a6b5e]">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="how-it-works" className="px-6 md:px-16 py-24 bg-[#ede5d8] grid lg:grid-cols-[1fr_1.15fr] gap-16 items-center">
                <div>
                    <p className="section-tag">Process</p>
                    <h2 className="ayf-heading text-4xl md:text-5xl mb-10">
                        Four steps to <em className="italic text-[#2d6b47]">put capital to work</em>
                    </h2>
                    <div>
                        {[
                            ["01", "Create an account", "Sign up in minutes. We run a standard identity check before the first transfer."],
                            ["02", "Browse verified farms", "Read the thesis, risk rating, duration, and live funding progress."],
                            ["03", "Invest from wallet or card", "Tickets start small. Track planting, rainfall, and payouts from one dashboard."],
                            ["04", "Collect returns", "Harvest proceeds land in your wallet. Withdraw or roll them into the next cycle."],
                        ].map(([n, title, desc]) => (
                            <div key={n} className="flex gap-5 py-6 border-b border-[#0e2a1a]/8 last:border-0 group">
                                <span className="ayf-serif text-4xl font-bold text-[#0e2a1a]/10 group-hover:text-[#c8903c] transition w-12">
                                    {n}
                                </span>
                                <div>
                                    <div className="font-semibold text-[#0e2a1a] mb-1">{title}</div>
                                    <div className="text-sm font-light text-[#5a6b5e] leading-relaxed">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#0e2a1a] rounded-[20px] p-8 md:p-12 relative overflow-hidden">
                    <p className="text-[11px] uppercase tracking-[1px] text-white/40 mb-6">Sample portfolio</p>
                    {featured.map((farm) => {
                        const pct = calculateFundingProgress(farm.currentAmount, farm.targetAmount);
                        return (
                            <div
                                key={farm.id}
                                className="rounded-xl p-5 mb-3"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                                <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1">{farm.name}</p>
                                <p className="text-xl font-semibold text-white">{formatFullCurrency(farm.minInvestment)} min</p>
                                <p className="text-xs text-white/50 mb-2">
                                    {farm.roiPercentage}% modeled · {farm.durationMonths} months
                                </p>
                                <div className="h-1.5 rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-[#e8b060]" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="farms" className="px-6 md:px-16 py-24">
                <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
                    <div>
                        <p className="section-tag">Open now</p>
                        <h2 className="ayf-heading text-4xl md:text-5xl">
                            Farms raising <em className="italic text-[#2d6b47]">this season</em>
                        </h2>
                    </div>
                    <Link to={isAuthenticated ? "/discover" : "/auth"} className="text-sm font-semibold text-[#c8903c] inline-flex items-center gap-1">
                        View all opportunities <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {featured.map((farm) => {
                        const pct = calculateFundingProgress(farm.currentAmount, farm.targetAmount);
                        return (
                            <Link key={farm.id} to={isAuthenticated ? `/farm/${farm.id}` : "/auth"} className="card-premium bg-white">
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img src={farm.image} alt={farm.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="badge-funding">{farm.cropType}</span>
                                        <span className="text-sm font-semibold text-[#c8903c]">{farm.roiPercentage}% ROI</span>
                                    </div>
                                    <h3 className="ayf-heading text-2xl mb-1">{farm.name}</h3>
                                    <p className="text-sm text-[#5a6b5e] flex items-center gap-1 mb-4">
                                        <MapPin className="w-3.5 h-3.5" /> {farm.location}
                                    </p>
                                    <div className="h-2 rounded-full bg-[#ede5d8] mb-2">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${pct}%`,
                                                background: "linear-gradient(90deg,#c8903c,#e8b060)",
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-[#5a6b5e]">
                                        {formatFullCurrency(farm.currentAmount)} of {formatFullCurrency(farm.targetAmount)} · {pct}%
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section id="faq" className="px-6 md:px-16 py-20 bg-[#ede5d8]">
                <p className="section-tag">FAQ</p>
                <h2 className="ayf-heading text-4xl mb-10">Straight answers</h2>
                <div className="max-w-3xl space-y-3">
                    {faqs.map((item, i) => (
                        <div key={item.q} className="bg-white rounded-2xl border border-[#e8e0d4] overflow-hidden">
                            <button
                                type="button"
                                className="w-full flex items-center justify-between text-left px-6 py-5"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="font-semibold text-[#0e2a1a]">{item.q}</span>
                                <ChevronDown
                                    className={`w-4 h-4 text-[#5a6b5e] transition ${openFaq === i ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openFaq === i && (
                                <p className="px-6 pb-5 text-sm leading-relaxed text-[#5a6b5e]">{item.a}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#1a4a2e] px-6 md:px-16 py-24 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="ayf-heading text-4xl md:text-5xl text-white mb-4">
                        Ready to grow your <em className="italic text-[#e8b060]">wealth</em>?
                    </h2>
                    <p className="text-white/55 font-light max-w-md mb-8">
                        Join investors funding real harvests — with a dashboard that shows where every dollar sits.
                    </p>
                    <Link
                        to={startHref}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c8903c] text-white font-semibold hover:bg-[#e8b060] transition"
                    >
                        Create a free account <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="relative z-10 space-y-4">
                    {[
                        {
                            quote: "Eighteen months in, the payouts have been on time and I can see exactly which block my money planted.",
                            name: "Amara Kamara",
                            loc: "Freetown, Sierra Leone",
                            initials: "AK",
                        },
                        {
                            quote: "The farms are actually vetted. I moved a slice of my portfolio here and recommended it to my circle.",
                            name: "Emeka Okafor",
                            loc: "Lagos, Nigeria",
                            initials: "EO",
                        },
                    ].map((t) => (
                        <blockquote
                            key={t.name}
                            className="rounded-2xl p-6"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            <p className="text-white/80 italic font-light mb-4">“{t.quote}”</p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#c8903c] text-white text-xs font-bold flex items-center justify-center">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{t.name}</div>
                                    <div className="text-white/40 text-xs">{t.loc}</div>
                                </div>
                            </div>
                        </blockquote>
                    ))}
                </div>
            </section>

            <footer className="bg-[#0e2a1a] px-6 md:px-16 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#c8903c]/80 text-white text-xs font-bold flex items-center justify-center">
                        AYF
                    </div>
                    <span className="text-sm text-white/35">© 2026 African Youth Forum. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/40">
                    <Link to="/privacy" className="hover:text-white/80">
                        Privacy
                    </Link>
                    <Link to="/terms" className="hover:text-white/80">
                        Terms
                    </Link>
                    <Link to="/contact" className="hover:text-white/80">
                        Contact
                    </Link>
                    <span className="inline-flex items-center gap-1 text-white/30">
                        <Leaf className="w-3.5 h-3.5" /> Agriculture carries risk
                    </span>
                </div>
            </footer>
        </div>
    );
}
