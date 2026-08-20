import farmPalmTrees from "@/assets/farm-palm-trees.jpg";
import farmWheat from "@/assets/farm-wheat.jpg";
import farmCassava from "@/assets/farm-cassava.jpg";
import farmRice from "@/assets/farm-rice.jpg";
import farmCocoa from "@/assets/farm-cocoa.jpg";
import farmRubber from "@/assets/farm-rubber.jpg";
import type {
    Farm,
    Investment,
    Transaction,
    AppNotification,
    NewsArticle,
    Investor,
    User,
} from "@/lib/types";

export type {
    Farm,
    Investment,
    Transaction,
    AppNotification,
    NewsArticle,
    Investor,
    User,
} from "@/lib/types";

export const SEED_USER: User = {
    id: "user-bami",
    name: "Bami Kamara",
    email: "bami@ayf.africa",
    country: "Liberia",
    role: "investor",
    phone: "+231 77 123 4567",
    joinedAt: "2025-03-12",
};

export const SEED_ADMIN: User = {
    id: "user-admin",
    name: "Amina Sesay",
    email: "admin@ayf.africa",
    country: "Liberia",
    role: "admin",
    phone: "+231 88 555 0100",
    joinedAt: "2024-01-08",
};

export const mockFarms: Farm[] = [
    {
        id: "1",
        name: "Green Palm Trees Farm",
        location: "Monrovia, Liberia",
        cropType: "Palm Oil",
        riskLevel: "medium",
        description:
            "A certified sustainable palm oil plantation outside Monrovia. Capital funds drought-resistant seedlings, drip irrigation, and a community processing mill. Independent agronomists audit soil health and yield each quarter, with proceeds shared after harvest.",
        image: farmPalmTrees,
        images: [farmPalmTrees, farmRubber],
        targetAmount: 50000,
        currentAmount: 18500,
        minInvestment: 100,
        roiPercentage: 15,
        durationMonths: 12,
        investorCount: 126,
        acres: 150,
        harvestTime: "Oct 2026",
        status: "funding",
        createdAt: "2025-11-15",
        updates: [
            {
                date: "Jul 22, 2026",
                title: "Nursery expansion complete",
                desc: "12,000 hybrid seedlings transplanted. Early canopy coverage is ahead of schedule.",
            },
            {
                date: "Jun 4, 2026",
                title: "Irrigation commissioned",
                desc: "Solar-powered drip lines now cover 80 acres of the eastern block.",
            },
        ],
    },
    {
        id: "2",
        name: "Wheat Rolls Valley Farm",
        location: "Gbarnga, Liberia",
        cropType: "Wheat",
        riskLevel: "low",
        description:
            "A premium wheat operation using no-till planting and moisture sensors to protect soil and stabilize yield. Grain is contracted to regional mills before harvest, reducing market risk for investors.",
        image: farmWheat,
        images: [farmWheat, farmRice],
        targetAmount: 75000,
        currentAmount: 45200,
        minInvestment: 100,
        roiPercentage: 18.5,
        durationMonths: 12,
        investorCount: 214,
        acres: 234,
        harvestTime: "Feb 2027",
        status: "funding",
        createdAt: "2026-01-08",
        updates: [
            {
                date: "Aug 1, 2026",
                title: "Mid-season stand count",
                desc: "Plant density is 8% above target. Foliar nutrition applied last week.",
            },
        ],
    },
    {
        id: "3",
        name: "Cassava Plantation Co.",
        location: "Buchanan, Liberia",
        cropType: "Cassava",
        riskLevel: "low",
        description:
            "Large-scale cassava for flour and industrial starch. Offtake agreements with two processors lock in price. Your capital financed planting, warehousing, and a new access road.",
        image: farmCassava,
        images: [farmCassava],
        targetAmount: 120000,
        currentAmount: 120000,
        minInvestment: 150,
        roiPercentage: 20,
        durationMonths: 18,
        investorCount: 450,
        acres: 310,
        harvestTime: "Apr 2027",
        status: "active",
        createdAt: "2025-04-01",
        updates: [
            {
                date: "Aug 10, 2026",
                title: "Tuber sizing on track",
                desc: "Sample plots average 1.8 kg per plant. First warehouse bay is filled.",
            },
            {
                date: "May 18, 2026",
                title: "Processing contract renewed",
                desc: "Two-year offtake signed at a 6% premium to last season.",
            },
        ],
    },
    {
        id: "4",
        name: "Grain Wheat Plantation",
        location: "Kakata, Liberia",
        cropType: "Wheat",
        riskLevel: "medium",
        description:
            "Climate-smart wheat with cover crops between seasons. Funds go to seed, storage silos, and a small mill that sells flour locally at a higher margin.",
        image: farmWheat,
        targetAmount: 90000,
        currentAmount: 67500,
        minInvestment: 100,
        roiPercentage: 16,
        durationMonths: 18,
        investorCount: 188,
        acres: 190,
        harvestTime: "Mar 2027",
        status: "funding",
        createdAt: "2026-02-14",
        updates: [
            {
                date: "Jul 2, 2026",
                title: "Silo foundations poured",
                desc: "Two 80-ton silos will be ready before the next harvest window.",
            },
        ],
    },
    {
        id: "5",
        name: "Sunrise Agrofarm",
        location: "Harper, Liberia",
        cropType: "Mixed Crops",
        riskLevel: "low",
        description:
            "A mixed vegetable and maize farm that completed its cycle in early 2026. Investors received full principal plus contracted return.",
        image: farmCassava,
        targetAmount: 50000,
        currentAmount: 50000,
        minInvestment: 100,
        roiPercentage: 15,
        durationMonths: 12,
        investorCount: 180,
        acres: 110,
        harvestTime: "Jan 2026",
        status: "closed",
        createdAt: "2024-11-01",
        updates: [
            {
                date: "Jan 28, 2026",
                title: "Final payout issued",
                desc: "All investors received principal and 15% return. Thank you for the cycle.",
            },
        ],
    },
    {
        id: "6",
        name: "Baobab Orchards",
        location: "Kakata, Liberia",
        cropType: "Fruit",
        riskLevel: "medium",
        description:
            "Export-grade mango and citrus orchards with cold-chain packing. Longer duration, higher contracted ROI, and a growing European buyer list.",
        image: farmPalmTrees,
        targetAmount: 90000,
        currentAmount: 72000,
        minInvestment: 200,
        roiPercentage: 20,
        durationMonths: 24,
        investorCount: 97,
        acres: 90,
        harvestTime: "Dec 2027",
        status: "funding",
        createdAt: "2025-12-20",
        updates: [
            {
                date: "Jun 30, 2026",
                title: "First flowering observed",
                desc: "Mango blocks A and B are in bloom. Bee hives deployed for pollination.",
            },
        ],
    },
    {
        id: "7",
        name: "Riverbend Rice Collective",
        location: "Robertsport, Liberia",
        cropType: "Rice",
        riskLevel: "low",
        description:
            "Irrigated lowland rice with a cooperative of 40 smallholders. Investors fund seed, water pumps, and a hulling mill that keeps more value in the community.",
        image: farmRice,
        targetAmount: 64000,
        currentAmount: 22800,
        minInvestment: 75,
        roiPercentage: 14,
        durationMonths: 9,
        investorCount: 81,
        acres: 86,
        harvestTime: "May 2027",
        status: "funding",
        createdAt: "2026-06-02",
        updates: [
            {
                date: "Aug 6, 2026",
                title: "Pumps installed",
                desc: "Three solar pumps now feed the western paddies through the dry stretch.",
            },
        ],
    },
    {
        id: "8",
        name: "Kpele Cocoa Estates",
        location: "Zwedru, Liberia",
        cropType: "Cocoa",
        riskLevel: "medium",
        description:
            "Fine-flavor cocoa under shade trees, fermented on-site and sold to specialty buyers. Capital covers fermentation boxes, drying decks, and farmer training.",
        image: farmCocoa,
        targetAmount: 110000,
        currentAmount: 41000,
        minInvestment: 250,
        roiPercentage: 22,
        durationMonths: 24,
        investorCount: 64,
        acres: 128,
        harvestTime: "Nov 2027",
        status: "funding",
        createdAt: "2026-03-18",
        updates: [
            {
                date: "Jul 14, 2026",
                title: "Fermentation house roofed",
                desc: "Drying decks are in use. First specialty sample sent to a Swiss buyer.",
            },
        ],
    },
    {
        id: "9",
        name: "Lofa Rubber Groves",
        location: "Voinjama, Liberia",
        cropType: "Rubber",
        riskLevel: "high",
        description:
            "Mature Hevea stands being rehabilitated for cup-lump production. Higher risk due to commodity price swings, offset by a multi-year offtake with a local processor.",
        image: farmRubber,
        targetAmount: 150000,
        currentAmount: 150000,
        minInvestment: 300,
        roiPercentage: 19,
        durationMonths: 36,
        investorCount: 132,
        acres: 420,
        harvestTime: "Ongoing",
        status: "active",
        createdAt: "2024-08-12",
        updates: [
            {
                date: "Aug 12, 2026",
                title: "Tapping crews expanded",
                desc: "Daily cup-lump volume is up 11% month over month.",
            },
        ],
    },
];

