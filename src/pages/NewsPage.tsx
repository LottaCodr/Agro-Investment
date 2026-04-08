import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockFarms } from "@/lib/mock-data";
import { Calendar, ArrowRight } from "lucide-react";

export default function NewsPage() {
    const updates = [
        {
            id: 1,
            title: "Green Palm Trees Farm reaches 50% funding milestone",
            date: "Dec 15, 2024",
            excerpt: "Our flagship palm tree project has attracted over 125 investors and is on track to meet its funding goal.",
            image: mockFarms[0].image,
            tag: "Milestone",
        },
        {
            id: 2,
            title: "New Cassava Farm launching in January 2025",
            date: "Dec 12, 2024",
            excerpt: "Exciting new investment opportunity in sustainable cassava production coming soon to the platform.",
            image: mockFarms[2].image,
            tag: "Announcement",
        },
        {
            id: 3,
            title: "Q3 2024 ROI payouts completed",
            date: "Dec 1, 2024",
            excerpt: "All scheduled ROI payouts for Q3 investments have been successfully processed and distributed to investors.",
            image: mockFarms[1].image,
            tag: "Payout",
        },
    ];

    const tagStyles: Record<string, { bg: string; color: string; border: string }> = {
        Milestone: { bg: "rgba(200,144,60,0.1)", color: "#c8903c", border: "rgba(200,144,60,0.25)" },
        Announcement: { bg: "rgba(14,42,26,0.06)", color: "#1a4a2e", border: "rgba(14,42,26,0.15)" },
        Payout: { bg: "rgba(45,107,71,0.08)", color: "#2d6b47", border: "rgba(45,107,71,0.2)" },
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">Stay Informed</p>
                    <h1 className="page-header-title">News & Updates</h1>
                    <p className="page-header-subtitle">
                        Stay informed about farm progress and platform news.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {updates.map((update, index) => (
                        <article
                            key={update.id}
                            className="card-premium group animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={update.image}
                                    alt={update.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(180deg, transparent 40%, rgba(14,42,26,0.25) 100%)",
                                    }}
                                />
                                {/* Tag */}
                                <div
                                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold"
                                    style={{
                                        background: tagStyles[update.tag]?.bg || "rgba(14,42,26,0.06)",
                                        color: tagStyles[update.tag]?.color || "#1a4a2e",
                                        border: `1px solid ${tagStyles[update.tag]?.border || "rgba(14,42,26,0.15)"}`,
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    {update.tag}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Calendar className="w-3.5 h-3.5" style={{ color: "#c8903c" }} />
                                    <p className="text-xs font-medium" style={{ color: "#5a6b5e" }}>
                                        {update.date}
                                    </p>
                                </div>
                                <h3
                                    className="font-semibold text-lg leading-snug mb-2 line-clamp-2"
                                    style={{
                                        color: "#0e2a1a",
                                        fontFamily: "'Cormorant Garamond', serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    {update.title}
                                </h3>
                                <p className="text-sm line-clamp-3 mb-4" style={{ color: "#5a6b5e" }}>
                                    {update.excerpt}
                                </p>
                                <button
                                    className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                                    style={{ color: "#c8903c" }}
                                >
                                    Read more
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
