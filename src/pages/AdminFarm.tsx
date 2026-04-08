import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const mockFarms = [
    { id: 1, name: "Greenfield Agro Ranch", roiPercentage: 18, targetAmount: 25000000, durationMonths: 8, status: "active", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Sunrise Cassava Farm", roiPercentage: 14, targetAmount: 13500000, durationMonths: 6, status: "funding", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Riverside Poultry Project", roiPercentage: 20, targetAmount: 8000000, durationMonths: 10, status: "closed", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" }
];

function formatFullCurrency(value: number) {
    return "₦" + value.toLocaleString("en-NG", { minimumFractionDigits: 0 });
}

const AdminFarmPage = () => (
    <DashboardLayout userRole="admin">
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <p className="section-tag">Admin › Farms</p>
                <h1 className="page-header-title">Manage Farms</h1>
                <p className="page-header-subtitle">
                    View, edit, and manage all farm opportunities on the platform.
                </p>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
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
                className="rounded-2xl overflow-x-auto"
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
                                <TableCell className="text-center"><span className="font-semibold" style={{ color: "#0e2a1a" }}>{farm.roiPercentage}%</span></TableCell>
                                <TableCell className="text-center"><span className="font-medium" style={{ color: "#0e2a1a" }}>{formatFullCurrency(farm.targetAmount)}</span></TableCell>
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
            </section>
        </div>
    </DashboardLayout>
);

export default AdminFarmPage;
