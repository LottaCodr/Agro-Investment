import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { formatFullCurrency, formatLongDate } from "@/lib/mock-data";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

export default function WalletPage() {
    const { walletBalance, deposit, withdraw, transactions, user } = useApp();
    const [mode, setMode] = useState<"deposit" | "withdraw" | null>(null);
    const [amount, setAmount] = useState("500");

    const history = transactions.filter(
        (t) =>
            (t.type === "Deposit" || t.type === "Withdrawal") &&
            (!user || t.userId === user.id || t.userName === user.name),
    );

    const submit = () => {
        const n = Number(amount);
        const result = mode === "deposit" ? deposit(n) : withdraw(n);
        if (!result.ok) {
            toast.error(result.error);
            return;
        }
        toast.success(mode === "deposit" ? "Deposit added" : "Withdrawal sent");
        setMode(null);
    };

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="page-header">
                    <p className="section-tag">Treasury</p>
                    <h1 className="page-header-title">Wallet</h1>
                    <p className="page-header-subtitle">Fund investments or cash out harvest proceeds.</p>
                </div>

                <div className="welcome-banner">
                    <div className="relative z-10">
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> Available balance
                        </p>
                        <p className="text-5xl text-white ayf-serif mb-6">{formatFullCurrency(walletBalance)}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setMode("deposit");
                                    setAmount("500");
                                }}
                                className="px-5 py-2.5 rounded-full bg-[#c8903c] text-white text-sm font-semibold inline-flex items-center gap-2"
                            >
                                <ArrowDownLeft className="w-4 h-4" /> Deposit
                            </button>
                            <button
                                onClick={() => {
                                    setMode("withdraw");
                                    setAmount("100");
                                }}
                                className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium inline-flex items-center gap-2"
                            >
                                <ArrowUpRight className="w-4 h-4" /> Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                <section className="rounded-2xl bg-white border border-[#e8e0d4] overflow-hidden">
                    <header className="px-5 py-4 border-b border-[#e8e0d4]">
                        <h2 className="ayf-heading text-lg">Wallet movements</h2>
                    </header>
                    {history.length === 0 ? (
                        <p className="px-5 py-10 text-center text-sm text-[#5a6b5e]">No deposits or withdrawals yet.</p>
                    ) : (
                        <ul>
                            {history.map((t) => (
                                <li key={t.id} className="px-5 py-4 flex justify-between border-b border-[#e8e0d4] last:border-0">
                                    <div>
                                        <p className="font-medium text-[#0e2a1a]">{t.type}</p>
                                        <p className="text-xs text-[#5a6b5e]">{formatLongDate(t.date)}</p>
                                    </div>
                                    <p className="font-semibold" style={{ color: t.type === "Withdrawal" ? "#5a6b5e" : "#1a4a2e" }}>
                                        {t.type === "Withdrawal" ? "−" : "+"}
                                        {formatFullCurrency(t.amount)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            <Modal
                open={mode !== null}
                onClose={() => setMode(null)}
                title={mode === "deposit" ? "Add funds" : "Withdraw"}
                description={
                    mode === "deposit"
                        ? "Demo checkout — funds appear instantly in your wallet."
                        : "Demo transfer — balance drops immediately."
                }
            >
                <label className="text-sm font-medium">
                    Amount (USD)
                    <Input
                        type="number"
                        min={10}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1.5 h-11 rounded-xl"
                    />
                </label>
                <Button
                    className="w-full mt-5 h-11 rounded-xl text-white"
                    style={{ background: "#0e2a1a" }}
                    onClick={submit}
                >
                    {mode === "deposit" ? "Deposit" : "Withdraw"} {amount ? `$${Number(amount).toLocaleString()}` : ""}
                </Button>
            </Modal>
        </DashboardLayout>
    );
}
