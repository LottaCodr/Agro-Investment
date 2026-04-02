// Install dependencies for this file with:
// npm install @tanstack/react-router lucide-react

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateFundingProgress, type Farm } from "@/lib/mock-data";

interface FarmCardProps {
    farm: Farm;
    variant?: "default" | "compact";
}

// Enhanced InfoPill for bolder contrast and spacing tweaks
function InfoPill({
    label,
    value,
    bold,
}: {
    label: string;
    value: string | number;
    bold?: boolean;
}) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-md ${
                bold ? "bg-[#FFF8E1] text-[#AB8300]" : "bg-muted text-foreground/90"
            } text-[15px] font-medium mr-2 mb-2 whitespace-nowrap`}
            style={bold ? { border: "1px solid #FFD740" } : {}}
        >
            {bold ? (
                <>
                    <span className="font-semibold mr-1">{value}</span>
                    {label}
                </>
            ) : (
                <>
                    <span className="mr-1">{value}</span>
                    {label}
                </>
            )}
        </span>
    );
}

export function FarmCard({ farm, variant = "default" }: FarmCardProps) {
    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);

    const statusStyles: Record<Farm["status"], string> = {
        funding: "bg-yellow-100 text-yellow-800",
        active: "bg-green-100 text-green-800",
        closed: "bg-gray-200 text-gray-500"
    };

    const statusBadge = {
        funding: <Badge className={`text-xs px-2.5 py-0.5 rounded ${statusStyles.funding}`}>Funding</Badge>,
        active: <Badge className={`text-xs px-2.5 py-0.5 rounded ${statusStyles.active}`}>Active</Badge>,
        closed: <Badge className={`text-xs px-2.5 py-0.5 rounded ${statusStyles.closed}`}>Closed</Badge>,
    };

    if (variant === "compact") {
        // Compact stays minimal
        return (
            <div className="card-elevated rounded-xl overflow-hidden border border-border">
                <div className="flex items-center gap-4 p-4">
                    <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {statusBadge[farm.status as keyof typeof statusBadge]}
                        </div>
                        <h3 className="font-semibold text-foreground truncate">{farm.name}</h3>
                        <p className="text-sm text-muted-foreground">{farm.location}</p>
                    </div>
                </div>
                <div className="px-4 pb-4 flex items-center justify-between text-sm text-muted-foreground"></div>
            </div>
        );
    }

    return (
        <div className="card-elevated rounded-xl overflow-hidden border border-border bg-white transition-shadow duration-300 group">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Status badge floats top-left */}
                <div className="absolute top-3 left-3 z-10">
                    {statusBadge[farm.status as keyof typeof statusBadge]}
                </div>
            </div>
            <div className="p-4 pb-3">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-2xl leading-snug text-foreground mb-1">{farm.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent text-muted-foreground">
                        {farm.investorCount} Investors
                    </span>
                </div>
                <p className="text-base text-gray-500 mb-1">{farm.location}</p>
                {/* Info Pills Row */}
                <div className="flex flex-wrap gap-0.5 mb-4">
                    <InfoPill value={farm.acres} label="Acres" bold />
                    <InfoPill value={`${farm.roiPercentage}%`} label="ROI" bold />
                    <InfoPill value={`${farm.durationMonths}`} label="Months" bold />
                    <InfoPill value={farm.harvestTime} label="Harvest" />
                </div>

                {/* Progress bar and label */}
                <div className="mb-3">
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                        <span className="uppercase tracking-wider text-[#A6A6A6]">Funding</span>
                        <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#F0F0F0] overflow-hidden relative">
                        {/* Progress bar */}
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: "#FFC72C"
                            }}
                        ></div>
                        {/* Simple, non-gradient thumb at progress end */}
                        <div
                            className="absolute -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#FFC72C] transition-all duration-500"
                            style={{
                                left: `calc(${progress}% - 8px)`,
                                opacity: progress > 5 ? 1 : 0,
                                zIndex: 2
                            }}
                        ></div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-5">
                    <Link to={`/farm/${farm.id}`} className="w-1/2">
                        <Button
                            className="w-full h-11 border-2 border-[#39A86B] text-[#218641] font-semibold bg-white rounded-lg transition-colors hover:bg-accent focus:outline-none text-base"
                            type="button"
                            variant="outline"
                        >
                            <span className="inline-block font-semibold tracking-tight">View Details</span>
                        </Button>
                    </Link>
                    <Link to={`/farm/${farm.id}`} className="w-1/2">
                        <Button
                            className="w-full h-11 bg-[#218641] text-white font-bold rounded-lg transition-colors hover:brightness-110 focus:outline-none text-base"
                            type="button"
                        >
                            <span className="inline-block font-bold tracking-tight">Invest Now</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
