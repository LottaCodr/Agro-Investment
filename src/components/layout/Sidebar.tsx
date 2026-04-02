import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FolderOpen,
    Receipt,
    Search,
    Newspaper,
    Users,
    FileBarChart,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    userRole?: "investor" | "admin";
    isOpen?: boolean;
    onClose?: () => void;
}

const investorNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/my-investments", label: "My Investment", icon: FolderOpen },
    { href: "/transactions", label: "Transactions", icon: Receipt },
    { href: "/discover", label: "Discover Farms", icon: Search },
    { href: "/news", label: "News & Updates", icon: Newspaper },
];

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/farms", label: "Farms", icon: FolderOpen },
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
                    className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full w-[236px] bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                {/* <div className="flex items-center justify-between px-6 py-7 border-b border-sidebar-border">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-base tracking-wide">AYF</span>
                        </div>
                        <div className="flex flex-col leading-tight ml-1">
                            <span className="text-base font-extrabold text-foreground">
                                African Youth
                            </span>
                            <span className="text-base font-extrabold text-primary">
                                Forum
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 hover:bg-muted rounded"
                        aria-label="Close Sidebar"
                        tabIndex={0}
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div> */}

                {/* Navigation */}
                <nav className="flex-1 flex flex-col px-2 py-6 gap-0">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-none font-medium text-sm transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                                        : "text-muted-foreground hover:bg-muted",
                                    "mb-1"
                                )}
                                style={{ boxShadow: 'none', backgroundImage: 'none' }}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-sidebar-border">
                    <p className="text-xs text-muted-foreground font-semibold tracking-tight">
                        © 2025 African Youth Forum
                    </p>
                </div>
            </aside>
        </>
    );
}
