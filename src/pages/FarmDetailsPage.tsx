import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    mockFarms,
    formatFullCurrency,
    calculateFundingProgress,
} from "@/lib/mock-data";
import {
    ArrowRight,
    Plus,
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
    Wallet
} from "lucide-react";
import { toast } from "sonner";

export default function FarmDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [investmentAmount, setInvestmentAmount] = useState("1000");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [showInvestment, setShowInvestment] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const farm = mockFarms.find(f => f.id === id);

    if (!farm) {
        return (
            <DashboardLayout userRole="investor">
                <div className="flex flex-col items-center justify-center h-96">
                    <div
                        className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(200,144,60,0.08)" }}
                    >
                        <MapPin className="w-7 h-7" style={{ color: "#c8903c" }} />
                    </div>
                    <p className="font-semibold text-lg" style={{ color: "#0e2a1a" }}>Farm not found</p>
                    <p style={{ color: "#5a6b5e" }}>This farm may no longer be available.</p>
                </div>
            </DashboardLayout>
        );
    }

    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);
    const amount = parseFloat(investmentAmount) || 0;

    const expectedPayoutDate = new Date();
    expectedPayoutDate.setMonth(expectedPayoutDate.getMonth() + farm.durationMonths);

    const handleInvest = () => {
        if (amount < farm.minInvestment) {
            toast.error(`Minimum investment is ${formatFullCurrency(farm.minInvestment)}`);
            return;
        }
        toast.success("Investment Successful!", {
            description: `Your investment in '${farm.name}' is confirmed.`,
        });
        setTimeout(() => navigate("/my-investments"), 1500);
    };

    function InvestmentDetail({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
        return (
            <div className="flex flex-col items-center gap-1 min-w-[90px]">
                <div
                    className="rounded-xl flex items-center justify-center h-10 w-10 mb-1"
                    style={{ background: "rgba(14,42,26,0.06)" }}
                >
                    <Icon className="w-5 h-5" style={{ color: "#1a4a2e" }} />
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#5a6b5e" }}>
                    {label}
                </div>
                <div
                    className="font-semibold text-base"
                    style={{ color: "#0e2a1a" }}
                >
                    {value}
                </div>
            </div>
        );
    }

    if (showInvestment) {
        return (
            <DashboardLayout userRole="investor">
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="page-header">
                        <p className="section-tag">Invest</p>
                        <h1 className="page-header-title">{farm.name}</h1>
                        <p className="page-header-subtitle">
                            Enter your investment details below to proceed.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1" />
                        <div className="w-full lg:w-96">
                            <div
                                className="rounded-2xl p-6"
                                style={{
                                    background: "white",
                                    border: "1px solid hsl(34 25% 85%)",
                                }}
                            >
                                <div className="mb-6">
                                    <Label htmlFor="amount" className="text-sm font-semibold" style={{ color: "#0e2a1a" }}>
                                        Enter Amount (USD)
                                    </Label>
                                    <div className="relative mt-2">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#5a6b5e" }}>$</span>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={investmentAmount}
                                            onChange={(e) => setInvestmentAmount(e.target.value)}
                                            className="pl-7 text-lg rounded-xl h-12"
                                            min={farm.minInvestment}
                                            style={{
                                                background: "#f7f3ed",
                                                borderColor: "hsl(34 25% 85%)",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6 p-4 rounded-xl" style={{ background: "#f7f3ed" }}>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#c8903c" }}>
                                            Projected ROI
                                        </p>
                                        <p
                                            className="text-xl font-bold"
                                            style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                                        >
                                            {farm.roiPercentage}% APY
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#c8903c" }}>
                                            Expected Payout
                                        </p>
                                        <p
                                            className="text-xl font-bold"
                                            style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                                        >
                                            {expectedPayoutDate.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <Label className="mb-3 block text-sm font-semibold" style={{ color: "#0e2a1a" }}>Payment Method</Label>
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <div
                                            className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200"
                                            style={paymentMethod === "card" ? {
                                                border: "2px solid #c8903c",
                                                background: "rgba(200,144,60,0.04)",
                                            } : {
                                                border: "1px solid hsl(34 25% 85%)",
                                                background: "transparent",
                                            }}
                                        >
                                            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                                                <CreditCard className="w-5 h-5" style={{ color: paymentMethod === "card" ? "#c8903c" : "#5a6b5e" }} />
                                                <div>
                                                    <span className="font-medium block" style={{ color: "#0e2a1a" }}>Pay with Card</span>
                                                    <span className="text-xs" style={{ color: "#5a6b5e" }}>Stripe</span>
                                                </div>
                                            </Label>
                                            <RadioGroupItem value="card" id="card" />
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 mt-2"
                                            style={paymentMethod === "wallet" ? {
                                                border: "2px solid #c8903c",
                                                background: "rgba(200,144,60,0.04)",
                                            } : {
                                                border: "1px solid hsl(34 25% 85%)",
                                                background: "transparent",
                                            }}
                                        >
                                            <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer">
                                                <Wallet className="w-5 h-5" style={{ color: paymentMethod === "wallet" ? "#c8903c" : "#5a6b5e" }} />
                                                <div>
                                                    <span className="font-medium block" style={{ color: "#0e2a1a" }}>Pay with Wallet</span>
                                                    <span className="text-xs" style={{ color: "#5a6b5e" }}>Use your AYF balance</span>
                                                </div>
                                            </Label>
                                            <RadioGroupItem value="wallet" id="wallet" />
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button
                                    className="w-full h-12 rounded-xl text-white font-semibold text-base"
                                    onClick={handleInvest}
                                    style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                                >
                                    Proceed to Payment
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-sm" style={{ color: "#1a4a2e" }}>
                                    <Shield className="w-4 h-4" />
                                    <span>Secure SSL Encryption Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="investor">
            <div className="max-w-6xl mx-auto animate-fade-in">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid hsl(34 25% 85%)" }}>
                    <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(14,42,26,0.5) 0%, rgba(14,42,26,0.15) 60%, transparent 100%)",
                        }}
                    />
                    <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                        <Badge
                            className="mb-1 w-fit px-3 py-1.5 text-[11px] tracking-wider font-semibold rounded-full"
                            style={{
                                background: "rgba(200,144,60,0.9)",
                                color: "white",
                                border: "none",
                            }}
                        >
                            Verified Project
                        </Badge>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            {farm.name}
                        </h1>
                        <p className="text-white/70 font-medium text-sm flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {farm.location}
                        </p>
                    </div>
                </div>

                {/* Tabs and Sidebar */}
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList
                                className="bg-transparent p-0 gap-0 h-auto mb-1"
                                style={{ borderBottom: "1px solid hsl(34 25% 85%)" }}
                            >
                                <TabsTrigger
                                    value="overview"
                                    className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 data-[state=active]:shadow-none"
                                    style={activeTab === "overview" ? {
                                        borderColor: "#c8903c",
                                        color: "#0e2a1a",
                                        background: "transparent",
                                    } : {
                                        borderColor: "transparent",
                                        color: "#5a6b5e",
                                        background: "transparent",
                                    }}
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="updates"
                                    className="text-sm px-5 py-3 rounded-none font-semibold border-b-2 data-[state=active]:shadow-none"
                                    style={activeTab === "updates" ? {
                                        borderColor: "#c8903c",
                                        color: "#0e2a1a",
                                        background: "transparent",
                                    } : {
                                        borderColor: "transparent",
                                        color: "#5a6b5e",
                                        background: "transparent",
                                    }}
                                >
                                    Updates (2)
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-7">
                                <div>
                                    <h2
                                        className="text-xl font-semibold mb-3"
                                        style={{
                                            color: "#0e2a1a",
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontWeight: 600,
                                        }}
                                    >
                                        About the Project
                                    </h2>
                                    <p className="leading-relaxed mb-6" style={{ color: "#5a6b5e" }}>
                                        {farm.description}
                                    </p>
                                </div>

                                {/* Investment Details */}
                                <div className="mt-4 mb-8">
                                    <p className="section-tag mb-3">Investment Details</p>
                                    <div
                                        className="flex flex-wrap gap-6 rounded-2xl px-6 py-5"
                                        style={{
                                            background: "white",
                                            border: "1px solid hsl(34 25% 85%)",
                                        }}
                                    >
                                        <InvestmentDetail icon={DollarSign} label="Min. Invest" value={formatFullCurrency(farm.minInvestment)} />
                                        <InvestmentDetail icon={TrendingUp} label="ROI" value={farm.roiPercentage + "%"} />
                                        <InvestmentDetail icon={Clock} label="Duration" value={farm.durationMonths + " Months"} />
                                        <InvestmentDetail icon={Users} label="Investors" value={String(farm.investorCount)} />
                                        <InvestmentDetail icon={Leaf} label="Acres" value={String(farm.acres)} />
                                        <InvestmentDetail icon={CalendarCheck} label="Harvest" value={farm.harvestTime} />
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="mb-10">
                                    <p className="section-tag mb-3">Planting Location</p>
                                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(34 25% 85%)" }}>
                                        <iframe
                                            title={`Map for ${farm.location}`}
                                            width="100%"
                                            height="320"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            className="w-full h-80"
                                            src={`https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(farm.location)}&layer=mapnik`}
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="updates" className="mt-7">
                                <div className="space-y-4">
                                    {[
                                        { date: "Dec 10, 2024", title: "Planting Phase Complete", desc: "Successfully completed the initial planting phase. Crops are showing excellent early growth." },
                                        { date: "Nov 25, 2024", title: "Land Preparation Finished", desc: "Completed soil preparation and irrigation system installation." },
                                    ].map((update, i) => (
                                        <div
                                            key={i}
                                            className="rounded-xl p-5 transition-all duration-200 hover:shadow-sm"
                                            style={{
                                                background: "white",
                                                border: "1px solid hsl(34 25% 85%)",
                                            }}
                                        >
                                            <p className="text-xs font-medium mb-1" style={{ color: "#c8903c" }}>{update.date}</p>
                                            <h4
                                                className="font-semibold mb-1"
                                                style={{ color: "#0e2a1a", fontFamily: "'Cormorant Garamond', serif" }}
                                            >
                                                {update.title}
                                            </h4>
                                            <p className="text-sm" style={{ color: "#5a6b5e" }}>{update.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 mt-10 lg:mt-0">
                        <div
                            className="rounded-2xl p-6 sticky top-20 flex flex-col gap-5"
                            style={{
                                background: "white",
                                border: "1px solid hsl(34 25% 85%)",
                            }}
                        >
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                {[
                                    { icon: MapPin, label: "Location", value: farm.location },
                                    { icon: Clock, label: "Duration", value: `${farm.durationMonths} Months` },
                                    { icon: TrendingUp, label: "Projected ROI", value: `${farm.roiPercentage}% APY` },
                                    { icon: Target, label: "Funding Goal", value: formatFullCurrency(farm.targetAmount) },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 mb-1" style={{ color: "#c8903c" }}>
                                            <item.icon className="w-3 h-3" />
                                            {item.label}
                                        </p>
                                        <p className="font-medium text-sm" style={{ color: "#0e2a1a" }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="mb-1">
                                <div className="flex items-center justify-between text-[11px] mb-2 uppercase tracking-wider font-semibold">
                                    <span style={{ color: "#c8903c" }}>Funding Progress</span>
                                    <span style={{ color: "#0e2a1a" }}>{progress}%</span>
                                </div>
                                <div
                                    className="h-2.5 rounded-full overflow-hidden relative"
                                    style={{ background: "#ede5d8" }}
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{
                                            width: `${progress}%`,
                                            background: "linear-gradient(90deg, #c8903c, #e8b060)",
                                        }}
                                    />
                                </div>
                                <p className="text-xs mt-2" style={{ color: "#5a6b5e" }}>
                                    {formatFullCurrency(farm.currentAmount)} of {formatFullCurrency(farm.targetAmount)}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 rounded-xl font-semibold h-11 btn-ayf-outline"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Watchlist
                                </Button>
                                <Button
                                    className="flex-1 rounded-xl font-semibold h-11 text-white"
                                    onClick={() => setShowInvestment(true)}
                                    style={{ background: "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                                >
                                    Invest Now
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
