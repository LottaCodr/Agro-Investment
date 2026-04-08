import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { calculateFundingProgress, type Farm } from "@/lib/mock-data";

interface FarmCardProps {
    farm: Farm;
    variant?: "default" | "compact";
}

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
            className={bold ? "info-pill" : "info-pill-neutral"}
            style={{ fontSize: "13px" }}
        >
            <span className={bold ? "font-semibold mr-1" : "mr-1"}>{value}</span>
            {label}
        </span>
    );
}

export function FarmCard({ farm, variant = "default" }: FarmCardProps) {
    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);

    const statusBadge = {
        funding: (
            <Badge className="badge-funding text-[11px]">
                Funding
            </Badge>
        ),
        active: (
            <Badge className="badge-active text-[11px]">
                Active
            </Badge>
        ),
        closed: (
            <Badge className="badge-closed text-[11px]">
                Closed
            </Badge>
        ),
    };

    if (variant === "compact") {
        return (
            <div className="card-premium p-4">
                <div className="flex items-center gap-4">
                    <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {statusBadge[farm.status as keyof typeof statusBadge]}
                        </div>
                        <h3 className="font-semibold truncate" style={{ color: "#0e2a1a" }}>{farm.name}</h3>
                        <p className="text-sm flex items-center gap-1" style={{ color: "#5a6b5e" }}>
                            <MapPin className="w-3 h-3" />
                            {farm.location}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card-premium group">
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, transparent 50%, rgba(14,42,26,0.15) 100%)",
                    }}
                />
                <div className="absolute top-3 left-3 z-10">
                    {statusBadge[farm.status as keyof typeof statusBadge]}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 pb-4">
                <div className="flex items-start justify-between mb-1">
                    <h3
                        className="font-semibold text-xl leading-snug"
                        style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                    >
                        {farm.name}
                    </h3>
                    <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full ml-2 flex-shrink-0"
                        style={{
                            background: "rgba(14,42,26,0.06)",
                            color: "#1a4a2e",
                        }}
                    >
                        {farm.investorCount} Investors
                    </span>
                </div>

                <p className="text-sm flex items-center gap-1 mb-3" style={{ color: "#5a6b5e" }}>
                    <MapPin className="w-3 h-3" />
                    {farm.location}
                </p>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    <InfoPill value={farm.acres} label="Acres" bold />
                    <InfoPill value={`${farm.roiPercentage}%`} label="ROI" bold />
                    <InfoPill value={`${farm.durationMonths}`} label="Months" bold />
                    <InfoPill value={farm.harvestTime} label="Harvest" />
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                        <span className="uppercase tracking-[1px]" style={{ color: "#5a6b5e" }}>
                            Funding
                        </span>
                        <span style={{ color: "#c8903c" }}>{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden relative" style={{ background: "#ede5d8" }}>
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #c8903c, #e8b060)",
                            }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 mt-4">
                    <Link to={`/farm/${farm.id}`} className="w-1/2">
                        <Button
                            className="w-full h-10 rounded-lg text-sm font-semibold transition-all duration-200 btn-ayf-outline"
                            type="button"
                            variant="outline"
                        >
                            View Details
                        </Button>
                    </Link>
                    <Link to={`/farm/${farm.id}`} className="w-1/2">
                        <Button
                            className="w-full h-10 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                            type="button"
                            style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                        >
                            Invest Now
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
