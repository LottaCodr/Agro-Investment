import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { mockFarms, formatFullCurrency } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, FolderOpen, TrendingUp, Coins, Users, Sprout } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const totalFarms = mockFarms.length;
const openFarms = mockFarms.filter(f => f.status === "funding").length;
const closedFarms = mockFarms.filter(f => f.status === "closed").length;
const totalFunding = mockFarms.reduce((acc, f) => acc + f.targetAmount, 0);
const avgROI = mockFarms.length
    ? (mockFarms.reduce((acc, f) => acc + (typeof f.roiPercentage === "number" ? f.roiPercentage : 0), 0) / mockFarms.length).toFixed(1)
    : "0";
const activeFarms = mockFarms.filter(f => f.status === "active").length;
const totalInvestors = mockFarms.reduce((acc, f) => acc + (typeof f.investorCount === "number" ? f.investorCount : 0), 0);

export default function AdminDashboardPage() {
    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Admin</p>
                    <h1 className="page-header-title">Admin Dashboard</h1>
                    <p className="page-header-subtitle">
                        Manage farms, track performance, and monitor platform activity.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <StatsCard label="Total Farms" value={totalFarms.toString()} icon={<Sprout className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Funding Open" value={openFarms.toString()} trend={`+ ${openFarms}`} trendLabel="open" icon={<TrendingUp className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Total Funding Goal" value={formatFullCurrency(totalFunding)} icon={<Coins className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Avg. ROI" value={`${avgROI}%`} icon={<TrendingUp className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Active Farms" value={activeFarms.toString()} trend={`+ ${activeFarms}`} trendLabel="active" icon={<FolderOpen className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Closed Farms" value={closedFarms.toString()} />
                    <StatsCard label="Total Investors" value={totalInvestors.toLocaleString()} icon={<Users className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                </div>

                {/* Filters + Add */}
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-end gap-4">
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#5a6b5e" }} htmlFor="start-date">Start Date</label>
                            <input
                                type="date" id="start-date"
                                className="px-3 py-2 rounded-xl text-sm focus:outline-none min-w-[135px]"
                                style={{ background: "white", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }}
                            />
                        </div>
                        <span className="text-xl pb-2" style={{ color: "#5a6b5e" }}>→</span>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#5a6b5e" }} htmlFor="end-date">End Date</label>
                            <input
                                type="date" id="end-date"
                                className="px-3 py-2 rounded-xl text-sm focus:outline-none min-w-[135px]"
                                style={{ background: "white", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }}
                            />
                        </div>
                    </div>
                    <RouterLink to="/admin/farm/new">
                        <button
                            className="flex items-center px-6 h-11 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:brightness-110"
                            style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Opportunity
                        </button>
                    </RouterLink>
                </div>

                {/* Table */}
                <section
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "white", border: "1px solid hsl(34 25% 85%)" }}
                >
                    <header className="px-6 py-4" style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}>
                        <h2
                            className="text-xl font-semibold"
                            style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            Opportunities Created
                        </h2>
                    </header>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow style={{ background: "hsl(34 30% 90%)" }}>
                                    <TableHead className="w-56 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Farm Name</TableHead>
                                    <TableHead className="w-24 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>ROI %</TableHead>
                                    <TableHead className="w-32 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Goal</TableHead>
                                    <TableHead className="w-28 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Duration</TableHead>
                                    <TableHead className="w-36 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Status</TableHead>
                                    <TableHead className="w-28 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockFarms.map((farm) => (
                                    <TableRow key={farm.id} className="transition-colors hover:bg-[#f7f3ed]/60" style={{ borderColor: "hsl(34 25% 85%)" }}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img src={farm.image} alt={farm.name} className="w-11 h-11 rounded-xl object-cover" style={{ border: "1px solid hsl(34 25% 85%)" }} />
                                                <span className="font-medium" style={{ color: "#0e2a1a" }}>{farm.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-semibold" style={{ color: "#0e2a1a" }}>{farm.roiPercentage}%</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-medium" style={{ color: "#0e2a1a" }}>{formatFullCurrency(farm.targetAmount)}</span>
                                        </TableCell>
                                        <TableCell className="text-center" style={{ color: "#5a6b5e" }}>{farm.durationMonths} Months</TableCell>
                                        <TableCell className="text-center">
                                            {farm.status === "active" && <span className="badge-active">Active</span>}
                                            {farm.status === "funding" && <span className="badge-funding">Funding</span>}
                                            {farm.status === "closed" && <span className="badge-closed">Closed</span>}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-[#f7f3ed]" style={{ color: "#1a4a2e" }}>
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-red-50 text-destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