function attachFarm(farmId: string): Farm {
    return mockFarms.find((f) => f.id === farmId) ?? mockFarms[0];
}

export const mockInvestments: Investment[] = [
    {
        id: "inv-1",
        userId: "user-bami",
        farmId: "1",
        farm: attachFarm("1"),
        amount: 5000,
        investedAt: "2026-02-15",
        expectedReturn: 5750,
        expectedPayoutDate: "2027-02-15",
        daysRemaining: 180,
        progress: 52,
        status: "active",
    },
    {
        id: "inv-2",
        userId: "user-bami",
        farmId: "2",
        farm: attachFarm("2"),
        amount: 3500,
        investedAt: "2026-04-01",
        expectedReturn: 4148,
        expectedPayoutDate: "2027-04-01",
        daysRemaining: 225,
        progress: 38,
        status: "active",
    },
    {
        id: "inv-3",
        userId: "user-bami",
        farmId: "3",
        farm: attachFarm("3"),
        amount: 4000,
        investedAt: "2025-11-01",
        expectedReturn: 4800,
        expectedPayoutDate: "2027-05-01",
        daysRemaining: 255,
        progress: 61,
        status: "active",
    },
    {
        id: "inv-4",
        userId: "user-bami",
        farmId: "5",
        farm: attachFarm("5"),
        amount: 2500,
        investedAt: "2025-01-10",
        expectedReturn: 2875,
        expectedPayoutDate: "2026-01-10",
        daysRemaining: 0,
        progress: 100,
        status: "completed",
    },
];

