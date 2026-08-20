import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatFullCurrency } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, FolderOpen, TrendingUp, Coins, Users, Sprout } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useApp } from "@/lib/store";
import { ConfirmDialog } from "@/components/ui/modal";
import { toast } from "sonner";

export default function AdminDashboardPage() {
    const { farms, investors, deleteFarm } = useApp();
    const navigate = useNavigate();
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [pendingDelete, setPendingDelete] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return farms.filter((f) => {
            if (start && f.createdAt < start) return false;
            if (end && f.createdAt > end) return false;
            return true;
        });
    }, [farms, start, end]);

    const totalFarms = filtered.length;
    const openFarms = filtered.filter((f) => f.status === "funding").length;
    const closedFarms = filtered.filter((f) => f.status === "closed").length;
    const totalFunding = filtered.reduce((acc, f) => acc + f.targetAmount, 0);
    const avgROI = filtered.length
        ? (filtered.reduce((acc, f) => acc + f.roiPercentage, 0) / filtered.length).toFixed(1)
        : "0";
    const activeFarms = filtered.filter((f) => f.status === "active").length;
    const totalInvestors = investors.length;

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin</p>
                    <h1 className="page-header-title">Admin dashboard</h1>
                    <p className="page-header-subtitle">Manage listings and watch platform volume.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <StatsCard label="Total Farms" value={totalFarms.toString()} icon={<Sprout className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Funding Open" value={openFarms.toString()} icon={<TrendingUp className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Funding Goal" value={formatFullCurrency(totalFunding)} icon={<Coins className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Avg. ROI" value={`${avgROI}%`} icon={<TrendingUp className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Active Farms" value={activeFarms.toString()} icon={<FolderOpen className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Closed Farms" value={closedFarms.toString()} />
                    <StatsCard label="Investors" value={totalInvestors.toLocaleString()} icon={<Users className="w-4 h-4 text-[#1a4a2e]" />} />
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-end gap-4 flex-wrap">
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#5a6b5e]" htmlFor="start-date">
                                Listed from
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className="px-3 py-2 rounded-xl text-sm bg-white border border-[#e8e0d4]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#5a6b5e]" htmlFor="end-date">
                                Listed to
                            </label>
                            <input
                                type="date"
                                id="end-date"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                className="px-3 py-2 rounded-xl text-sm bg-white border border-[#e8e0d4]"
                            />
                        </div>
                    </div>
                    <RouterLink to="/admin/farm/new">
                        <button className="flex items-center px-6 h-11 rounded-full font-semibold text-sm text-white" style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add opportunity
                        </button>
                    </RouterLink>
                </div>

                <section className="rounded-2xl overflow-hidden bg-white border border-[#e8e0d4]">
                    <header className="px-6 py-4 border-b border-[#e8e0d4]">
                        <h2 className="text-xl ayf-heading">Opportunities ({filtered.length})</h2>
                    </header>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#ede5d8]/70">
                                    <TableHead>Farm</TableHead>
                                    <TableHead className="text-center">ROI</TableHead>
                                    <TableHead className="text-center">Goal</TableHead>
                                    <TableHead className="text-center">Duration</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((farm) => (
                                    <TableRow key={farm.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img src={farm.image} alt="" className="w-11 h-11 rounded-xl object-cover" />
                                                <div>
                                                    <p className="font-medium">{farm.name}</p>
                                                    <p className="text-xs text-[#5a6b5e]">{farm.cropType} · {farm.location}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-semibold">{farm.roiPercentage}%</TableCell>
                                        <TableCell className="text-center">{formatFullCurrency(farm.targetAmount)}</TableCell>
                                        <TableCell className="text-center text-[#5a6b5e]">{farm.durationMonths} mo</TableCell>
                                        <TableCell className="text-center">
                                            {farm.status === "active" && <span className="badge-active">Active</span>}
                                            {farm.status === "funding" && <span className="badge-funding">Funding</span>}
                                            {farm.status === "closed" && <span className="badge-closed">Closed</span>}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/farm/${farm.id}/edit`)}>
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setPendingDelete(farm.id)}>
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
            <ConfirmDialog
                open={Boolean(pendingDelete)}
                onClose={() => setPendingDelete(null)}
                title="Remove this farm?"
                description="It will disappear from Discover. Existing investments stay in investor records."
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    if (pendingDelete) {
                        deleteFarm(pendingDelete);
                        toast.success("Farm removed");
                    }
                }}
            />
        </DashboardLayout>
    );
}
