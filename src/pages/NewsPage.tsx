import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/store";
import { useMemo, useState } from "react";

export default function NewsPage() {
    const { news } = useApp();
    const [tag, setTag] = useState("All");
    const tags = useMemo(() => ["All", ...Array.from(new Set(news.map((n) => n.tag)))], [news]);
    const list = tag === "All" ? news : news.filter((n) => n.tag === tag);

    const tagStyles: Record<string, { bg: string; color: string }> = {
        Milestone: { bg: "rgba(200,144,60,0.1)", color: "#c8903c" },
        Announcement: { bg: "rgba(14,42,26,0.06)", color: "#1a4a2e" },
        Payout: { bg: "rgba(45,107,71,0.08)", color: "#2d6b47" },
        Update: { bg: "rgba(14,42,26,0.06)", color: "#1a4a2e" },
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Stay informed</p>
                    <h1 className="page-header-title">News & Updates</h1>
                    <p className="page-header-subtitle">Field notes, payouts, and new listings.</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {tags.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTag(t)}
                            className="px-4 py-1.5 rounded-full text-sm font-medium"
                            style={
                                tag === t
                                    ? { background: "#0e2a1a", color: "white" }
                                    : { background: "white", border: "1px solid #e8e0d4", color: "#5a6b5e" }
                            }
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((update, index) => (
                        <article
                            key={update.id}
                            className="card-premium group animate-slide-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={update.image}
                                    alt={update.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold"
                                    style={{
                                        background: tagStyles[update.tag]?.bg ?? "white",
                                        color: tagStyles[update.tag]?.color ?? "#1a4a2e",
                                    }}
                                >
                                    {update.tag}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Calendar className="w-3.5 h-3.5 text-[#c8903c]" />
                                    <p className="text-xs font-medium text-[#5a6b5e]">
                                        {update.date} · {update.author}
                                    </p>
                                </div>
                                <h3 className="ayf-heading text-xl leading-snug mb-2 line-clamp-2">{update.title}</h3>
                                <p className="text-sm line-clamp-3 mb-4 text-[#5a6b5e]">{update.excerpt}</p>
                                <Link
                                    to={`/news/${update.id}`}
                                    className="text-sm font-semibold inline-flex items-center gap-1 text-[#c8903c]"
                                >
                                    Read more <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
