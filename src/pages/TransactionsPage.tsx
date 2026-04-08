import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArrowUpRight, ArrowDownRight, MinusCircle } from "lucide-react";

export default function TransactionsPage() {
    const transactions = [
        { id: 1, type: "Investment", farm: "Green Palm Trees Farm", amount: 5000, date: "2024-12-10", status: "completed" },
        { id: 2, type: "ROI Payout", farm: "Wheat Rolls Valley", amount: 750, date: "2024-12-05", status: "completed" },
        { id: 3, type: "Investment", farm: "Cassava Plantation Co.", amount: 3000, date: "2024-11-28", status: "completed" },
        { id: 4, type: "Withdrawal", farm: "-", amount: 1000, date: "2024-11-20", status: "completed" },
    ];

    const getTypeIcon = (type: string) => {
        if (type === "Investment") return <ArrowUpRight className="w-4 h-4" style={{ color: "#1a4a2e" }} />;
        if (type === "ROI Payout") return <ArrowDownRight className="w-4 h-4" style={{ color: "#c8903c" }} />;
        return <MinusCircle className="w-4 h-4" style={{ color: "#5a6b5e" }} />;
    };

    const getTypeBadgeStyle = (type: string) => {
        if (type === "Investment") return { background: "rgba(14,42,26,0.06)", color: "#1a4a2e", border: "1px solid rgba(14,42,26,0.15)" };
        if (type === "ROI Payout") return { background: "rgba(200,144,60,0.08)", color: "#c8903c", border: "1px solid rgba(200,144,60,0.2)" };
        return { background: "rgba(90,107,94,0.06)", color: "#5a6b5e", border: "1px solid rgba(90,107,94,0.15)" };
    };

    const getAmountStyle = (type: string) => {
        if (type === "ROI Payout") return { color: "#c8903c" };
        if (type === "Withdrawal") return { color: "#5a6b5e" };
        return { color: "#1a4a2e" };
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                {/* Page Header */}
                <div className="page-header">
                    <p className="section-tag">History</p>
                    <h1 className="page-header-title">Transactions</h1>
                    <p className="page-header-subtitle">
                        View your investment and payout history.
                    </p>
                </div>

                {/* Table */}
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: "white",
                        border: "1px solid hsl(34 25% 85%)",
                    }}
                >
                    <table className="ayf-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Farm</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, index) => (
                                <tr
                                    key={tx.id}
                                    className="animate-slide-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ background: getTypeBadgeStyle(tx.type).background }}
                                            >
                                                {getTypeIcon(tx.type)}
                                            </div>
                                            <span
                                                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                                style={getTypeBadgeStyle(tx.type)}
                                            >
                                                {tx.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ color: "#5a6b5e" }}>{tx.farm}</td>
                                    <td>
                                        <span className="font-semibold" style={getAmountStyle(tx.type)}>
                                            {tx.type === "Withdrawal" ? "-" : "+"}${tx.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td style={{ color: "#5a6b5e" }}>
                                        {new Date(tx.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        <span className="badge-active capitalize">{tx.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
