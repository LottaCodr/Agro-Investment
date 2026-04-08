import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { mockFarms } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = ["All", "Funding", "Active", "Closed"];

export default function DiscoverPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredFarms = mockFarms.filter(farm => {
        const matchesSearch =
            farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            farm.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || farm.status === activeCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Browse</p>
                    <h1 className="page-header-title">Discover Farms</h1>
                    <p className="page-header-subtitle">
                        Find and invest in verified agricultural projects across Africa
                    </p>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: "#5a6b5e" }}
                        />
                        <Input
                            placeholder="Search farms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 rounded-xl h-10"
                            style={{
                                background: "white",
                                borderColor: "hsl(34 25% 85%)",
                            }}
                        />
                    </div>

                    {/* Category Chips */}
                    <div className="flex items-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                                style={activeCategory === cat ? {
                                    background: "#0e2a1a",
                                    color: "white",
                                } : {
                                    background: "white",
                                    color: "#5a6b5e",
                                    border: "1px solid hsl(34 25% 85%)",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                        <button
                            className="p-2 rounded-xl transition-colors hover:bg-black/5"
                            style={{ color: "#5a6b5e" }}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Farm Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFarms.map((farm, index) => (
                        <div
                            key={farm.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <FarmCard farm={farm} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredFarms.length === 0 && (
                    <div
                        className="text-center py-16 rounded-2xl"
                        style={{
                            background: "white",
                            border: "1px solid hsl(34 25% 85%)",
                        }}
                    >
                        <div
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                            style={{ background: "rgba(200,144,60,0.08)" }}
                        >
                            <Search className="w-7 h-7" style={{ color: "#c8903c" }} />
                        </div>
                        <p className="font-semibold text-lg mb-1" style={{ color: "#0e2a1a" }}>
                            No farms found
                        </p>
                        <p style={{ color: "#5a6b5e" }}>
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