export const mockTransactions: Transaction[] = [
    {
        id: "tx-1",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "Investment",
        farm: "Green Palm Trees Farm",
        farmId: "1",
        amount: 5000,
        date: "2026-02-15",
        status: "completed",
    },
    {
        id: "tx-2",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "Investment",
        farm: "Wheat Rolls Valley Farm",
        farmId: "2",
        amount: 3500,
        date: "2026-04-01",
        status: "completed",
    },
    {
        id: "tx-3",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "Investment",
        farm: "Cassava Plantation Co.",
        farmId: "3",
        amount: 4000,
        date: "2025-11-01",
        status: "completed",
    },
    {
        id: "tx-4",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "ROI Payout",
        farm: "Sunrise Agrofarm",
        farmId: "5",
        amount: 2875,
        date: "2026-01-12",
        status: "completed",
    },
    {
        id: "tx-5",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "Deposit",
        farm: "Wallet",
        amount: 8000,
        date: "2026-03-20",
        status: "completed",
    },
    {
        id: "tx-6",
        userId: "user-bami",
        userName: "Bami Kamara",
        type: "Withdrawal",
        farm: "Wallet",
        amount: 600,
        date: "2026-06-08",
        status: "completed",
    },
    {
        id: "tx-7",
        userId: "inv-sarah",
        userName: "Sarah Knox",
        type: "Investment",
        farm: "Kpele Cocoa Estates",
        farmId: "8",
        amount: 2500,
        date: "2026-07-19",
        status: "completed",
    },
    {
        id: "tx-8",
        userId: "inv-bolaji",
        userName: "Bolaji Ibukun",
        type: "Investment",
        farm: "Lofa Rubber Groves",
        farmId: "9",
        amount: 12000,
        date: "2026-05-03",
        status: "completed",
    },
];

