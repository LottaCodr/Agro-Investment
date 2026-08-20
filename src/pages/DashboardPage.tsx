import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { formatCurrency, formatFullCurrency, formatLongDate } from "@/lib/mock-data";
import { TrendingUp, FolderOpen, Coins, ArrowRight, Compass, Wallet, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/lib/store";
import { useMemo } from "react";

function Sparkline({ points }: { points: number[] }) {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const w = 280;
    const h = 72;
    const coords = points.map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / (max - min || 1)) * (h - 8) - 4;
        return `${x},${y}`;
    });
    const d = `M ${coords.join(" L ")}`;
    const fill = `${d} L ${w},${h} L 0,${h} Z`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
            <path d={fill} fill="rgba(200,144,60,0.15)" />
            <path d={d} fill="none" stroke="#c8903c" strokeWidth="2.2" />
        </svg>
    );
}

export default function DashboardPage() {
    const { user, farms, investments, transactions, walletBalance, watchlist } = useApp();
    const firstName = user?.name.split(" ")[0] ?? "there";

    const mine = useMemo(
        () => investments.filter((i) => !i.userId || !user || i.userId === user.id),
        [investments, user],
    );

    const active = mine.filter((i) => i.status === "active");
    const totalInvested = mine.reduce((s, i) => s + i.amount, 0);
    const expected = mine.filter((i) => i.status === "active").reduce((s, i) => s + i.expectedReturn, 0);
    const earned = mine.filter((i) => i.status === "completed").reduce((s, i) => s + (i.expectedReturn - i.amount), 0);
    const featuredFarms = farms.filter((f) => f.status === "funding").slice(0, 3);
    const watched = farms.filter((f) => watchlist.includes(f.id)).slice(0, 3);
    const recentTx = transactions.filter((t) => !user || t.userId === user.id || t.userName === user.name).slice(0, 5);

    const spark = [8200, 9100, 8800, 10200, 11100, 10800, 12400, totalInvested || 15000];

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-8 animate-fade-in">
                <div className="welcome-banner">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <p
                                className="text-[11px] font-semibold tracking-[2px] uppercase mb-3"
                                style={{ color: "rgba(232,176,96,0.8)" }}
                            >
                                Portfolio Overview
                            </p>
                            <h1
                                className="text-3xl md:text-4xl font-semibold text-white mb-2"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Welcome back, {firstName}
                            </h1>
                            <p className="text-white/55 text-sm max-w-md font-light">
                                {active.length} active cycle{active.length === 1 ? "" : "s"} · wallet{" "}
                                {formatFullCurrency(walletBalance)}. Your next harvest window is on the investments page.
                            </p>
                            <div className="flex gap-3 mt-6 flex-wrap">
                                <Link to="/discover">
                                    <button
                                        className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:brightness-110"
                                        style={{ background: "#c8903c", color: "white" }}
                                    >
                                        <Compass className="w-4 h-4" />
                                        Explore Farms
                                    </button>
                                </Link>
                                <Link to="/wallet">
                                    <button
                                        className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/15"
                                        style={{
                                            border: "1.5px solid rgba(255,255,255,0.2)",
                                            color: "white",
                                            background: "transparent",
                                        }}
                                    >
                                        <Wallet className="w-4 h-4" />
                                        Wallet
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-72 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Portfolio invested</p>
                            <p className="text-2xl text-white ayf-serif">{formatFullCurrency(totalInvested)}</p>
                            <Sparkline points={spark} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <StatsCard
                        label="Total Invested"
                        value={formatCurrency(totalInvested)}
                        trend="+ 5.2%"
                        trendLabel="vs last month"
                        icon={<TrendingUp className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                    <StatsCard
                        label="Active Projects"
                        value={active.length.toString()}
                        trend={`+ ${active.length ? 1 : 0}`}
                        trendLabel="this season"
                        icon={<FolderOpen className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                    <StatsCard
                        label="Expected value"
                        value={formatCurrency(expected)}
                        trendLabel="at harvest"
                        icon={<Coins className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                    <StatsCard
                        label="Wallet"
                        value={formatCurrency(walletBalance)}
                        trend={earned ? `+ ${formatCurrency(earned)}` : undefined}
                        trendLabel={earned ? "realized ROI" : "available"}
                        icon={<Wallet className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <section className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="section-tag">Opportunities</p>
                                <h2 className="text-2xl font-semibold ayf-heading">Farms raising now</h2>
                            </div>
                            <Link to="/discover" className="text-sm font-medium flex items-center gap-1" style={{ color: "#c8903c" }}>
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {featuredFarms.map((farm, index) => (
                                <div key={farm.id} className="animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                                    <FarmCard farm={farm} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="space-y-6">
                        <section className="rounded-2xl bg-white border border-[#e8e0d4] overflow-hidden">
                            <header className="px-5 py-4 border-b border-[#e8e0d4] flex items-center justify-between">
                                <h3 className="ayf-heading text-lg">Recent activity</h3>
                                <Link to="/transactions" className="text-xs font-semibold text-[#c8903c]">
                                    All
                                </Link>
                            </header>
                            <ul>
                                {recentTx.length === 0 && (
                                    <li className="px-5 py-8 text-sm text-center text-[#5a6b5e]">No movements yet.</li>
                                )}
                                {recentTx.map((tx) => (
                                    <li key={tx.id} className="px-5 py-3.5 border-b border-[#e8e0d4] last:border-0">
                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-medium text-[#0e2a1a]">{tx.type}</p>
                                                <p className="text-xs text-[#5a6b5e]">{tx.farm}</p>
                                            </div>
                                            <div className="text-right">
                                                <p
                                                    className="text-sm font-semibold"
                                                    style={{ color: tx.type === "Withdrawal" ? "#5a6b5e" : "#1a4a2e" }}
                                                >
                                                    {tx.type === "Withdrawal" ? "−" : "+"}${tx.amount.toLocaleString()}
                                                </p>
                                                <p className="text-[11px] text-[#8a948c]">{formatLongDate(tx.date)}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-2xl bg-white border border-[#e8e0d4] p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="ayf-heading text-lg flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-[#c8903c]" /> Watchlist
                                </h3>
                                <Link to="/watchlist" className="text-xs font-semibold text-[#c8903c]">
                                    Manage
                                </Link>
                            </div>
                            {watched.length === 0 ? (
                                <p className="text-sm text-[#5a6b5e]">Save a farm from Discover to track it here.</p>
                            ) : (
                                <div className="space-y-2">
                                    {watched.map((f) => (
                                        <FarmCard key={f.id} farm={f} variant="compact" />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
