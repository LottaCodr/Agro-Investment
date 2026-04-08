import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import {
    TrendingUp, Users, Banknote, ListChecks, Activity, Search, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatCurrency(num: number) {
    return "₦" + num.toLocaleString("en-NG", { minimumFractionDigits: 0 });
}

const stats = [
    { label: "Total Amount Invested", value: formatCurrency(50420000), icon: <Banknote className="w-4 h-4" style={{ color: "#1a4a2e" }} />, trend: "+5%", trendLabel: "from last month" },
    { label: "Total Investors", value: "424", icon: <Users className="w-4 h-4" style={{ color: "#1a4a2e" }} />, trend: "+12", trendLabel: "new this month" },
    { label: "Opportunities Created", value: "17", icon: <ListChecks className="w-4 h-4" style={{ color: "#1a4a2e" }} />, trend: "+2", trendLabel: "new this month" },
    { label: "Platform Revenue", value: formatCurrency(2249000), icon: <Activity className="w-4 h-4" style={{ color: "#1a4a2e" }} />, trend: "+3%", trendLabel: "from last month" },
];

const topInvestorsSeed = [
    { id: 1, name: "Bolaji Ibukun", email: "bolaji@domain.com", phone: "+234 8011 320 999", invested: 9700000, projects: 5 },
    { id: 2, name: "Sarah Knox", email: "sarah@domain.com", phone: "+234 9030 444 127", invested: 8300000, projects: 4 },
    { id: 3, name: "Adeoye Mutiu", email: "adeoye@domain.com", phone: "+234 8125 902 341", invested: 7100000, projects: 3 },
    { id: 4, name: "Sarah Akin", email: "sakin@domain.com", phone: "+234 8909 934 188", invested: 4800000, projects: 2 },
    { id: 5, name: "Yusuf Bola", email: "ybola@domain.com", phone: "+234 7012 129 881", invested: 3990000, projects: 2 }
];

const recentActivities = [
    { id: 1, time: "2024-06-15 09:54", type: "New Investment", details: "₦1,200,000 by Sarah Knox (Wheat Rolls Valley)", icon: <Banknote className="w-4 h-4" style={{ color: "#1a4a2e" }} />, color: "rgba(14,42,26,0.06)" },
    { id: 2, time: "2024-06-14 15:23", type: "ROI Paid", details: "₦320,000 to Adeoye Mutiu (Cassava Plantation Co.)", icon: <Activity className="w-4 h-4" style={{ color: "#c8903c" }} />, color: "rgba(200,144,60,0.08)" },
    { id: 3, time: "2024-06-13 18:21", type: "New Investor", details: "Chika Eze joined platform", icon: <Users className="w-4 h-4" style={{ color: "#2d6b47" }} />, color: "rgba(45,107,71,0.06)" },
    { id: 4, time: "2024-06-13 11:11", type: "Investment Withdrawal", details: "₦200,000 withdrawn by Yusuf Bola", icon: <TrendingUp className="w-4 h-4" style={{ color: "#5a6b5e" }} />, color: "rgba(90,107,94,0.06)" }
];

const PAGE_SIZE = 3;

export default function AdminReportsPage() {
    const [investorSearch, setInvestorSearch] = useState("");
    const [page, setPage] = useState(1);

    const filteredInvestors = topInvestorsSeed.filter(inv =>
        [inv.name, inv.email, inv.phone].join(" ").toLowerCase().includes(investorSearch.toLowerCase())
    );

    const totalPages = Math.ceil(filteredInvestors.length / PAGE_SIZE);
    const pagedInvestors = filteredInvestors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setInvestorSearch(e.target.value);
        setPage(1);
    }

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Admin › Reports</p>
                    <h1 className="page-header-title">Reports & Analytics</h1>
                    <p className="page-header-subtitle">
                        Visualize platform performance, key numbers, and leading investors.
                    </p>
                </div>

                {/* Stats */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat) => (
                        <StatsCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} trend={stat.trend} trendLabel={stat.trendLabel} />
                    ))}
                </section>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Top Investors */}
                    <section
                        className="flex-1 rounded-2xl overflow-x-auto"
                        style={{ background: "white", border: "1px solid hsl(34 25% 85%)" }}
                    >
                        <header className="px-6 py-4 flex items-center justify-between flex-wrap gap-2" style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}>
                            <h2
                                className="text-lg font-semibold"
                                style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Top Investors
                            </h2>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2 w-4 h-4" style={{ color: "#5a6b5e" }} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={investorSearch}
                                    onChange={handleSearch}
                                    className="py-1.5 pl-8 pr-3 text-sm rounded-xl focus:outline-none w-48"
                                    style={{ background: "#f7f3ed", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }}
                                />
                            </div>
                        </header>
                        <Table className="w-full min-w-[600px]">
                            <TableHeader>
                                <TableRow style={{ background: "hsl(34 30% 90%)" }}>
                                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Name</TableHead>
                                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Email</TableHead>
                                    <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Total Invested</TableHead>
                                    <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#5a6b5e" }}>Projects</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pagedInvestors.length > 0 ? pagedInvestors.map((inv, idx) => (
                                    <TableRow key={inv.id} className="transition-colors hover:bg-[#f7f3ed]/60" style={{ borderColor: "hsl(34 25% 85%)" }}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(14,42,26,0.06)", color: "#1a4a2e" }}>#{inv.id}</span>
                                                <span className="font-medium" style={{ color: "#0e2a1a" }}>{inv.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ color: "#5a6b5e" }}>{inv.email}</TableCell>
                                        <TableCell className="text-center font-medium" style={{ color: "#0e2a1a" }}>{formatCurrency(inv.invested)}</TableCell>
                                        <TableCell className="text-center" style={{ color: "#0e2a1a" }}>{inv.projects}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8" style={{ color: "#5a6b5e" }}>No investors found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {totalPages > 1 && (
                            <footer className="px-6 py-3 flex gap-4 items-center justify-end" style={{ borderTop: "1px solid hsl(34 25% 85%)", background: "hsl(34 30% 94%)" }}>
                                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="rounded-lg px-2.5 py-1 text-sm font-semibold transition disabled:opacity-40" style={{ border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }}>
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs" style={{ color: "#5a6b5e" }}>Page {page} of {totalPages}</span>
                                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="rounded-lg px-2.5 py-1 text-sm font-semibold transition disabled:opacity-40" style={{ border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }}>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </footer>
                        )}
                    </section>

                    {/* Activity Feed */}
                    <section
                        className="w-full max-w-md lg:max-w-xs flex-shrink-0 rounded-2xl"
                        style={{ background: "white", border: "1px solid hsl(34 25% 85%)" }}
                    >
                        <header className="px-6 py-4" style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}>
                            <h2
                                className="text-lg font-semibold"
                                style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Recent Activity
                            </h2>
                        </header>
                        <ul>
                            {recentActivities.map((a, idx) => (
                                <li
                                    key={a.id}
                                    className="px-6 py-4 flex items-start gap-4 transition-colors hover:bg-[#f7f3ed]/60"
                                    style={{
                                        borderBottom: idx < recentActivities.length - 1 ? "1px solid hsl(34 25% 85%)" : "none",
                                        animation: `slide-up 400ms ${idx * 40}ms both`,
                                    }}
                                >
                                    <span
                                        className="mt-0.5 flex-shrink-0 rounded-xl p-2"
                                        style={{ background: a.color }}
                                    >
                                        {a.icon}
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-[11px] mb-0.5" style={{ color: "#5a6b5e" }}>
                                            {new Date(a.time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                                        </div>
                                        <div className="font-semibold text-sm" style={{ color: "#0e2a1a" }}>{a.type}</div>
                                        <div className="text-xs" style={{ color: "#5a6b5e" }}>{a.details}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
