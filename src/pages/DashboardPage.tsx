import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { mockFarms, mockUserStats, formatCurrency } from "@/lib/mock-data";
import { TrendingUp, FolderOpen, Coins, ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
    const featuredFarms = mockFarms.filter(f => f.status === "funding").slice(0, 6);

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-8 animate-fade-in">
                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="relative z-10">
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
                            Welcome back, Bami
                        </h1>
                        <p className="text-white/55 text-sm max-w-md font-light">
                            Your investments are growing. Track your portfolio performance and discover new opportunities.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <Link to="/discover">
                                <button
                                    className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:brightness-110"
                                    style={{ background: "#c8903c", color: "white" }}
                                >
                                    <Compass className="w-4 h-4" />
                                    Explore Farms
                                </button>
                            </Link>
                            <Link to="/my-investments">
                                <button
                                    className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:bg-white/15"
                                    style={{
                                        border: "1.5px solid rgba(255,255,255,0.2)",
                                        color: "white",
                                        background: "transparent"
                                    }}
                                >
                                    My Investments
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <StatsCard
                        label="Total Invested"
                        value={formatCurrency(mockUserStats.totalInvested)}
                        trend={`+ ${mockUserStats.monthlyGrowth}%`}
                        trendLabel="vs last month"
                        icon={<TrendingUp className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                    <StatsCard
                        label="Active Projects"
                        value={mockUserStats.activeProjects.toString()}
                        trend={`+ ${mockUserStats.projectGrowth}`}
                        trendLabel="new project"
                        icon={<FolderOpen className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                    <StatsCard
                        label="ROI Earned"
                        value={formatCurrency(mockUserStats.roiEarned)}
                        trend={`+ ${mockUserStats.roiGrowthAllTime}%`}
                        trendLabel="all time"
                        icon={<Coins className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                    />
                </div>

                {/* Recent Farms */}
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="section-tag">Opportunities</p>
                            <h2
                                className="text-2xl font-semibold"
                                style={{
                                    color: "#0e2a1a",
                                    fontFamily: "'Cormorant Garamond', serif",
                                }}
                            >
                                Recent Farms
                            </h2>
                        </div>
                        <Link
                            to="/discover"
                            className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
                            style={{ color: "#c8903c" }}
                        >
                            View all
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredFarms.map((farm, index) => (
                            <div
                                key={farm.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <FarmCard farm={farm} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
