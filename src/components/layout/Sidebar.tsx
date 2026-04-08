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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    userRole?: "investor" | "admin";
    isOpen?: boolean;
    onClose?: () => void;
}

const investorNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/my-investments", label: "My Investments", icon: FolderOpen },
    { href: "/transactions", label: "Transactions", icon: Receipt },
    { href: "/discover", label: "Discover Farms", icon: Search },
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
    const navItems = userRole === "admin" ? adminNavItems : investorNavItems;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full w-[260px] flex flex-col transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{
                    background: "linear-gradient(180deg, #0e2a1a 0%, #122e1f 100%)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-6">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "#c8903c" }}
                        >
                            <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                AYF
                            </span>
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

                {/* Divider */}
                <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                {/* Role Badge */}
                <div className="px-6 py-4">
                    <span
                        className="text-[10px] font-semibold tracking-[2px] uppercase"
                        style={{ color: "rgba(200,144,60,0.6)" }}
                    >
                        {userRole === "admin" ? "Admin Panel" : "Investor"}
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col px-3 gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "text-white font-semibold"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                )}
                                style={isActive ? {
                                    background: "rgba(200,144,60,0.12)",
                                    borderLeft: "3px solid #c8903c",
                                } : {}}
                            >
                                <Icon
                                    className="w-[18px] h-[18px]"
                                    style={isActive ? { color: "#c8903c" } : {}}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © 2026 African Youth Forum
                    </p>
                </div>
            </aside>
        </>
    );
}
