import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, DollarSign, Plus } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const mockInvestors = [
    { id: 1, name: "Bolaji Ibukun", email: "bolajiibukun@email.com", phone: "+234 813 123 1234", totalInvested: 20000, activeProjects: 4, joinDate: "2023-09-15", status: "active" },
    { id: 2, name: "Adeoye Mutiu", email: "adeoyemutiu@email.com", phone: "+234 802 555 8162", totalInvested: 8800, activeProjects: 2, joinDate: "2023-11-07", status: "active" },
    { id: 3, name: "Sarah Knox", email: "sarah.knox@email.com", phone: "+44 7950 200 100", totalInvested: 16250, activeProjects: 3, joinDate: "2024-01-10", status: "inactive" },
    { id: 4, name: "Ayanda Lawal", email: "ayanda.lawal@email.com", phone: "+234 801 998 7717", totalInvested: 10400, activeProjects: 1, joinDate: "2024-03-01", status: "active" },
];

const totalInvestors = mockInvestors.length;
const totalVolume = mockInvestors.reduce((sum, inv) => sum + inv.totalInvested, 0);

function formatCurrency(n: number) {
    return "₦" + n.toLocaleString();
}

export default function AdminInvestorPage() {
    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Admin › Investors</p>
                    <h1 className="page-header-title">All Investors</h1>
                    <p className="page-header-subtitle">
                        Manage and review all users who have invested on the platform.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <StatsCard label="Total Investors" value={totalInvestors.toLocaleString()} icon={<Users className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Total Volume Invested" value={formatCurrency(totalVolume)} icon={<DollarSign className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                    <StatsCard label="Active Investors" value={mockInvestors.filter(i => i.status === "active").length.toString()} icon={<Users className="w-4 h-4" style={{ color: "#1a4a2e" }} />} />
                </div>

                {/* Filters + Add */}
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex flex-col">
                            <label htmlFor="search" className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#5a6b5e" }}>Investor</label>
                            <input className="px-3 py-2 rounded-xl text-sm focus:outline-none min-w-[180px]" style={{ background: "white", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }} type="text" id="search" placeholder="Search by name or email" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="joined-from" className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#5a6b5e" }}>Joined From</label>
                            <input className="px-3 py-2 rounded-xl text-sm focus:outline-none min-w-[120px]" style={{ background: "white", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }} type="date" id="joined-from" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#5a6b5e" }}>Status</label>
                            <select className="px-3 py-2 rounded-xl text-sm focus:outline-none min-w-[110px]" style={{ background: "white", border: "1px solid hsl(34 25% 85%)", color: "#0e2a1a" }} id="status">
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <RouterLink to="/admin/investor/new">
                        <button
                            className="flex items-center px-6 h-11 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:brightness-110"
                            style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Investor
                        </button>
                    </RouterLink>
                </div>

                {/* Table */}
                <section
                    className="rounded-2xl overflow-x-auto"
                    style={{ background: "white", border: "1px solid hsl(34 25% 85%)" }}
                >
                    <header className="px-6 py-4" style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}>
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            Investor Records
                        </h2>
                    </header>
                    <table className="ayf-table min-w-[900px]">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th className="text-center">Total Invested</th>
                                <th className="text-center">Projects</th>
                                <th className="text-center">Joined</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInvestors.map((inv, idx) => (
                                <tr
                                    key={inv.id}
                                    className={inv.status === "inactive" ? "opacity-60" : ""}
                                    style={{ animationDelay: `${idx * 35}ms` }}
                                >
                                    <td className="font-medium" style={{ color: "#0e2a1a" }}>{inv.name}</td>
                                    <td style={{ color: "#5a6b5e" }}>{inv.email}</td>
                                    <td style={{ color: "#5a6b5e" }}>{inv.phone}</td>
                                    <td className="text-center font-medium" style={{ color: "#0e2a1a" }}>{formatCurrency(inv.totalInvested)}</td>
                                    <td className="text-center" style={{ color: "#0e2a1a" }}>{inv.activeProjects}</td>
                                    <td className="text-center" style={{ color: "#5a6b5e" }}>
                                        {new Date(inv.joinDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                                    </td>
                                    <td className="text-center">
                                        {inv.status === "active" ? (
                                            <span className="badge-active">Active</span>
                                        ) : (
                                            <span className="badge-closed">Inactive</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </DashboardLayout>
    );
}
