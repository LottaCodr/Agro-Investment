import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockFarms, formatFullCurrency } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, FolderOpen, TrendingUp, Coins, Users } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { StatsCard } from "@/components/dashboard/StatsCard";

// Admin stats calculation
const totalFarms = mockFarms.length;
const openFarms = mockFarms.filter(f => f.status === "funding").length;
const closedFarms = mockFarms.filter(f => f.status === "closed").length;
const totalFunding = mockFarms.reduce((acc, f) => acc + f.targetAmount, 0);
const avgROI = mockFarms.length
    ? (
        mockFarms.reduce((acc, f) => acc + (typeof f.roiPercentage === "number" ? f.roiPercentage : 0), 0) / mockFarms.length
    ).toFixed(1)
    : "0";
const activeFarms = mockFarms.filter(f => f.status === "active").length;
const totalInvestors = mockFarms.reduce((acc, f) => acc + (typeof f.investorCount === "number" ? f.investorCount : 0), 0);

export default function AdminDashboardPage() {
    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
                {/* Admin Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCard
                        label="Total Farms"
                        value={totalFarms.toString()}
                        icon={<FolderOpen className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="Funding Opportunities"
                        value={openFarms.toString()}
                        trend={openFarms > 0 ? `+ ${openFarms}` : undefined}
                        trendLabel={openFarms === 1 ? "open" : "open"}
                        icon={<TrendingUp className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="Total Funding Goal"
                        value={formatFullCurrency(totalFunding)}
                        icon={<Coins className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="Active Farms"
                        value={activeFarms.toString()}
                        trend={activeFarms > 0 ? `+ ${activeFarms}` : undefined}
                        trendLabel={activeFarms === 1 ? "active" : "active"}
                    />
                    <StatsCard
                        label="Closed Farms"
                        value={closedFarms.toString()}
                        trend={closedFarms > 0 ? `+ ${closedFarms}` : undefined}
                        trendLabel={closedFarms === 1 ? "closed" : "closed"}
                    />
                    <StatsCard
                        label="Avg. ROI"
                        value={`${avgROI}%`}
                        icon={<TrendingUp className="w-4 h-4 text-primary" />}
                    />
                    <StatsCard
                        label="Total Investors"
                        value={totalInvestors.toLocaleString()}
                        icon={<Users className="w-4 h-4 text-primary" />}
                    />
                </div>

                {/* Top bar: Filters and Add Button */}
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-end gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs text-muted-foreground mb-1" htmlFor="start-date">Start Date</label>
                            <input
                                type="date"
                                id="start-date"
                                className="px-3 py-2 border border-border rounded-lg bg-card text-sm focus:outline-none focus:border-primary min-w-[135px]"
                                placeholder="Start date"
                            />
                        </div>
                        <span className="text-xl text-muted-foreground pb-3">→</span>
                        <div className="flex flex-col">
                            <label className="text-xs text-muted-foreground mb-1" htmlFor="end-date">End Date</label>
                            <input
                                type="date"
                                id="end-date"
                                className="px-3 py-2 border border-border rounded-lg bg-card text-sm focus:outline-none focus:border-primary min-w-[135px]"
                                placeholder="End date"
                            />
                        </div>
                    </div>

                    <RouterLink to="/admin/farm/new" className="self-end md:self-auto">
                        <Button
                            className="flex items-center px-5 h-11 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            style={{ minWidth: 200, fontSize: "1rem" }}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            <span>Add New Opportunity</span>
                        </Button>
                    </RouterLink>
                </div>

                <section className="bg-card rounded-2xl border border-border overflow-hidden">
                    <header className="px-6 py-4 border-b border-border">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">
                            Opportunities Created
                        </h2>
                    </header>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-56">Farm Name</TableHead>
                                    <TableHead className="w-24 text-center">ROI %</TableHead>
                                    <TableHead className="w-32 text-center">Goal</TableHead>
                                    <TableHead className="w-28 text-center">Duration</TableHead>
                                    <TableHead className="w-36 text-center">Status</TableHead>
                                    <TableHead className="w-28 text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockFarms.map((farm) => (
                                    <TableRow key={farm.id} className="transition-colors hover:bg-muted/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={farm.image}
                                                    alt={farm.name}
                                                    className="w-11 h-11 rounded-lg object-cover border border-border"
                                                />
                                                <span className="font-medium text-foreground">{farm.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center align-middle">
                                            <span className="text-base font-semibold">{farm.roiPercentage}%</span>
                                        </TableCell>
                                        <TableCell className="text-center align-middle">
                                            <span className="font-medium">{formatFullCurrency(farm.targetAmount)}</span>
                                        </TableCell>
                                        <TableCell className="text-center align-middle text-muted-foreground">
                                            {farm.durationMonths} Months
                                        </TableCell>
                                        <TableCell className="text-center align-middle">
                                            {farm.status === "active" && (
                                                <Badge className="border border-green-500 px-3 py-1 text-green-700 bg-green-100/80 rounded-full font-medium text-xs">
                                                    Active
                                                </Badge>
                                            )}
                                            {farm.status === "funding" && (
                                                <Badge className="border border-yellow-500 px-3 py-1 text-yellow-800 bg-yellow-100/80 rounded-full font-medium text-xs">
                                                    Funding
                                                </Badge>
                                            )}
                                            {farm.status === "closed" && (
                                                <Badge className="border border-zinc-400 px-3 py-1 text-zinc-700 bg-zinc-100/80 rounded-full font-medium text-xs">
                                                    Closed
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center align-middle">
                                            <div className="flex items-center justify-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-primary/10 text-primary"
                                                    aria-label="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    aria-label="Delete"
                                                >
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
