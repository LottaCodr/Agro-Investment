import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Users, Banknote, ListChecks, Activity, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatFullCurrency, formatLongDate } from "@/lib/mock-data";

const PAGE_SIZE = 5;

export default function AdminReportsPage() {
    const { farms, investors, transactions } = useApp();
    const [investorSearch, setInvestorSearch] = useState("");
    const [page, setPage] = useState(1);

    const invested = transactions.filter((t) => t.type === "Investment").reduce((s, t) => s + t.amount, 0);
    const revenue = Math.round(invested * 0.025);

    const filteredInvestors = investors
        .filter((inv) => [inv.name, inv.email, inv.phone].join(" ").toLowerCase().includes(investorSearch.toLowerCase()))
        .sort((a, b) => b.totalInvested - a.totalInvested);

    const totalPages = Math.max(1, Math.ceil(filteredInvestors.length / PAGE_SIZE));
    const paged = filteredInvestors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const activities = useMemo(
        () =>
            transactions.slice(0, 6).map((t) => ({
                id: t.id,
                time: t.date,
                type: t.type,
                details: `${formatFullCurrency(t.amount)} · ${t.userName} · ${t.farm}`,
            })),
        [transactions],
    );

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Reports</p>
                    <h1 className="page-header-title">Reports & analytics</h1>
                    <p className="page-header-subtitle">Live numbers from this demo workspace.</p>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatsCard label="Capital invested" value={formatFullCurrency(invested)} icon={<Banknote className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Investors" value={String(investors.length)} icon={<Users className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Opportunities" value={String(farms.length)} icon={<ListChecks className="w-4 h-4 text-[#1a4a2e]" />} />
                    <StatsCard label="Est. platform fee" value={formatFullCurrency(revenue)} icon={<Activity className="w-4 h-4 text-[#1a4a2e]" />} trendLabel="2.5% of volume" />
                </section>

                <div className="flex flex-col lg:flex-row gap-8">
                    <section className="flex-1 rounded-2xl overflow-x-auto bg-white border border-[#e8e0d4]">
                        <header className="px-6 py-4 flex items-center justify-between gap-2 border-b border-[#e8e0d4]">
                            <h2 className="text-lg ayf-heading">Top investors</h2>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2 w-4 h-4 text-[#5a6b5e]" />
                                <input
                                    value={investorSearch}
                                    onChange={(e) => {
                                        setInvestorSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search…"
                                    className="py-1.5 pl-8 pr-3 text-sm rounded-xl bg-[#f7f3ed] border border-[#e8e0d4] w-48"
                                />
                            </div>
                        </header>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#ede5d8]/70">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-center">Invested</TableHead>
                                    <TableHead className="text-center">Projects</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paged.map((inv) => (
                                    <TableRow key={inv.id}>
                                        <TableCell className="font-medium">{inv.name}</TableCell>
                                        <TableCell className="text-[#5a6b5e]">{inv.email}</TableCell>
                                        <TableCell className="text-center">{formatFullCurrency(inv.totalInvested)}</TableCell>
                                        <TableCell className="text-center">{inv.activeProjects}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {totalPages > 1 && (
                            <footer className="px-6 py-3 flex gap-4 items-center justify-end border-t">
                                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-1 rounded-lg border disabled:opacity-40">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-[#5a6b5e]">
                                    Page {page} of {totalPages}
                                </span>
                                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-1 rounded-lg border disabled:opacity-40">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </footer>
                        )}
                    </section>

                    <section className="w-full max-w-md lg:max-w-xs rounded-2xl bg-white border border-[#e8e0d4]">
                        <header className="px-6 py-4 border-b">
                            <h2 className="text-lg ayf-heading">Recent activity</h2>
                        </header>
                        <ul>
                            {activities.map((a) => (
                                <li key={a.id} className="px-6 py-4 border-b last:border-0">
                                    <div className="text-[11px] text-[#5a6b5e]">{formatLongDate(a.time)}</div>
                                    <div className="font-semibold text-sm">{a.type}</div>
                                    <div className="text-xs text-[#5a6b5e]">{a.details}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
