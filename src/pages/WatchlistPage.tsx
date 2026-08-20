import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { useApp } from "@/lib/store";
import { Heart } from "lucide-react";

export default function WatchlistPage() {
    const { farms, watchlist } = useApp();
    const saved = farms.filter((f) => watchlist.includes(f.id));

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Saved</p>
                    <h1 className="page-header-title">Watchlist</h1>
                    <p className="page-header-subtitle">Farms you are tracking before you commit capital.</p>
                </div>
                {saved.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl bg-white border border-[#e8e0d4]">
                        <Heart className="w-8 h-8 mx-auto mb-3 text-[#c8903c]" />
                        <p className="font-semibold text-lg mb-1">Nothing saved yet</p>
                        <p className="text-[#5a6b5e] mb-4">Tap the heart on any farm card to pin it here.</p>
                        <Link to="/discover" className="text-sm font-semibold text-[#c8903c]">
                            Browse farms →
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {saved.map((farm) => (
                            <FarmCard key={farm.id} farm={farm} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
