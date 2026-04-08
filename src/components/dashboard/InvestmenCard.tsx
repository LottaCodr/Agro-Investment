import { MapPin } from "lucide-react";
import type { Investment } from "@/lib/mock-data";

interface InvestmentCardProps {
    investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
    const farm = investment.farm;

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
                {/* Days Remaining Badge */}
                <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{
                        background: "rgba(200,144,60,0.9)",
                        color: "white",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {investment.daysRemaining} Days Left
                </div>
            </div>

            {/* Body */}
            <div className="p-5 pb-4">
                <h3
                    className="font-semibold text-xl leading-snug mb-1"
                    style={{
                        color: "#0e2a1a",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                    }}
                >
                    {farm.name}
                </h3>
                <p className="text-sm flex items-center gap-1 mb-3" style={{ color: "#5a6b5e" }}>
                    <MapPin className="w-3 h-3" />
                    {farm.location}
                </p>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {farm.acres && (
                        <span className="info-pill" style={{ fontSize: "13px" }}>
                            <span className="font-semibold mr-1">{farm.acres}</span>Acres
                        </span>
                    )}
                    <span className="info-pill" style={{ fontSize: "13px" }}>
                        <span className="font-semibold mr-1">{farm.roiPercentage}%</span>ROI
                    </span>
                    <span className="info-pill" style={{ fontSize: "13px" }}>
                        <span className="font-semibold mr-1">{farm.durationMonths}</span>Months
                    </span>
                    {farm.harvestTime && (
                        <span className="info-pill-neutral" style={{ fontSize: "13px" }}>
                            <span className="mr-1">{farm.harvestTime}</span>Harvest
                        </span>
                    )}
                </div>

                {/* Progress */}
                <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                        <span className="uppercase tracking-[1px]" style={{ color: "#5a6b5e" }}>
                            Cycle Progress
                        </span>
                        <span style={{ color: "#c8903c" }}>{investment.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#ede5d8" }}>
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${investment.progress}%`,
                                background: "linear-gradient(90deg, #c8903c, #e8b060)",
                            }}
                        />
                    </div>
                </div>

                {/* Amounts */}
                <div className="flex items-center justify-between text-xs mb-4 pt-1">
                    <span>
                        <span className="font-bold" style={{ color: "#c8903c" }}>
                            ${investment.amount.toLocaleString()}
                        </span>{" "}
                        <span style={{ color: "#5a6b5e" }}>invested</span>
                    </span>
                    <span>
                        <span className="font-bold" style={{ color: "#1a4a2e" }}>
                            ${investment.expectedReturn.toLocaleString()}
                        </span>{" "}
                        <span style={{ color: "#5a6b5e" }}>expected</span>
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                    <button
                        className="flex-1 h-10 rounded-lg text-sm font-semibold transition-all duration-200 btn-ayf-outline"
                        type="button"
                    >
                        View Details
                    </button>
                    <button
                        className="flex-1 h-10 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                        type="button"
                        style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                    >
                        Invest Again
                    </button>
                </div>
            </div>
        </div>
    );
}