export const mockNotifications: AppNotification[] = [
    {
        id: "n-1",
        title: "Investment confirmed",
        message: "Your $3,500 stake in Wheat Rolls Valley Farm is live.",
        read: false,
        createdAt: "2026-04-01T09:12:00",
        href: "/my-investments",
    },
    {
        id: "n-2",
        title: "ROI payout received",
        message: "Sunrise Agrofarm returned $2,875 to your wallet.",
        read: false,
        createdAt: "2026-01-12T14:40:00",
        href: "/wallet",
    },
    {
        id: "n-3",
        title: "New farm listed",
        message: "Riverbend Rice Collective is now open for funding.",
        read: true,
        createdAt: "2026-06-02T08:00:00",
        href: "/farm/7",
    },
    {
        id: "n-4",
        title: "Farm update",
        message: "Green Palm Trees Farm finished its nursery expansion.",
        read: true,
        createdAt: "2026-07-22T11:20:00",
        href: "/farm/1",
    },
];

export const mockNews: NewsArticle[] = [
    {
        id: "news-1",
        title: "Green Palm Trees Farm crosses 35% funding",
        date: "Aug 12, 2026",
        excerpt:
            "The Monrovia palm project has drawn 126 investors and is on pace to close its round this quarter.",
        content:
            "Green Palm Trees Farm has raised $18,500 of its $50,000 target, putting the project past the one-third mark. New capital is earmarked for the remaining irrigation laterals and a community mill that will process fruit on-site instead of trucking it to the coast.\n\nQuarterly agronomy reports show seedling survival above 94%. Investors can follow planting photos and soil tests from the farm page. The round remains open to new commitments as small as $100.\n\nAYF continues to require independent legal and environmental review before any listing goes live — a standard this project cleared in November 2025.",
        image: farmPalmTrees,
        tag: "Milestone",
        author: "AYF Field Desk",
    },
    {
        id: "news-2",
        title: "Riverbend Rice Collective opens to investors",
        date: "Jun 4, 2026",
        excerpt:
            "A cooperative rice project in Robertsport is live, with solar pumps already in the ground.",
        content:
            "Riverbend brings 40 smallholders onto a single irrigated block with a shared hulling mill. The structure is designed so farmers keep a larger share of the finished rice price while investors receive a contracted 14% return over nine months.\n\nThree solar pumps were commissioned in August. Remaining funds will finish the mill building and buy certified seed for the May 2027 harvest.\n\nMinimum ticket is $75 — one of the most accessible listings on the platform.",
        image: farmRice,
        tag: "Announcement",
        author: "Nenneh Kollie",
    },
    {
        id: "news-3",
        title: "Q2 2026 payouts completed",
        date: "Jul 8, 2026",
        excerpt:
            "Scheduled returns for closed cycles, including Sunrise Agrofarm, have been sent to wallets.",
        content:
            "All contracted Q2 distributions cleared on time. Sunrise Agrofarm investors received principal plus 15%. Cassava Plantation Co. remains in its active growing window with the next scheduled payout in 2027.\n\nYou can download a statement from the Transactions page. If a payout is missing, write to support@ayf.africa with your reference ID.",
        image: farmWheat,
        tag: "Payout",
        author: "Finance Team",
    },
    {
        id: "news-4",
        title: "Cocoa estates send first specialty sample",
        date: "Jul 16, 2026",
        excerpt:
            "Kpele Cocoa Estates shipped a fine-flavor sample to a Swiss buyer after finishing its fermentation house.",
        content:
            "On-farm fermentation is the difference between commodity and specialty cocoa. Kpele’s new boxes and drying decks let the cooperative control flavor instead of selling wet beans.\n\nA first sample left Zwedru in July. If the buyer converts, the offtake would sit above local spot prices and support the project’s 22% modeled return.",
        image: farmCocoa,
        tag: "Update",
        author: "AYF Field Desk",
    },
];

