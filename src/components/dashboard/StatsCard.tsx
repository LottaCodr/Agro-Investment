import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    label: string;
    value: string;
    trend?: string;
    trendLabel?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function StatsCard({
    label,
    value,
    trend,
    trendLabel,
    icon,
    className,
}: StatsCardProps) {
    const isPositive = trend?.startsWith("+");

    return (
        <div
            className={cn(
                "stat-card px-6 py-5 flex flex-col items-start group",
                className
            )}
        >
            <div className="flex items-center gap-2.5 mb-3">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(14,42,26,0.06)" }}
                >
                    {icon || <TrendingUp className="w-4 h-4" style={{ color: "#1a4a2e" }} />}
                </div>
                <span
                    className="text-[11px] font-semibold tracking-[1.2px] uppercase"
                    style={{ color: "#5a6b5e" }}
                >
                    {label}
                </span>
            </div>
            <span
                className="text-3xl font-bold leading-tight"
                style={{
                    color: "#0e2a1a",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                }}
            >
                {value}
            </span>
            {trend && (
                <span className="mt-2 flex items-center gap-1.5">
                    <span
                        className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            isPositive
                                ? "text-white"
                                : ""
                        )}
                        style={isPositive ? {
                            background: "linear-gradient(135deg, #1a4a2e, #2d6b47)",
                        } : { color: "#5a6b5e" }}
                    >
                        {trend}
                    </span>
                    <span className="text-xs font-normal" style={{ color: "#5a6b5e" }}>
                        {trendLabel}
                    </span>
                </span>
            )}
        </div>
    );
}
