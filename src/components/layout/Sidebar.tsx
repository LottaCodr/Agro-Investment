import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FolderOpen,
    Receipt,
    Search,
    Newspaper,
    Users,
    FileBarChart,
    X,
    Sprout,
    Wallet,
    Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { formatFullCurrency } from "@/lib/mock-data";

interface SidebarProps {
    userRole?: "investor" | "admin";
    isOpen?: boolean;
    onClose?: () => void;
}

const investorNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/discover", label: "Discover Farms", icon: Search },
    { href: "/my-investments", label: "My Investments", icon: FolderOpen },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/watchlist", label: "Watchlist", icon: Heart },
    { href: "/transactions", label: "Transactions", icon: Receipt },
    { href: "/news", label: "News & Updates", icon: Newspaper },
];

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/farms", label: "Farms", icon: Sprout },
    { href: "/admin/investors", label: "Investors", icon: Users },
    { href: "/admin/transactions", label: "Transactions", icon: Receipt },
    { href: "/admin/reports", label: "Reports", icon: FileBarChart },
];

export function Sidebar({ userRole = "investor", isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { walletBalance, watchlist } = useApp();
    const navItems = userRole === "admin" ? adminNavItems : investorNavItems;

    const isActive = (href: string) => {
        if (href === "/admin") return location.pathname === "/admin";
        if (href === "/dashboard") return location.pathname === "/dashboard";
        return location.pathname === href || location.pathname.startsWith(`${href}/`);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full w-[260px] flex flex-col transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}
                style={{
                    background: "linear-gradient(180deg, #0e2a1a 0%, #122e1f 100%)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="flex items-center justify-between px-6 py-6">
                    <Link to="/" className="flex items-center gap-3 group" onClick={onClose}>
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "#c8903c" }}
                        >
                            <span className="text-white font-bold text-sm tracking-wide">AYF</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold text-white/90 tracking-tight">
                                African Youth
                            </span>
                            <span className="text-sm font-semibold" style={{ color: "#c8903c" }}>
                                Forum
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Close Sidebar"
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                <div className="px-6 py-4">
                    <span
                        className="text-[10px] font-semibold tracking-[2px] uppercase"
                        style={{ color: "rgba(200,144,60,0.6)" }}
                    >
                        {userRole === "admin" ? "Admin Panel" : "Investor"}
                    </span>
                </div>

                <nav className="flex-1 flex flex-col px-3 gap-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const extra =
                            item.href === "/watchlist" && watchlist.length > 0 ? watchlist.length : null;

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                    active
                                        ? "text-white font-semibold"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5",
                                )}
                                style={
                                    active
                                        ? {
                                              background: "rgba(200,144,60,0.12)",
                                              borderLeft: "3px solid #c8903c",
                                          }
                                        : { borderLeft: "3px solid transparent" }
                                }
                            >
                                <Icon className="w-[18px] h-[18px]" style={active ? { color: "#c8903c" } : {}} />
                                <span className="flex-1">{item.label}</span>
                                {extra !== null && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/10">
                                        {extra}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {userRole === "investor" && (
                    <div className="mx-4 mb-3 rounded-xl p-4" style={{ background: "rgba(200,144,60,0.1)" }}>
                        <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Wallet</p>
                        <p className="text-white text-lg font-semibold ayf-serif">{formatFullCurrency(walletBalance)}</p>
                        <Link
                            to="/wallet"
                            onClick={onClose}
                            className="text-xs font-medium mt-2 inline-block"
                            style={{ color: "#e8b060" }}
                        >
                            Add funds →
                        </Link>
                    </div>
                )}

                <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © 2026 African Youth Forum
                    </p>
                </div>
            </aside>
        </>
    );
}
