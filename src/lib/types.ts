export type FarmStatus = "funding" | "active" | "closed";
export type RiskLevel = "low" | "medium" | "high";
export type UserRole = "investor" | "admin";
export type InvestmentStatus = "active" | "completed";
export type TransactionType = "Investment" | "ROI Payout" | "Withdrawal" | "Deposit";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface FarmUpdate {
    date: string;
    title: string;
    desc: string;
}

export interface Farm {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    images?: string[];
    targetAmount: number;
    currentAmount: number;
    minInvestment: number;
    roiPercentage: number;
    durationMonths: number;
    investorCount: number;
    acres: number;
    harvestTime: string;
    status: FarmStatus;
    createdAt: string;
    cropType: string;
    riskLevel: RiskLevel;
    updates: FarmUpdate[];
}

export interface Investment {
    id: string;
    userId?: string;
    farmId: string;
    farm: Farm;
    amount: number;
    investedAt: string;
    expectedReturn: number;
    expectedPayoutDate: string;
    daysRemaining: number;
    progress: number;
    status: InvestmentStatus;
}

export interface User {
    id: string;
    name: string;
    email: string;
    country: string;
    role: UserRole;
    phone: string;
    joinedAt: string;
}

export interface Transaction {
    id: string;
    userId: string;
    userName: string;
    type: TransactionType;
    farm: string;
    farmId?: string;
    amount: number;
    date: string;
    status: TransactionStatus;
}

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    href?: string;
}

export interface NewsArticle {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
    tag: string;
    author: string;
}

export interface Investor {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalInvested: number;
    activeProjects: number;
    joinDate: string;
    status: "active" | "inactive";
    country: string;
}
