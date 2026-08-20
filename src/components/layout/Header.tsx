import { Bell, User, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { useApp } from "@/lib/store";

interface HeaderProps {
    onMenuClick?: () => void;
}

function getBreadcrumb(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [{ label: "Dashboard", href: "/dashboard" }];
    return segments.map((seg, i) => ({
        label: seg.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        href: "/" + segments.slice(0, i + 1).join("/"),
    }));
}

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${Math.max(1, mins)}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export function Header({ onMenuClick }: HeaderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, notifications, unreadCount, markNotificationRead, markAllNotificationsRead, signOut, updateProfile } =
        useApp();
    const breadcrumb = getBreadcrumb(location.pathname);
    const firstName = user?.name.split(" ")[0] ?? "there";
    const recent = notifications.slice(0, 4);

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

                <nav className="hidden sm:flex items-center gap-1 text-sm">
                    {breadcrumb.map((crumb, i) => (
                        <span key={crumb.href} className="flex items-center gap-1">
                            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
                            {i === breadcrumb.length - 1 ? (
                                <span className="font-semibold truncate max-w-[180px]" style={{ color: "#0e2a1a" }}>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative group rounded-xl hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#c8903c]"
                            aria-label="Show notifications"
                        >
                            <Bell className="w-[18px] h-[18px] transition-colors" style={{ color: "#5a6b5e" }} />
                            {unreadCount > 0 && (
                                <span
                                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center border-2 leading-none"
                                    style={{
                                        background: "#c8903c",
                                        color: "white",
                                        borderColor: "#f7f3ed",
                                    }}
                                >
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-80 p-0 rounded-xl border"
                        style={{ borderColor: "hsl(34 25% 85%)" }}
                    >
                        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(34 25% 85%)" }}>
                            <span className="font-semibold text-base" style={{ color: "#0e2a1a" }}>
                                Notifications
                            </span>
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    className="text-xs font-medium"
                                    style={{ color: "#c8903c" }}
                                    onClick={markAllNotificationsRead}
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>
                        {recent.length === 0 && (
                            <div className="px-4 py-8 text-sm text-center" style={{ color: "#5a6b5e" }}>
                                You are all caught up.
                            </div>
                        )}
                        {recent.map((n) => (
                            <DropdownMenuItem
                                key={n.id}
                                className="py-3 px-4 cursor-pointer"
                                onClick={() => {
                                    markNotificationRead(n.id);
                                    if (n.href) navigate(n.href);
                                }}
                            >
                                <div className="flex flex-col gap-0.5 w-full">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-semibold" style={{ color: "#0e2a1a" }}>
                                            {n.title}
                                        </span>
                                        {!n.read && (
                                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#c8903c" }} />
                                        )}
                                    </div>
                                    <span className="text-xs" style={{ color: "#5a6b5e" }}>
                                        {n.message}
                                    </span>
                                    <span className="text-[10px] mt-0.5" style={{ color: "#8a948c" }}>
                                        {timeAgo(n.createdAt)}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="justify-center font-semibold cursor-pointer"
                            style={{ color: "#c8903c" }}
                            onClick={() => navigate("/notifications")}
                        >
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="flex items-center gap-2.5 pl-3 pr-1 py-1 rounded-xl transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#c8903c]"
                            aria-label="Profile menu"
                        >
                            <div className="hidden sm:flex flex-col items-end leading-tight mr-0.5">
                                <span className="text-xs font-medium" style={{ color: "#5a6b5e" }}>
                                    Welcome back
                                </span>
                                <span className="text-sm font-bold ayf-serif" style={{ color: "#0e2a1a" }}>
                                    {firstName}
                                </span>
                            </div>
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                                style={{
                                    background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)",
                                    border: "2px solid #c8903c",
                                }}
                            >
                                {user?.name
                                    .split(" ")
                                    .map((p) => p[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase() ?? <User className="w-4 h-4" />}
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-52 p-0 rounded-xl border"
                        style={{ borderColor: "hsl(34 25% 85%)" }}
                    >
                        <DropdownMenuItem className="px-4 py-3 cursor-pointer" onClick={() => navigate("/profile")}>
                            Profile Settings
                        </DropdownMenuItem>
                        {user?.role === "investor" ? (
                            <DropdownMenuItem
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => {
                                    flushSync(() => updateProfile({ role: "admin" }));
                                    navigate("/admin");
                                }}
                            >
                                Switch to Admin
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => {
                                    flushSync(() => updateProfile({ role: "investor" }));
                                    navigate("/dashboard");
                                }}
                            >
                                Investor view
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="px-4 py-3 text-destructive font-medium cursor-pointer"
                            onClick={() => {
                                signOut();
                                navigate("/auth");
                            }}
                        >
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
