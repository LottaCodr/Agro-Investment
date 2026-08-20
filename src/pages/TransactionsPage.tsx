import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArrowUpRight, ArrowDownRight, MinusCircle, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatLongDate } from "@/lib/mock-data";
import type { TransactionType } from "@/lib/types";

export default function TransactionsPage() {
    const { transactions, user } = useApp();
    const [q, setQ] = useState("");
    const [type, setType] = useState<"All" | TransactionType>("All");

    const mine = useMemo(() => {
        return transactions.filter((tx) => {
            const owned = !user || tx.userId === user.id || tx.userName === user.name;
            const matchesType = type === "All" || tx.type === type;
            const matchesQ =
                !q ||
                tx.farm.toLowerCase().includes(q.toLowerCase()) ||
                tx.type.toLowerCase().includes(q.toLowerCase());
            return owned && matchesType && matchesQ;
        });
    }, [transactions, user, q, type]);

    const getTypeIcon = (t: string) => {
        if (t === "Investment") return <ArrowUpRight className="w-4 h-4 text-[#1a4a2e]" />;
        if (t === "ROI Payout" || t === "Deposit") return <ArrowDownRight className="w-4 h-4 text-[#c8903c]" />;
        return <MinusCircle className="w-4 h-4 text-[#5a6b5e]" />;
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">History</p>
                    <h1 className="page-header-title">Transactions</h1>
                    <p className="page-header-subtitle">Investments, payouts, deposits, and withdrawals.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6b5e]" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search farm or type…"
                            className="w-full h-10 pl-9 rounded-xl border border-[#e8e0d4] bg-white text-sm"
                        />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as typeof type)}
                        className="h-10 rounded-xl border border-[#e8e0d4] bg-white px-3 text-sm"
                    >
                        <option value="All">All types</option>
                        <option>Investment</option>
                        <option>ROI Payout</option>
                        <option>Deposit</option>
                        <option>Withdrawal</option>
                    </select>
                </div>

                <div className="rounded-2xl overflow-hidden bg-white border border-[#e8e0d4] overflow-x-auto">
                    <table className="ayf-table min-w-[720px]">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Farm / source</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mine.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-[#5a6b5e]">
                                        No transactions match these filters.
                                    </td>
                                </tr>
                            )}
                            {mine.map((tx) => (
                                <tr key={tx.id}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0e2a1a]/6">
                                                {getTypeIcon(tx.type)}
                                            </div>
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full badge-funding">
                                                {tx.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-[#5a6b5e]">{tx.farm}</td>
                                    <td>
                                        <span className="font-semibold" style={{ color: tx.type === "Withdrawal" ? "#5a6b5e" : "#1a4a2e" }}>
                                            {tx.type === "Withdrawal" ? "−" : "+"}${tx.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="text-[#5a6b5e]">{formatLongDate(tx.date)}</td>
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
