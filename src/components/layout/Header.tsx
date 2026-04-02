import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HeaderProps {
    userName?: string;
    notificationCount?: number;
    onMenuClick?: () => void;
}

export function Header({ userName = "Bami", notificationCount = 9, onMenuClick }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-card/80 border-b border-border flex items-center justify-between px-6 backdrop-blur-md">
            <div className="flex items-center gap-4 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
                {/* Logo added from Sidebar */}
                <Link to="/" className="flex items-center gap-2 group mr-2">
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
                <div className="flex flex-col ml-4">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                        Welcome back
                    </span>
                    <h1 className="text-xl font-bold text-foreground truncate max-w-[120px] md:max-w-[220px]">
                        {userName}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:bg-muted/60"
                            aria-label="Show notifications"
                        >
                            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            {notificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-card leading-none select-none">
                                    {notificationCount > 9 ? "9+" : notificationCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0">
                        <div className="px-4 py-3 border-b border-border">
                            <span className="font-semibold text-foreground text-base">Notifications</span>
                        </div>
                        <DropdownMenuItem className="py-3 px-4 hover:bg-muted/70">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[15px] font-semibold text-foreground">
                                    Investment Confirmed
                                </span>
                                <span className="text-xs text-muted-foreground">Your investment in <span className="font-medium text-primary">Green Palm Trees Farm</span> is confirmed.</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-3 px-4 hover:bg-muted/70">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[15px] font-semibold text-foreground">
                                    ROI Payout
                                </span>
                                <span className="text-xs text-muted-foreground">You received <span className="font-medium">$500</span> ROI from <span className="font-medium">Wheat Farm.</span></span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary font-semibold hover:bg-muted/70 cursor-pointer">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full border border-border p-0 w-10 h-10 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            aria-label="Profile menu"
                        >
                            <User className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 p-0">
                        <DropdownMenuItem className="px-4 py-3 hover:bg-muted/70">
                            <Link to="/profile" className="w-full font-medium text-foreground">
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-4 py-3 hover:bg-muted/70">
                            <Link to="/admin" className="w-full font-medium text-foreground">
                                Admin Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="px-4 py-3 text-destructive font-medium hover:bg-destructive/10">
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
