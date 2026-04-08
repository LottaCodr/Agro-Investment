import { Bell, User, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
    userName?: string;
    notificationCount?: number;
    onMenuClick?: () => void;
}

// Simple breadcrumb generator from pathname
function getBreadcrumb(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [{ label: "Dashboard", href: "/dashboard" }];
    return segments.map((seg, i) => ({
        label: seg.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        href: "/" + segments.slice(0, i + 1).join("/"),
    }));
}

export function Header({ userName = "Bami", notificationCount = 9, onMenuClick }: HeaderProps) {
    const location = useLocation();
    const breadcrumb = getBreadcrumb(location.pathname);

    return (
        <header
            className="sticky top-0 z-40 h-16 flex items-center justify-between px-6"
            style={{
                background: "rgba(247,243,237,0.92)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(14,42,26,0.06)",
            }}
        >
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" style={{ color: "#0e2a1a" }} />
                </button>

                {/* Breadcrumb */}
                <nav className="hidden sm:flex items-center gap-1 text-sm">
                    {breadcrumb.map((crumb, i) => (
                        <span key={crumb.href} className="flex items-center gap-1">
                            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
                            {i === breadcrumb.length - 1 ? (
                                <span className="font-semibold" style={{ color: "#0e2a1a" }}>
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    to={crumb.href}
                                    className="font-medium transition-colors hover:opacity-80"
                                    style={{ color: "#5a6b5e" }}
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative group rounded-xl hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#c8903c]"
                            aria-label="Show notifications"
                        >
                            <Bell className="w-[18px] h-[18px] transition-colors" style={{ color: "#5a6b5e" }} />
                            {notificationCount > 0 && (
                                <span
                                    className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] text-[10px] font-bold rounded-full flex items-center justify-center border-2 leading-none select-none"
                                    style={{
                                        background: "#c8903c",
                                        color: "white",
                                        borderColor: "#f7f3ed",
                                    }}
                                >
                                    {notificationCount > 9 ? "9+" : notificationCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl border" style={{ borderColor: "hsl(34 25% 85%)" }}>
                        <div className="px-4 py-3 border-b" style={{ borderColor: "hsl(34 25% 85%)" }}>
                            <span className="font-semibold text-base" style={{ color: "#0e2a1a" }}>Notifications</span>
                        </div>
                        <DropdownMenuItem className="py-3 px-4">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold" style={{ color: "#0e2a1a" }}>
                                    Investment Confirmed
                                </span>
                                <span className="text-xs" style={{ color: "#5a6b5e" }}>
                                    Your investment in <span className="font-medium" style={{ color: "#1a4a2e" }}>Green Palm Trees Farm</span> is confirmed.
                                </span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-3 px-4">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold" style={{ color: "#0e2a1a" }}>
                                    ROI Payout
                                </span>
                                <span className="text-xs" style={{ color: "#5a6b5e" }}>
                                    You received <span className="font-medium">$500</span> ROI from <span className="font-medium">Wheat Farm.</span>
                                </span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center font-semibold cursor-pointer" style={{ color: "#c8903c" }}>
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="flex items-center gap-2.5 pl-3 pr-1 py-1 rounded-xl transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#c8903c]"
                            aria-label="Profile menu"
                        >
                            <div className="flex flex-col items-end leading-tight mr-0.5">
                                <span className="text-xs font-medium" style={{ color: "#5a6b5e" }}>
                                    Welcome back
                                </span>
                                <span
                                    className="text-sm font-bold"
                                    style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    {userName}
                                </span>
                            </div>
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)",
                                    border: "2px solid #c8903c",
                                }}
                            >
                                <User className="w-4 h-4 text-white" />
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 p-0 rounded-xl border" style={{ borderColor: "hsl(34 25% 85%)" }}>
                        <DropdownMenuItem className="px-4 py-3">
                            <Link to="/profile" className="w-full font-medium" style={{ color: "#0e2a1a" }}>
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-4 py-3">
                            <Link to="/admin" className="w-full font-medium" style={{ color: "#0e2a1a" }}>
                                Admin Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="px-4 py-3 text-destructive font-medium">
                            <Link to="/auth" className="w-full text-destructive">
                                Sign Out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