export const mockInvestors: Investor[] = [
    {
        id: "inv-bolaji",
        name: "Bolaji Ibukun",
        email: "bolaji@ayf.africa",
        phone: "+234 801 132 0999",
        totalInvested: 18400,
        activeProjects: 5,
        joinDate: "2025-03-15",
        status: "active",
        country: "Nigeria",
    },
    {
        id: "inv-sarah",
        name: "Sarah Knox",
        email: "sarah@ayf.africa",
        phone: "+44 7950 200 100",
        totalInvested: 16250,
        activeProjects: 3,
        joinDate: "2025-06-10",
        status: "active",
        country: "United Kingdom",
    },
    {
        id: "user-bami",
        name: "Bami Kamara",
        email: "bami@ayf.africa",
        phone: "+231 77 123 4567",
        totalInvested: 15000,
        activeProjects: 3,
        joinDate: "2025-03-12",
        status: "active",
        country: "Liberia",
    },
    {
        id: "inv-adeoye",
        name: "Adeoye Mutiu",
        email: "adeoye@ayf.africa",
        phone: "+234 812 590 2341",
        totalInvested: 9100,
        activeProjects: 2,
        joinDate: "2025-09-07",
        status: "active",
        country: "Nigeria",
    },
    {
        id: "inv-ayanda",
        name: "Ayanda Lawal",
        email: "ayanda@ayf.africa",
        phone: "+234 801 998 7717",
        totalInvested: 4200,
        activeProjects: 1,
        joinDate: "2026-03-01",
        status: "inactive",
        country: "Nigeria",
    },
];

export const DEFAULT_WALLET = 8750;
export const DEFAULT_WATCHLIST = ["7", "8"];

export function formatCurrency(amount: number): string {
    if (Math.abs(amount) >= 1_000_000) {
        return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 10_000) {
        return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
    }
    return `$${amount.toLocaleString("en-US")}`;
}

export function formatFullCurrency(amount: number): string {
    return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function calculateFundingProgress(current: number, target: number): number {
    if (target <= 0) return 0;
    return Math.min(100, Math.round((current / target) * 100));
}

export function calculateExpectedReturn(amount: number, roiPercentage: number): number {
    return Math.round(amount * (1 + roiPercentage / 100));
}

export function daysBetween(from: string, to: string): number {
    const a = new Date(from).getTime();
    const b = new Date(to).getTime();
    return Math.max(0, Math.ceil((b - a) / (1000 * 60 * 60 * 24)));
}

export function addMonths(date: Date, months: number): Date {
    const next = new Date(date);
    next.setMonth(next.getMonth() + months);
    return next;
}

export function formatLongDate(value: string | Date): string {
    const d = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const COUNTRIES = [
    "Liberia",
    "Nigeria",
    "Ghana",
    "Sierra Leone",
    "Kenya",
    "South Africa",
    "Uganda",
    "Tanzania",
    "United States",
    "United Kingdom",
];

export const CROP_TYPES = [
    "Palm Oil",
    "Wheat",
    "Cassava",
    "Rice",
    "Cocoa",
    "Rubber",
    "Fruit",
    "Mixed Crops",
    "Maize",
    "Coffee",
];
