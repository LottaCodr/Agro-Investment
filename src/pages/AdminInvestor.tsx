import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";

const mockInvestors = [
  {
    id: 1,
    name: "Bolaji Ibukun",
    email: "bolajiibukun@email.com",
    phone: "+234 813 123 1234",
    totalInvested: 20000,
    activeProjects: 4,
    joinDate: "2023-09-15",
    status: "active",
  },
  {
    id: 2,
    name: "Adeoye Mutiu",
    email: "adeoyemutiu@email.com",
    phone: "+234 802 555 8162",
    totalInvested: 8800,
    activeProjects: 2,
    joinDate: "2023-11-07",
    status: "active",
  },
  {
    id: 3,
    name: "Sarah Knox",
    email: "sarah.knox@email.com",
    phone: "+44 7950 200 100",
    totalInvested: 16250,
    activeProjects: 3,
    joinDate: "2024-01-10",
    status: "inactive",
  },
  {
    id: 4,
    name: "Ayanda Lawal",
    email: "ayanda.lawal@email.com",
    phone: "+234 801 998 7717",
    totalInvested: 10400,
    activeProjects: 1,
    joinDate: "2024-03-01",
    status: "active",
  },
];
const totalInvestors = mockInvestors.length;
const totalVolume = mockInvestors.reduce((sum, inv) => sum + inv.totalInvested, 0);

function formatCurrency(n: number) {
  return "₦" + n.toLocaleString();
}

export default function AdminInvestorPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8 animate-fade-in max-w-screen-2xl mx-auto px-4 mb-10">
        {/* Page hierarchy */}
        <header className="pt-3 mb-2 flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">All Investors</h1>
          <p className="text-base text-muted-foreground">
            Manage and review all users who have invested on the platform.
          </p>
        </header>

        {/* Stats top cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            label="Total Investors"
            value={totalInvestors.toLocaleString()}
            icon={<Users className="w-5 h-5 text-primary" />}
          />
          <StatsCard
            label="Total Volume Invested"
            value={formatCurrency(totalVolume)}
            icon={<DollarSign className="w-5 h-5 text-primary" />}
          />
          <StatsCard
            label="Active Investors"
            value={mockInvestors.filter(i => i.status === "active").length.toString()}
            icon={<Users className="w-5 h-5 text-primary" />}
          />
        </div>

        {/* Filters + Add button row */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col">
              <label htmlFor="search" className="text-xs text-muted-foreground mb-1">Investor</label>
              <input
                className="border border-border rounded-lg px-3 py-2 bg-card text-sm focus:outline-none focus:border-primary min-w-[140px]"
                type="text"
                id="search"
                placeholder="Search by name or email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="joined-from" className="text-xs text-muted-foreground mb-1">Joined From</label>
              <input
                className="border border-border rounded-lg px-3 py-2 bg-card text-sm focus:outline-none focus:border-primary min-w-[120px]"
                type="date"
                id="joined-from"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="joined-to" className="text-xs text-muted-foreground mb-1">Joined To</label>
              <input
                className="border border-border rounded-lg px-3 py-2 bg-card text-sm focus:outline-none focus:border-primary min-w-[120px]"
                type="date"
                id="joined-to"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status" className="text-xs text-muted-foreground mb-1">Status</label>
              <select
                className="border border-border rounded-lg px-3 py-2 bg-card text-sm focus:outline-none focus:border-primary min-w-[110px]"
                id="status"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <RouterLink to="/admin/investor/new" className="self-end md:self-auto">
            <Button
              className="flex items-center px-5 h-11 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              style={{ minWidth: 180, fontSize: "1rem" }}
              variant="default"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Add New Investor</span>
            </Button>
          </RouterLink>
        </div>

        {/* Investors table section */}
        <section className="bg-card rounded-2xl border border-border overflow-x-auto">
          <header className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Investor Records</h2>
          </header>
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">Phone</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground">Total Invested</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground">Active Projects</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground">Joined</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInvestors.map((inv, idx) => (
                <tr key={inv.id}
                    className={"border-t border-border" + (inv.status === "inactive" ? " opacity-60" : "")}
                    style={{ animationDelay: `${idx * 35}ms` }}>
                  <td className="px-6 py-4 font-medium text-foreground">{inv.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.phone}</td>
                  <td className="px-6 py-4 text-center">{formatCurrency(inv.totalInvested)}</td>
                  <td className="px-6 py-4 text-center">{inv.activeProjects}</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">
                    {new Date(inv.joinDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inv.status === "active" ? (
                      <span className="border border-green-500 px-2 py-1 rounded-full text-xs text-green-700 bg-green-100/80 font-medium">Active</span>
                    ) : (
                      <span className="border border-zinc-400 px-2 py-1 rounded-full text-xs text-zinc-700 bg-zinc-100/80 font-medium">Inactive</span>
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
