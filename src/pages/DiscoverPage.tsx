import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useApp } from "@/lib/store";
import type { FarmStatus, RiskLevel } from "@/lib/types";

const categories = ["All", "Funding", "Active", "Closed"] as const;

export default function DiscoverPage() {
    const { farms } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [crop, setCrop] = useState("All");
    const [risk, setRisk] = useState<"All" | RiskLevel>("All");
    const [minRoi, setMinRoi] = useState(0);
    const [sort, setSort] = useState<"featured" | "roi" | "progress" | "min">("featured");

    const crops = useMemo(() => ["All", ...Array.from(new Set(farms.map((f) => f.cropType)))], [farms]);

    const filteredFarms = useMemo(() => {
        const list = farms.filter((farm) => {
            const q = searchTerm.toLowerCase();
            const matchesSearch =
                farm.name.toLowerCase().includes(q) ||
                farm.location.toLowerCase().includes(q) ||
                farm.cropType.toLowerCase().includes(q);
            const matchesCategory =
                activeCategory === "All" || farm.status === (activeCategory.toLowerCase() as FarmStatus);
            const matchesCrop = crop === "All" || farm.cropType === crop;
            const matchesRisk = risk === "All" || farm.riskLevel === risk;
            const matchesRoi = farm.roiPercentage >= minRoi;
            return matchesSearch && matchesCategory && matchesCrop && matchesRisk && matchesRoi;
        });
        const sorted = [...list];
        if (sort === "roi") sorted.sort((a, b) => b.roiPercentage - a.roiPercentage);
        if (sort === "min") sorted.sort((a, b) => a.minInvestment - b.minInvestment);
        if (sort === "progress") {
            sorted.sort(
                (a, b) => b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount,
            );
        }
        return sorted;
    }, [farms, searchTerm, activeCategory, crop, risk, minRoi, sort]);

    const reset = () => {
        setCrop("All");
        setRisk("All");
        setMinRoi(0);
        setSort("featured");
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Browse</p>
                    <h1 className="page-header-title">Discover Farms</h1>
                    <p className="page-header-subtitle">
                        {farms.length} verified projects · filter by crop, risk, and return
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6b5e]" />
                            <Input
                                placeholder="Search name, crop, or city…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 rounded-xl h-10 bg-white"
                            />
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                    style={
                                        activeCategory === cat
                                            ? { background: "#0e2a1a", color: "white" }
                                            : {
                                                  background: "white",
                                                  color: "#5a6b5e",
                                                  border: "1px solid hsl(34 25% 85%)",
                                              }
                                    }
                                >
                                    {cat}
                                </button>
                            ))}
                            <button
                                className="p-2 rounded-xl hover:bg-black/5 border border-[#e8e0d4] bg-white"
                                style={{ color: showFilters ? "#c8903c" : "#5a6b5e" }}
                                onClick={() => setShowFilters((v) => !v)}
                                aria-expanded={showFilters}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="rounded-2xl bg-white border border-[#e8e0d4] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#5a6b5e]">
                                Crop
                                <select
                                    className="mt-1 w-full h-10 rounded-xl border border-[#e8e0d4] px-3 text-sm font-medium text-[#0e2a1a]"
                                    value={crop}
                                    onChange={(e) => setCrop(e.target.value)}
                                >
                                    {crops.map((c) => (
                                        <option key={c}>{c}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#5a6b5e]">
                                Risk
                                <select
                                    className="mt-1 w-full h-10 rounded-xl border border-[#e8e0d4] px-3 text-sm font-medium text-[#0e2a1a] capitalize"
                                    value={risk}
                                    onChange={(e) => setRisk(e.target.value as "All" | RiskLevel)}
                                >
                                    <option>All</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </label>
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#5a6b5e]">
                                Min. ROI ({minRoi}%)
                                <input
                                    type="range"
                                    min={0}
                                    max={25}
                                    value={minRoi}
                                    onChange={(e) => setMinRoi(Number(e.target.value))}
                                    className="mt-3 w-full accent-[#c8903c]"
                                />
                            </label>
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#5a6b5e]">
                                Sort
                                <select
                                    className="mt-1 w-full h-10 rounded-xl border border-[#e8e0d4] px-3 text-sm font-medium text-[#0e2a1a]"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as typeof sort)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="roi">Highest ROI</option>
                                    <option value="progress">Most funded</option>
                                    <option value="min">Lowest minimum</option>
                                </select>
                            </label>
                            <button
                                type="button"
                                onClick={reset}
                                className="sm:col-span-2 lg:col-span-4 text-sm text-[#5a6b5e] inline-flex items-center gap-1 hover:text-[#0e2a1a]"
                            >
                                <X className="w-3.5 h-3.5" /> Reset filters
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-sm text-[#5a6b5e]">{filteredFarms.length} farm{filteredFarms.length === 1 ? "" : "s"}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFarms.map((farm, index) => (
                        <div key={farm.id} className="animate-slide-up" style={{ animationDelay: `${index * 40}ms` }}>
                            <FarmCard farm={farm} />
                        </div>
                    ))}
                </div>

                {filteredFarms.length === 0 && (
                    <div className="text-center py-16 rounded-2xl bg-white border border-[#e8e0d4]">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[#c8903c]/10">
                            <Search className="w-7 h-7 text-[#c8903c]" />
                        </div>
                        <p className="font-semibold text-lg mb-1 text-[#0e2a1a]">No farms match</p>
                        <p className="text-[#5a6b5e]">Try a different crop, risk level, or search term.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
