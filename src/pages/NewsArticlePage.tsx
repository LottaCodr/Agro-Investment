import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { ArrowLeft, Calendar } from "lucide-react";

export default function NewsArticlePage() {
    const { id } = useParams();
    const { news } = useApp();
    const article = news.find((n) => n.id === id);

    return (
        <DashboardLayout userRole="investor">
            <div className="max-w-3xl mx-auto animate-fade-in">
                <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-[#5a6b5e] mb-6 hover:text-[#0e2a1a]">
                    <ArrowLeft className="w-4 h-4" /> All news
                </Link>
                {!article ? (
                    <p className="text-[#5a6b5e]">This article is no longer available.</p>
                ) : (
                    <>
                        <span className="badge-funding mb-3 inline-flex">{article.tag}</span>
                        <h1 className="page-header-title mb-3">{article.title}</h1>
                        <p className="text-sm text-[#5a6b5e] flex items-center gap-2 mb-6">
                            <Calendar className="w-4 h-4 text-[#c8903c]" />
                            {article.date} · {article.author}
                        </p>
                        <img src={article.image} alt="" className="w-full h-72 object-cover rounded-2xl mb-8 border border-[#e8e0d4]" />
                        {article.content.split("\n\n").map((p) => (
                            <p key={p.slice(0, 24)} className="text-[#3d4d41] leading-relaxed mb-4">
                                {p}
                            </p>
                        ))}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
