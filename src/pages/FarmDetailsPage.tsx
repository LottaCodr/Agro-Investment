import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    formatFullCurrency,
    calculateFundingProgress,
    calculateExpectedReturn,
    addMonths,
} from "@/lib/mock-data";
import {
    ArrowRight,
    Shield,
    MapPin,
    Clock,
    TrendingUp,
    Target,
    Users,
    Leaf,
    DollarSign,
    CalendarCheck,
    CreditCard,
    Wallet,
    Heart,
    AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/store";
import { FarmCard } from "@/components/dashboard/FarmCard";

export default function FarmDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { farms, invest, watchlist, toggleWatchlist, walletBalance, user } = useApp();
    const [investmentAmount, setInvestmentAmount] = useState("1000");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
    const [showInvestment, setShowInvestment] = useState(params.get("invest") === "1");
    const [activeTab, setActiveTab] = useState("overview");
    const [busy, setBusy] = useState(false);

    const farm = farms.find((f) => f.id === id);
    const saved = farm ? watchlist.includes(farm.id) : false;

    const similar = useMemo(
        () =>
            farm
                ? farms.filter((f) => f.id !== farm.id && (f.cropType === farm.cropType || f.status === "funding")).slice(0, 3)
                : [],
        [farm, farms],
    );

    if (!farm) {
        return (
            <DashboardLayout userRole="investor">
                <div className="flex flex-col items-center justify-center h-96">
                    <MapPin className="w-8 h-8 mb-3 text-[#c8903c]" />
                    <p className="font-semibold text-lg text-[#0e2a1a]">Farm not found</p>
                    <p className="text-[#5a6b5e] mb-4">It may have been removed.</p>
                    <Link to="/discover" className="text-sm font-semibold text-[#c8903c]">
                        Back to Discover
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);
    const amount = parseFloat(investmentAmount) || 0;
    const expectedPayoutDate = addMonths(new Date(), farm.durationMonths);
    const expected = calculateExpectedReturn(amount, farm.roiPercentage);
    const remaining = Math.max(0, farm.targetAmount - farm.currentAmount);
    const canInvest = farm.status !== "closed";

    const handleInvest = async () => {
        if (user?.role === "admin") {
            toast.error("Switch to an investor account to place capital.");
            return;
        }
        setBusy(true);
        await new Promise((r) => setTimeout(r, 400));
        const result = invest(farm.id, amount, paymentMethod);
        setBusy(false);
        if (!result.ok) {
            toast.error(result.error);
            return;
        }
        toast.success("Investment confirmed", {
            description: `${formatFullCurrency(amount)} is now working in ${farm.name}.`,
        });
        navigate("/my-investments");
    };

    const riskCopy = {
        low: "Weather is the main variable. Offtake is contracted.",
        medium: "Yield and price can move. We underwrote title and operations.",
        high: "Commodity or long-cycle risk is material. Size the position carefully.",
    };

    const investPanel = (
        <div className="rounded-2xl p-6 bg-white border border-[#e8e0d4]">
            <div className="mb-5">
                <Label htmlFor="amount" className="text-sm font-semibold text-[#0e2a1a]">
                    Amount (USD)
                </Label>
                <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6b5e]">$</span>
                    <Input
                        id="amount"
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="pl-7 text-lg rounded-xl h-12 bg-[#f7f3ed]"
                        min={farm.minInvestment}
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    {[farm.minInvestment, 500, 1000, 2500].map((n) => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => setInvestmentAmount(String(n))}
                            className="px-2.5 py-1 rounded-full text-xs font-medium border border-[#e8e0d4] hover:bg-[#f7f3ed]"
                        >
                            ${n.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mb-5 p-4 rounded-xl bg-[#f7f3ed]">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#c8903c]">You receive</p>
                    <p className="text-xl font-bold ayf-serif text-[#0e2a1a]">{formatFullCurrency(expected)}</p>
                    <p className="text-xs text-[#5a6b5e]">{farm.roiPercentage}% over {farm.durationMonths} mo</p>
                </div>
                <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#c8903c]">Payout</p>
                    <p className="text-xl font-bold ayf-serif text-[#0e2a1a]">
                        {expectedPayoutDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                </div>
            </div>

            <div className="mb-5">
                <Label className="mb-3 block text-sm font-semibold text-[#0e2a1a]">Payment</Label>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "wallet")}>
                    <label
                        htmlFor="card"
                        className="flex items-center justify-between p-4 rounded-xl cursor-pointer"
                        style={
                            paymentMethod === "card"
                                ? { border: "2px solid #c8903c", background: "rgba(200,144,60,0.04)" }
                                : { border: "1px solid hsl(34 25% 85%)" }
                        }
                    >
                        <span className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5" style={{ color: paymentMethod === "card" ? "#c8903c" : "#5a6b5e" }} />
                            <span>
                                <span className="font-medium block text-[#0e2a1a]">Card</span>
                                <span className="text-xs text-[#5a6b5e]">Visa, Mastercard</span>
                            </span>
                        </span>
                        <RadioGroupItem value="card" id="card" />
                    </label>
                    <label
                        htmlFor="wallet"
                        className="flex items-center justify-between p-4 rounded-xl cursor-pointer mt-2"
                        style={
                            paymentMethod === "wallet"
                                ? { border: "2px solid #c8903c", background: "rgba(200,144,60,0.04)" }
                                : { border: "1px solid hsl(34 25% 85%)" }
                        }
                    >
                        <span className="flex items-center gap-3">
                            <Wallet className="w-5 h-5" style={{ color: paymentMethod === "wallet" ? "#c8903c" : "#5a6b5e" }} />
                            <span>
                                <span className="font-medium block text-[#0e2a1a]">AYF Wallet</span>
                                <span className="text-xs text-[#5a6b5e]">{formatFullCurrency(walletBalance)} available</span>
                            </span>
                        </span>
                        <RadioGroupItem value="wallet" id="wallet" />
                    </label>
                </RadioGroup>
            </div>

            {!canInvest && (
                <p className="text-sm text-[#5a6b5e] mb-3">This cycle is closed to new capital.</p>
            )}

            <Button
                className="w-full h-12 rounded-xl text-white font-semibold"
                onClick={handleInvest}
                disabled={busy || !canInvest}
                style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
            >
                {busy ? "Confirming…" : "Confirm investment"}
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#1a4a2e]">
                <Shield className="w-4 h-4" />
                <span>Encrypted checkout · demo funds only</span>
            </div>
        </div>
    );

    if (showInvestment) {
        return (
            <DashboardLayout userRole="investor">
                <div className="max-w-5xl mx-auto animate-fade-in">
                    <button
                        type="button"
                        onClick={() => setShowInvestment(false)}
                        className="text-sm text-[#5a6b5e] mb-4 hover:text-[#0e2a1a]"
                    >
                        ← Back to {farm.name}
                    </button>
                    <div className="page-header">
                        <p className="section-tag">Invest</p>
                        <h1 className="page-header-title">{farm.name}</h1>
                        <p className="page-header-subtitle">
                            Min {formatFullCurrency(farm.minInvestment)}
                            {remaining > 0 ? ` · ${formatFullCurrency(remaining)} still open` : " · fully funded"}
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="rounded-2xl overflow-hidden border border-[#e8e0d4] bg-white">
                            <img src={farm.image} alt="" className="h-48 w-full object-cover" />
                            <div className="p-6 space-y-3 text-sm text-[#5a6b5e]">
                                <p>{farm.description}</p>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-[#c8903c]">ROI</p>
                                        <p className="font-semibold text-[#0e2a1a]">{farm.roiPercentage}%</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-[#c8903c]">Duration</p>
                                        <p className="font-semibold text-[#0e2a1a]">{farm.durationMonths} months</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-[#c8903c]">Risk</p>
                                        <p className="font-semibold text-[#0e2a1a] capitalize">{farm.riskLevel}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-[#c8903c]">Crop</p>
                                        <p className="font-semibold text-[#0e2a1a]">{farm.cropType}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {investPanel}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="investor">
            <div className="max-w-6xl mx-auto animate-fade-in">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-[#e8e0d4]">
                    <img src={farm.image} alt={farm.name} className="w-full h-full object-cover" />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(14,42,26,0.55) 0%, rgba(14,42,26,0.15) 60%, transparent 100%)",
                        }}
                    />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                        <div className="flex gap-2 flex-wrap">
                            <span className="badge-funding">Verified · {farm.cropType}</span>
                            <span className="badge-closed bg-white/90 capitalize">{farm.riskLevel} risk</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white ayf-heading">{farm.name}</h1>
                        <p className="text-white/75 text-sm flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {farm.location}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-transparent p-0 h-auto border-b border-[#e8e0d4] rounded-none w-full justify-start">
                                {["overview", "updates", "risk"].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 capitalize data-[state=active]:shadow-none"
                                        style={
                                            activeTab === tab
                                                ? { borderColor: "#c8903c", color: "#0e2a1a", background: "transparent" }
                                                : { borderColor: "transparent", color: "#5a6b5e", background: "transparent" }
                                        }
                                    >
                                        {tab}
                                        {tab === "updates" ? ` (${farm.updates.length})` : ""}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="overview" className="mt-7">
                                <h2 className="text-xl ayf-heading mb-3">About the project</h2>
                                <p className="leading-relaxed mb-6 text-[#5a6b5e]">{farm.description}</p>

                                <p className="section-tag mb-3">Investment details</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-2xl px-6 py-5 bg-white border border-[#e8e0d4] mb-8">
                                    {[
                                        { icon: DollarSign, label: "Min. invest", value: formatFullCurrency(farm.minInvestment) },
                                        { icon: TrendingUp, label: "ROI", value: `${farm.roiPercentage}%` },
                                        { icon: Clock, label: "Duration", value: `${farm.durationMonths} mo` },
                                        { icon: Users, label: "Investors", value: String(farm.investorCount) },
                                        { icon: Leaf, label: "Acres", value: String(farm.acres) },
                                        { icon: CalendarCheck, label: "Harvest", value: farm.harvestTime },
                                    ].map((item) => (
                                        <div key={item.label} className="flex flex-col items-start gap-1">
                                            <item.icon className="w-4 h-4 text-[#1a4a2e] mb-1" />
                                            <div className="text-[11px] uppercase tracking-wider text-[#5a6b5e]">{item.label}</div>
                                            <div className="font-semibold text-[#0e2a1a]">{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <p className="section-tag mb-3">Planting location</p>
                                <div className="rounded-2xl overflow-hidden border border-[#e8e0d4] mb-10">
                                    <iframe
                                        title={`Map for ${farm.location}`}
                                        width="100%"
                                        height="320"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=-12.5,4.3,-7.3,8.6&layer=mapnik`}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="updates" className="mt-7 space-y-4">
                                {farm.updates.length === 0 && <p className="text-[#5a6b5e]">No field notes yet.</p>}
                                {farm.updates.map((update) => (
                                    <div key={update.title} className="rounded-xl p-5 bg-white border border-[#e8e0d4]">
                                        <p className="text-xs font-medium text-[#c8903c] mb-1">{update.date}</p>
                                        <h4 className="font-semibold ayf-heading text-lg">{update.title}</h4>
                                        <p className="text-sm text-[#5a6b5e]">{update.desc}</p>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="risk" className="mt-7">
                                <div className="rounded-2xl p-6 bg-white border border-[#e8e0d4] flex gap-4">
                                    <AlertTriangle className="w-6 h-6 text-[#c8903c] flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-[#0e2a1a] capitalize mb-1">{farm.riskLevel} risk</p>
                                        <p className="text-sm text-[#5a6b5e] leading-relaxed">{riskCopy[farm.riskLevel]}</p>
                                        <p className="text-sm text-[#5a6b5e] mt-3">
                                            This is not a bank deposit. Weather, pests, and prices can reduce or delay returns.
                                            Only commit capital you can leave in the field for the full cycle.
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="rounded-2xl p-6 sticky top-20 flex flex-col gap-5 bg-white border border-[#e8e0d4]">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: MapPin, label: "Location", value: farm.location },
                                    { icon: Clock, label: "Duration", value: `${farm.durationMonths} mo` },
                                    { icon: TrendingUp, label: "ROI", value: `${farm.roiPercentage}%` },
                                    { icon: Target, label: "Goal", value: formatFullCurrency(farm.targetAmount) },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 mb-1 text-[#c8903c]">
                                            <item.icon className="w-3 h-3" />
                                            {item.label}
                                        </p>
                                        <p className="font-medium text-sm text-[#0e2a1a]">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="flex justify-between text-[11px] mb-2 uppercase tracking-wider font-semibold">
                                    <span className="text-[#c8903c]">Funding</span>
                                    <span className="text-[#0e2a1a]">{progress}%</span>
                                </div>
                                <div className="h-2.5 rounded-full overflow-hidden bg-[#ede5d8]">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${progress}%`,
                                            background: "linear-gradient(90deg, #c8903c, #e8b060)",
                                        }}
                                    />
                                </div>
                                <p className="text-xs mt-2 text-[#5a6b5e]">
                                    {formatFullCurrency(farm.currentAmount)} of {formatFullCurrency(farm.targetAmount)}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 rounded-xl font-semibold h-11 btn-ayf-outline"
                                    variant="outline"
                                    onClick={() => toggleWatchlist(farm.id)}
                                >
                                    <Heart className="w-4 h-4 mr-1" fill={saved ? "currentColor" : "none"} />
                                    {saved ? "Saved" : "Watch"}
                                </Button>
                                <Button
                                    className="flex-1 rounded-xl font-semibold h-11 text-white"
                                    onClick={() => setShowInvestment(true)}
                                    disabled={!canInvest}
                                    style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                                >
                                    Invest
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {similar.length > 0 && (
                    <section className="mt-16">
                        <p className="section-tag">More like this</p>
                        <h2 className="ayf-heading text-2xl mb-5">Similar farms</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {similar.map((f) => (
                                <FarmCard key={f.id} farm={f} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
}
