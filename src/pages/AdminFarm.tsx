import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useApp } from "@/lib/store";
import { formatFullCurrency } from "@/lib/mock-data";
import { ConfirmDialog } from "@/components/ui/modal";
import { toast } from "sonner";
import type { FarmStatus } from "@/lib/types";

const AdminFarmPage = () => {
    const { farms, deleteFarm } = useApp();
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<"All" | FarmStatus>("All");
    const [pending, setPending] = useState<string | null>(null);

    const list = useMemo(
        () =>
            farms.filter((f) => {
                const matchesQ =
                    !q ||
                    f.name.toLowerCase().includes(q.toLowerCase()) ||
                    f.location.toLowerCase().includes(q.toLowerCase());
                const matchesStatus = status === "All" || f.status === status;
                return matchesQ && matchesStatus;
            }),
        [farms, q, status],
    );

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Farms</p>
                    <h1 className="page-header-title">Manage farms</h1>
                    <p className="page-header-subtitle">One source of truth with the investor marketplace.</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6b5e]" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search farms…"
                                className="pl-9 h-10 rounded-xl border border-[#e8e0d4] bg-white text-sm w-56"
                            />
                        </div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as typeof status)}
                            className="h-10 rounded-xl border border-[#e8e0d4] bg-white px-3 text-sm"
                        >
                            <option value="All">All statuses</option>
                            <option value="funding">Funding</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <RouterLink to="/admin/farm/new">
                        <button className="flex items-center px-6 h-11 rounded-full font-semibold text-sm text-white" style={{ background: "#0e2a1a" }}>
                            <Plus className="w-4 h-4 mr-2" /> Add opportunity
                        </button>
                    </RouterLink>
                </div>

                <section className="rounded-2xl overflow-x-auto bg-white border border-[#e8e0d4]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#ede5d8]/70">
                                <TableHead>Farm</TableHead>
                                <TableHead className="text-center">ROI</TableHead>
                                <TableHead className="text-center">Raised / Goal</TableHead>
                                <TableHead className="text-center">Duration</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {list.map((farm) => (
                                <TableRow key={farm.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={farm.image} alt="" className="w-11 h-11 rounded-xl object-cover" />
                                            <span className="font-medium">{farm.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">{farm.roiPercentage}%</TableCell>
                                    <TableCell className="text-center">
                                        {formatFullCurrency(farm.currentAmount)} / {formatFullCurrency(farm.targetAmount)}
                                    </TableCell>
                                    <TableCell className="text-center text-[#5a6b5e]">{farm.durationMonths} mo</TableCell>
                                    <TableCell className="text-center">
                                        {farm.status === "active" && <span className="badge-active">Active</span>}
                                        {farm.status === "funding" && <span className="badge-funding">Funding</span>}
                                        {farm.status === "closed" && <span className="badge-closed">Closed</span>}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/farm/${farm.id}/edit`)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setPending(farm.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </div>
            <ConfirmDialog
                open={Boolean(pending)}
                onClose={() => setPending(null)}
                title="Delete farm?"
                description="This listing will be removed from the marketplace."
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    if (pending) {
                        deleteFarm(pending);
                        toast.success("Farm deleted");
                    }
                }}
            />
        </DashboardLayout>
    );
};

export default AdminFarmPage;
