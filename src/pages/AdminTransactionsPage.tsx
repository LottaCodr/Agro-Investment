import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { formatFullCurrency, formatLongDate } from "@/lib/mock-data";
import type { TransactionType } from "@/lib/types";

export default function AdminTransactionsPage() {
    const { transactions } = useApp();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [userQ, setUserQ] = useState("");
    const [type, setType] = useState<"All" | TransactionType | "">("");

    const list = useMemo(
        () =>
            transactions.filter((tx) => {
                if (from && tx.date < from) return false;
                if (to && tx.date > to) return false;
                if (userQ && !tx.userName.toLowerCase().includes(userQ.toLowerCase())) return false;
                if (type && tx.type !== type) return false;
                return true;
            }),
        [transactions, from, to, userQ, type],
    );

    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-8 animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Ledger</p>
                    <h1 className="page-header-title">Platform transactions</h1>
                    <p className="page-header-subtitle">Every investment, payout, deposit, and withdrawal in this workspace.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs text-[#5a6b5e] mb-1">From</label>
                        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded-xl px-3 py-2 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-[#5a6b5e] mb-1">To</label>
                        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded-xl px-3 py-2 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-[#5a6b5e] mb-1">User</label>
                        <input value={userQ} onChange={(e) => setUserQ(e.target.value)} placeholder="Name" className="border rounded-xl px-3 py-2 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-[#5a6b5e] mb-1">Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="border rounded-xl px-3 py-2 bg-white text-sm">
                            <option value="">All</option>
                            <option>Investment</option>
                            <option>ROI Payout</option>
                            <option>Deposit</option>
                            <option>Withdrawal</option>
                        </select>
                    </div>
                </div>

                <section className="bg-white rounded-2xl border border-[#e8e0d4] overflow-x-auto">
                    <table className="ayf-table min-w-[800px]">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>User</th>
                                <th>Type</th>
                                <th>Farm</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-[#5a6b5e]">
                                        No transactions for these filters.
                                    </td>
                                </tr>
                            ) : (
                                list.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className="text-[#5a6b5e]">{formatLongDate(tx.date)}</td>
                                        <td className="font-medium">{tx.userName}</td>
                                        <td>
                                            <span className="badge-funding">{tx.type}</span>
                                        </td>
                                        <td className="text-[#5a6b5e]">{tx.farm}</td>
                                        <td className="font-semibold">
                                            {tx.type === "Withdrawal" ? "−" : "+"}
                                            {formatFullCurrency(tx.amount)}
                                        </td>
                                        <td>
                                            <span className="badge-active capitalize">{tx.status}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </DashboardLayout>
    );
}
