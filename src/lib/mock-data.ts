import farmPalmTrees from "@/assets/farm-palm-trees.jpg";
import farmWheat from "@/assets/farm-wheat.jpg";
import farmCassava from "@/assets/farm-cassava.jpg";

export interface Farm {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    targetAmount: number;
    currentAmount: number;
    minInvestment: number;
    roiPercentage: number;
    durationMonths: number;
    investorCount: number;
    acres: number;
    harvestTime: string;
    status: "funding" | "active" | "closed";
    createdAt: string;
}

export interface Investment {
    id: string;
    farmId: string;
    farm: Farm;
    amount: number;
    investedAt: string;
    expectedReturn: number;
    expectedPayoutDate: string;
    daysRemaining: number;
    progress: number;
    status: "active" | "completed";
}

export interface UserStats {
    totalInvested: number;
    activeProjects: number;
    roiEarned: number;
    monthlyGrowth: number;
    projectGrowth: number;
    roiGrowthAllTime: number;
}

export const mockFarms: Farm[] = [
    {
        id: "1",
        name: "Green Palm Trees Farm",
        location: "Monrovia, Liberia",
        description: "Green Palm Trees Farm is a project dedicated to sustainable agriculture and community empowerment in the Volta Region of Ghana. By focusing on high-yield, drought-resistant cassava varieties, we aim to boost local food security and create stable economic opportunities. Your investment will directly fund the expansion of our cultivation area, purchase of modern farming equipment, and implementation of water-efficient irrigation systems.",
        image: farmPalmTrees,
        targetAmount: 50000,
        currentAmount: 10500,
        minInvestment: 100,
        roiPercentage: 15,
        durationMonths: 6,
        investorCount: 250,
        acres: 150,
        harvestTime: "October 2024",
        status: "funding",
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Wheat Rolls Valley Farm",
        location: "Monrovia, Liberia",
        description: "A premium wheat production facility using modern agricultural techniques to maximize yield and quality.",
        image: farmWheat,
        targetAmount: 75000,
        currentAmount: 45000,
        minInvestment: 100,
        roiPercentage: 18.5,
        durationMonths: 12,
        investorCount: 320,
        acres: 234,
        harvestTime: "February 2025",
        status: "funding",
        createdAt: "2024-02-01",
    },
    {
        id: "3",
        name: "Cassava Plantation Co.",
        location: "Buchanan, Liberia",
        description: "Large-scale cassava production for both local consumption and export markets.",
        image: farmCassava,
        targetAmount: 120000,
        currentAmount: 120000,
        minInvestment: 150,
        roiPercentage: 20,
        durationMonths: 18,
        investorCount: 450,
        acres: 310,
        harvestTime: "April 2025",
        status: "active",
        createdAt: "2023-10-01",
    },
    {
        id: "4",
        name: "Grain Wheat Plantation",
        location: "Gbarnga, Liberia",
        description: "Sustainable grain production using eco-friendly farming methods.",
        image: farmWheat,
        targetAmount: 90000,
        currentAmount: 67500,
        minInvestment: 100,
        roiPercentage: 16,
        durationMonths: 24,
        investorCount: 280,
        acres: 190,
        harvestTime: "March 2026",
        status: "funding",
        createdAt: "2024-03-01",
    },
    {
        id: "5",
        name: "Sunrise Agrofarm",
        location: "Harper, Liberia",
        description: "Mixed crop farming operation focused on sustainable yields.",
        image: farmCassava,
        targetAmount: 50000,
        currentAmount: 50000,
        minInvestment: 100,
        roiPercentage: 15,
        durationMonths: 12,
        investorCount: 180,
        acres: 110,
        harvestTime: "June 2024",
        status: "closed",
        createdAt: "2023-06-01",
    },
    {
        id: "6",
        name: "Baobab Orchards",
        location: "Kakata, Liberia",
        description: "Premium fruit orchards with export-quality produce.",
        image: farmPalmTrees,
        targetAmount: 90000,
        currentAmount: 72000,
        minInvestment: 200,
        roiPercentage: 20,
        durationMonths: 36,
        investorCount: 150,
        acres: 90,
        harvestTime: "December 2026",
        status: "funding",
        createdAt: "2024-01-20",
    },
];

export const mockInvestments: Investment[] = [
    {
        id: "inv-1",
        farmId: "1",
        farm: mockFarms[0],
        amount: 5000,
        investedAt: "2024-06-15",
        expectedReturn: 5750,
        expectedPayoutDate: "2025-06-15",
        daysRemaining: 120,
        progress: 75,
        status: "active",
    },
    {
        id: "inv-2",
        farmId: "2",
        farm: mockFarms[1],
        amount: 5000,
        investedAt: "2024-08-01",
        expectedReturn: 5925,
        expectedPayoutDate: "2025-08-01",
        daysRemaining: 120,
        progress: 75,
        status: "active",
    },
    {
        id: "inv-3",
        farmId: "3",
        farm: mockFarms[2],
        amount: 5000,
        investedAt: "2024-03-01",
        expectedReturn: 6000,
        expectedPayoutDate: "2025-09-01",
        daysRemaining: 120,
        progress: 75,
        status: "active",
    },
];

export const mockUserStats: UserStats = {
    totalInvested: 11800000,
    activeProjects: 11,
    roiEarned: 7800000,
    monthlyGrowth: 5.2,
    projectGrowth: 1,
    roiGrowthAllTime: 12.5,
};

export function formatCurrency(amount: number): string {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
}

export function formatFullCurrency(amount: number): string {
    return `$${amount.toLocaleString()}`;
}

export function calculateFundingProgress(current: number, target: number): number {
    return Math.round((current / target) * 100);
}

export function calculateExpectedReturn(amount: number, roiPercentage: number): number {
    return Math.round(amount * (1 + roiPercentage / 100));
}
