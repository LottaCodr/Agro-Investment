import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockInvestments, formatCurrency } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, TrendingUp, FolderOpen } from "lucide-react";
import { InvestmentCard } from "@/components/dashboard/InvestmenCard";

export default function MyInvestmentsPage() {
    const [activeTab, setActiveTab] = useState("active");

    const activeInvestments = mockInvestments.filter(i => i.status === "active");
    const completedInvestments = mockInvestments.filter(i => i.status === "completed");

    const totalInvested = mockInvestments.reduce((sum, i) => sum + i.amount, 0);
    const totalReturns = mockInvestments.reduce((sum, i) => sum + i.expectedReturn, 0);

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Portfolio</p>
                    <h1 className="page-header-title">My Investments</h1>
                    <p className="page-header-subtitle">
                        Track the progress of your active and completed farm investments.
                    </p>
                </div>

                {/* Portfolio Summary */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl"
                    style={{
                        background: "white",
                        border: "1px solid hsl(34 25% 85%)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(14,42,26,0.06)" }}
                        >
                            <Wallet className="w-5 h-5" style={{ color: "#1a4a2e" }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "#5a6b5e" }}>
                                Total Invested
                            </p>
                            <p
                                className="text-xl font-bold"
                                style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                ${totalInvested.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(200,144,60,0.08)" }}
                        >
                            <TrendingUp className="w-5 h-5" style={{ color: "#c8903c" }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "#5a6b5e" }}>
                                Expected Returns
                            </p>
                            <p
                                className="text-xl font-bold"
                                style={{ color: "#c8903c", fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                ${totalReturns.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(14,42,26,0.06)" }}
                        >
                            <FolderOpen className="w-5 h-5" style={{ color: "#1a4a2e" }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "#5a6b5e" }}>
                                Active Projects
                            </p>
                            <p
                                className="text-xl font-bold"
                                style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {activeInvestments.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList
                        className="bg-transparent p-0 gap-0 h-auto"
                        style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}
                    >
                        <TabsTrigger
                            value="active"
                            className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 data-[state=active]:shadow-none"
                            style={activeTab === "active" ? {
                                borderColor: "#c8903c",
                                color: "#0e2a1a",
                                background: "transparent",
                            } : {
                                borderColor: "transparent",
                                color: "#5a6b5e",
                                background: "transparent",
                            }}
                        >
                            Active ({activeInvestments.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed"
                            className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 data-[state=active]:shadow-none"
                            style={activeTab === "completed" ? {
                                borderColor: "#c8903c",
                                color: "#0e2a1a",
                                background: "transparent",
                            } : {
                                borderColor: "transparent",
                                color: "#5a6b5e",
                                background: "transparent",
                            }}
                        >
                            Completed ({completedInvestments.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="mt-6">
                        {activeInvestments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeInvestments.map((investment, index) => (
                                    <div
                                        key={investment.id}
                                        className="animate-slide-up"
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <InvestmentCard investment={investment} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="text-center py-16 rounded-2xl"
                                style={{
                                    background: "white",
                                    border: "1px solid hsl(34 25% 85%)",
                                }}
                            >
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                                    style={{ background: "rgba(14,42,26,0.06)" }}
                                >
                                    <FolderOpen className="w-7 h-7" style={{ color: "#1a4a2e" }} />
                                </div>
                                <p className="font-semibold text-lg mb-1" style={{ color: "#0e2a1a" }}>
                                    No active investments
                                </p>
                                <p className="mb-6" style={{ color: "#5a6b5e" }}>
                                    Start your investment journey today.
                                </p>
                                <Link to="/discover">
                                    <Button
                                        className="rounded-full px-6 text-white font-semibold"
                                        style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                                    >
                                        Explore Farms
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="mt-6">
                        {completedInvestments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {completedInvestments.map((investment, index) => (
                                    <div
                                        key={investment.id}
                                        className="animate-slide-up"
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <InvestmentCard investment={investment} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="text-center py-16 rounded-2xl"
                                style={{
                                    background: "white",
                                    border: "1px solid hsl(34 25% 85%)",
                                }}
                            >
                                <p className="font-semibold text-lg mb-1" style={{ color: "#0e2a1a" }}>
                                    No completed investments yet
                                </p>
                                <p style={{ color: "#5a6b5e" }}>
                                    Completed investments will appear here.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Explore More */}
                <div className="flex justify-center pt-4">
                    <Link to="/discover">
                        <button
                            className="px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:brightness-110"
                            style={{ background: "#c8903c", color: "white" }}
                        >
                            Explore More Farms
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
