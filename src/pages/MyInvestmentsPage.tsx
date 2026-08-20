import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { formatFullCurrency } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, TrendingUp, FolderOpen } from "lucide-react";
import { InvestmentCard } from "@/components/dashboard/InvestmenCard";
import { useApp } from "@/lib/store";

export default function MyInvestmentsPage() {
    const [activeTab, setActiveTab] = useState("active");
    const { investments, user } = useApp();

    const mine = useMemo(
        () => investments.filter((i) => !i.userId || !user || i.userId === user.id),
        [investments, user],
    );
    const activeInvestments = mine.filter((i) => i.status === "active");
    const completedInvestments = mine.filter((i) => i.status === "completed");
    const totalInvested = mine.reduce((sum, i) => sum + i.amount, 0);
    const totalReturns = mine.reduce((sum, i) => sum + i.expectedReturn, 0);

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Portfolio</p>
                    <h1 className="page-header-title">My Investments</h1>
                    <p className="page-header-subtitle">Track active cycles and completed harvests.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-[#e8e0d4]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0e2a1a]/6">
                            <Wallet className="w-5 h-5 text-[#1a4a2e]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase text-[#5a6b5e]">
                                Total invested
                            </p>
                            <p className="text-xl font-bold ayf-serif">{formatFullCurrency(totalInvested)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#c8903c]/10">
                            <TrendingUp className="w-5 h-5 text-[#c8903c]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase text-[#5a6b5e]">
                                Expected value
                            </p>
                            <p className="text-xl font-bold ayf-serif text-[#c8903c]">{formatFullCurrency(totalReturns)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0e2a1a]/6">
                            <FolderOpen className="w-5 h-5 text-[#1a4a2e]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase text-[#5a6b5e]">
                                Active projects
                            </p>
                            <p className="text-xl font-bold ayf-serif">{activeInvestments.length}</p>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-transparent p-0 h-auto border-b border-[#e8e0d4] rounded-none">
                        {(["active", "completed"] as const).map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 capitalize data-[state=active]:shadow-none"
                                style={
                                    activeTab === tab
                                        ? { borderColor: "#c8903c", color: "#0e2a1a", background: "transparent" }
                                        : { borderColor: "transparent", color: "#5a6b5e", background: "transparent" }
                                }
                            >
                                {tab} ({tab === "active" ? activeInvestments.length : completedInvestments.length})
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="active" className="mt-6">
                        {activeInvestments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeInvestments.map((investment, index) => (
                                    <div key={investment.id} className="animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                                        <InvestmentCard investment={investment} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 rounded-2xl bg-white border border-[#e8e0d4]">
                                <FolderOpen className="w-8 h-8 mx-auto mb-3 text-[#1a4a2e]" />
                                <p className="font-semibold text-lg mb-1">No active investments</p>
                                <p className="mb-6 text-[#5a6b5e]">Start with a farm that is still raising.</p>
                                <Link to="/discover">
                                    <Button className="rounded-full px-6 text-white" style={{ background: "#0e2a1a" }}>
                                        Explore Farms <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="mt-6">
                        {completedInvestments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {completedInvestments.map((investment) => (
                                    <InvestmentCard key={investment.id} investment={investment} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 rounded-2xl bg-white border border-[#e8e0d4]">
                                <p className="font-semibold text-lg mb-1">No completed cycles yet</p>
                                <p className="text-[#5a6b5e]">Harvested positions will land here with their final return.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
