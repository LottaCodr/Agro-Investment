import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { mockFarms, mockUserStats, formatCurrency } from "@/lib/mock-data";
import { TrendingUp, FolderOpen, Coins } from "lucide-react";

export default function DashboardPage() {
    const featuredFarms = mockFarms.filter(f => f.status === "funding").slice(0, 6);

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-8 animate-fade-in">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCard
                        label="Total Invested"
                        value={formatCurrency(mockUserStats.totalInvested)}
                        trend={`+ ${mockUserStats.monthlyGrowth}%`}
                        trendLabel="vs last month"
                        icon={<TrendingUp className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="Active Projects"
                        value={mockUserStats.activeProjects.toString()}
                        trend={`+ ${mockUserStats.projectGrowth}`}
                        trendLabel="new project"
                        icon={<FolderOpen className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="ROI Earned"
                        value={formatCurrency(mockUserStats.roiEarned)}
                        trend={`+ ${mockUserStats.roiGrowthAllTime}%`}
                        trendLabel="all time"
                        icon={<Coins className="w-4 h-4 text-primary" />}
                    />
                </div>

                {/* Recent Farms */}
                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4">Recent Farms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredFarms.map((farm, index) => (
                            <div
                                key={farm.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
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
