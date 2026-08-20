import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, DollarSign, Plus } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useApp } from "@/lib/store";
import { formatFullCurrency, formatLongDate } from "@/lib/mock-data";

export default function AdminInvestorPage() {
    const { investors } = useApp();
    const [q, setQ] = useState("");
    const [from, setFrom] = useState("");
    const [status, setStatus] = useState("");

    const list = useMemo(
        () =>
            investors.filter((inv) => {
                const hay = `${inv.name} ${inv.email} ${inv.phone}`.toLowerCase();
                if (q && !hay.includes(q.toLowerCase())) return false;
                if (from && inv.joinDate < from) return false;
                if (status && inv.status !== status) return false;
                return true;
            }),
        [investors, q, from, status],
    );

    const totalVolume = investors.reduce((sum, inv) => sum + inv.totalInvested, 0);

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Investors</p>
                    <h1 className="page-header-title">All investors</h1>
                    <p className="page-header-subtitle">Everyone who has an account or has placed capital.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <StatsCard label="Total Investors" value={investors.length.toLocaleString()} icon={<Users className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Volume invested" value={formatFullCurrency(totalVolume)} icon={<DollarSign className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard
                        label="Active"
                        value={investors.filter((i) => i.status === "active").length.toString()}
                        icon={<Users className="w-4 h-4 text-[#1a4a2e]" />}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#5a6b5e]">Investor</label>
                            <input
                                className="px-3 py-2 rounded-xl text-sm bg-white border border-[#e8e0d4] min-w-[180px]"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Name or email"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#5a6b5e]">Joined from</label>
                            <input
                                className="px-3 py-2 rounded-xl text-sm bg-white border border-[#e8e0d4]"
                                type="date"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#5a6b5e]">Status</label>
                            <select
                                className="px-3 py-2 rounded-xl text-sm bg-white border border-[#e8e0d4]"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <RouterLink to="/admin/investor/new">
                        <button className="flex items-center px-6 h-11 rounded-full font-semibold text-sm text-white" style={{ background: "#0e2a1a" }}>
                            <Plus className="w-4 h-4 mr-2" /> Add investor
                        </button>
                    </RouterLink>
                </div>

                <section className="rounded-2xl overflow-x-auto bg-white border border-[#e8e0d4]">
                    <table className="ayf-table min-w-[900px]">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th className="text-center">Invested</th>
                                <th className="text-center">Projects</th>
                                <th className="text-center">Joined</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((inv) => (
                                <tr key={inv.id} className={inv.status === "inactive" ? "opacity-60" : ""}>
                                    <td className="font-medium">{inv.name}</td>
                                    <td className="text-[#5a6b5e]">{inv.email}</td>
                                    <td className="text-[#5a6b5e]">{inv.phone || "—"}</td>
                                    <td className="text-center font-medium">{formatFullCurrency(inv.totalInvested)}</td>
                                    <td className="text-center">{inv.activeProjects}</td>
                                    <td className="text-center text-[#5a6b5e]">{formatLongDate(inv.joinDate)}</td>
                                    <td className="text-center">
                                        {inv.status === "active" ? (
                                            <span className="badge-active">Active</span>
                                        ) : (
                                            <span className="badge-closed">Inactive</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {list.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-[#5a6b5e]">
                                        No investors match.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </DashboardLayout>
    );
}
