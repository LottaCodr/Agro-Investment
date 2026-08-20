import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    DEFAULT_WALLET,
    DEFAULT_WATCHLIST,
    SEED_ADMIN,
    SEED_USER,
    addMonths,
    calculateExpectedReturn,
    daysBetween,
    mockFarms,
    mockInvestments,
    mockInvestors,
    mockNews,
    mockNotifications,
    mockTransactions,
} from "@/lib/mock-data";
import type {
    AppNotification,
    Farm,
    FarmStatus,
    Investment,
    Investor,
    NewsArticle,
    RiskLevel,
    Transaction,
    User,
    UserRole,
} from "@/lib/types";

const STORAGE_KEY = "ayf-agro-state-v1";

interface PersistedState {
    user: User | null;
    farms: Farm[];
    investments: Investment[];
    transactions: Transaction[];
    watchlist: string[];
    walletBalance: number;
    notifications: AppNotification[];
    news: NewsArticle[];
    investors: Investor[];
}

function seedState(): PersistedState {
    return {
        user: null,
        farms: mockFarms,
        investments: mockInvestments,
        transactions: mockTransactions,
        watchlist: DEFAULT_WATCHLIST,
        walletBalance: DEFAULT_WALLET,
        notifications: mockNotifications,
        news: mockNews,
        investors: mockInvestors,
    };
}

function loadState(): PersistedState {
    if (typeof window === "undefined") return seedState();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return seedState();
        const parsed = JSON.parse(raw) as Partial<PersistedState>;
        const seed = seedState();
        return {
            ...seed,
            ...parsed,
            farms: parsed.farms?.length ? parsed.farms : seed.farms,
            news: parsed.news?.length ? parsed.news : seed.news,
            investments: parsed.investments ?? seed.investments,
            transactions: parsed.transactions ?? seed.transactions,
            notifications: parsed.notifications ?? seed.notifications,
            investors: parsed.investors ?? seed.investors,
            watchlist: parsed.watchlist ?? seed.watchlist,
            walletBalance: typeof parsed.walletBalance === "number" ? parsed.walletBalance : seed.walletBalance,
            user: parsed.user ?? null,
        };
    } catch {
        return seedState();
    }
}

function uid(prefix: string): string {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export interface CreateFarmInput {
    name: string;
    location: string;
    cropType: string;
    description: string;
    targetAmount: number;
    roiPercentage: number;
    durationMonths: number;
    minInvestment: number;
    acres: number;
    harvestTime: string;
    image: string;
    images?: string[];
    riskLevel?: RiskLevel;
    status?: FarmStatus;
}

export interface CreateInvestorInput {
    name: string;
    email: string;
    phone: string;
    country: string;
}

interface AppContextValue extends PersistedState {
    isAuthenticated: boolean;
    unreadCount: number;
    signIn: (email: string, password: string, roleHint?: UserRole) => { ok: boolean; error?: string; user?: User };
    signUp: (input: { name: string; email: string; password: string; country: string; role: UserRole }) => {
        ok: boolean;
        error?: string;
        user?: User;
    };
    signOut: () => void;
    updateProfile: (patch: Partial<User>) => void;
    invest: (farmId: string, amount: number, method: "card" | "wallet") => { ok: boolean; error?: string };
    toggleWatchlist: (farmId: string) => void;
    deposit: (amount: number) => { ok: boolean; error?: string };
    withdraw: (amount: number) => { ok: boolean; error?: string };
    addFarm: (input: CreateFarmInput) => Farm;
    updateFarm: (id: string, input: Partial<CreateFarmInput> & { currentAmount?: number; investorCount?: number }) => void;
    deleteFarm: (id: string) => void;
    addInvestor: (input: CreateInvestorInput) => Investor;
    markAllNotificationsRead: () => void;
    markNotificationRead: (id: string) => void;
    resetDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<PersistedState>(() => loadState());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const persist = useCallback((updater: (prev: PersistedState) => PersistedState) => {
        setState(updater);
    }, []);

    const signIn = useCallback((email: string, _password: string, roleHint?: UserRole) => {
        const normalized = email.trim().toLowerCase();
        if (!normalized || !normalized.includes("@")) {
            return { ok: false, error: "Enter a valid email address." };
        }

        const isAdmin = roleHint === "admin" || normalized === SEED_ADMIN.email;
        const existing = state.investors.find((i) => i.email.toLowerCase() === normalized);

        const user: User = isAdmin
            ? { ...SEED_ADMIN, email: normalized === SEED_ADMIN.email ? SEED_ADMIN.email : normalized }
            : existing
              ? {
                    id: existing.id,
                    name: existing.name,
                    email: existing.email,
                    country: existing.country,
                    role: "investor",
                    phone: existing.phone,
                    joinedAt: existing.joinDate,
                }
              : {
                    ...SEED_USER,
                    email: normalized,
                    name: normalized.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                };

        persist((prev) => ({ ...prev, user }));
        return { ok: true, user };
    }, [persist, state.investors]);

    const signUp = useCallback(
        (input: { name: string; email: string; password: string; country: string; role: UserRole }) => {
            if (!input.name.trim()) return { ok: false, error: "Name is required." };
            if (!input.email.includes("@")) return { ok: false, error: "Enter a valid email." };
            if (input.password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
            if (!input.country) return { ok: false, error: "Select a country." };

            const user: User = {
                id: uid("user"),
                name: input.name.trim(),
                email: input.email.trim().toLowerCase(),
                country: input.country,
                role: input.role,
                phone: "",
                joinedAt: new Date().toISOString().slice(0, 10),
            };

            persist((prev) => {
                const already = prev.investors.some((i) => i.email === user.email);
                const investors = already || user.role === "admin"
                    ? prev.investors
                    : [
                          {
                              id: user.id,
                              name: user.name,
                              email: user.email,
                              phone: user.phone,
                              totalInvested: 0,
                              activeProjects: 0,
                              joinDate: user.joinedAt,
                              status: "active" as const,
                              country: user.country,
                          },
                          ...prev.investors,
                      ];
                return { ...prev, user, investors };
            });

            return { ok: true, user };
        },
        [persist],
    );

    const signOut = useCallback(() => {
        persist((prev) => ({ ...prev, user: null }));
    }, [persist]);

    const updateProfile = useCallback(
        (patch: Partial<User>) => {
            persist((prev) => {
                if (!prev.user) return prev;
                const user = { ...prev.user, ...patch };
                return {
                    ...prev,
                    user,
                    investors: prev.investors.map((i) =>
                        i.id === user.id || i.email === user.email
                            ? { ...i, name: user.name, email: user.email, phone: user.phone, country: user.country }
                            : i,
                    ),
                };
            });
        },
        [persist],
    );

    const invest = useCallback(
        (farmId: string, amount: number, method: "card" | "wallet") => {
            if (!state.user) return { ok: false, error: "Sign in to invest." };
            if (state.user.role === "admin") return { ok: false, error: "Admin accounts cannot invest." };
            const farm = state.farms.find((f) => f.id === farmId);
            if (!farm) return { ok: false, error: "Farm not found." };
            if (farm.status === "closed") return { ok: false, error: "This farm is no longer accepting capital." };
            if (amount < farm.minInvestment) {
                return { ok: false, error: `Minimum investment is $${farm.minInvestment.toLocaleString()}.` };
            }
            const remaining = Math.max(0, farm.targetAmount - farm.currentAmount);
            if (farm.status === "funding" && remaining > 0 && amount > remaining) {
                return { ok: false, error: `Only $${remaining.toLocaleString()} remains to be funded.` };
            }
            if (method === "wallet" && amount > state.walletBalance) {
                return { ok: false, error: "Insufficient wallet balance. Deposit funds or pay by card." };
            }

            const now = new Date();
            const payout = addMonths(now, farm.durationMonths);
            const expectedReturn = calculateExpectedReturn(amount, farm.roiPercentage);
            const investment: Investment = {
                id: uid("inv"),
                userId: state.user.id,
                farmId: farm.id,
                farm,
                amount,
                investedAt: now.toISOString().slice(0, 10),
                expectedReturn,
                expectedPayoutDate: payout.toISOString().slice(0, 10),
                daysRemaining: daysBetween(now.toISOString(), payout.toISOString()),
                progress: 2,
                status: "active",
            };
            const tx: Transaction = {
                id: uid("tx"),
                userId: state.user.id,
                userName: state.user.name,
                type: "Investment",
                farm: farm.name,
                farmId: farm.id,
                amount,
                date: now.toISOString().slice(0, 10),
                status: "completed",
            };
            const note: AppNotification = {
                id: uid("n"),
                title: "Investment confirmed",
                message: `Your $${amount.toLocaleString()} stake in ${farm.name} is live.`,
                read: false,
                createdAt: now.toISOString(),
                href: "/my-investments",
            };

            persist((prev) => {
                const nextAmount = prev.farms.map((f) => {
                    if (f.id !== farm.id) return f;
                    const currentAmount = f.currentAmount + amount;
                    const funded = currentAmount >= f.targetAmount;
                    return {
                        ...f,
                        currentAmount: Math.min(currentAmount, f.targetAmount + amount),
                        investorCount: f.investorCount + 1,
                        status: funded && f.status === "funding" ? ("active" as const) : f.status,
                    };
                });
                const updatedFarm = nextAmount.find((f) => f.id === farm.id) ?? farm;
                return {
                    ...prev,
                    farms: nextAmount,
                    investments: [{ ...investment, farm: updatedFarm }, ...prev.investments],
                    transactions: [tx, ...prev.transactions],
                    notifications: [note, ...prev.notifications],
                    walletBalance: method === "wallet" ? prev.walletBalance - amount : prev.walletBalance,
                    investors: prev.investors.map((i) =>
                        i.id === prev.user?.id || i.email === prev.user?.email
                            ? {
                                  ...i,
                                  totalInvested: i.totalInvested + amount,
                                  activeProjects: i.activeProjects + 1,
                                  status: "active",
                              }
                            : i,
                    ),
                };
            });

            return { ok: true };
        },
        [persist, state.farms, state.user, state.walletBalance],
    );

    const toggleWatchlist = useCallback(
        (farmId: string) => {
            persist((prev) => ({
                ...prev,
                watchlist: prev.watchlist.includes(farmId)
                    ? prev.watchlist.filter((id) => id !== farmId)
                    : [farmId, ...prev.watchlist],
            }));
        },
        [persist],
    );

    const deposit = useCallback(
        (amount: number) => {
            if (!state.user) return { ok: false, error: "Sign in first." };
            if (amount < 10) return { ok: false, error: "Minimum deposit is $10." };
            const now = new Date();
            persist((prev) => ({
                ...prev,
                walletBalance: prev.walletBalance + amount,
                transactions: [
                    {
                        id: uid("tx"),
                        userId: prev.user?.id ?? "guest",
                        userName: prev.user?.name ?? "You",
                        type: "Deposit",
                        farm: "Wallet",
                        amount,
                        date: now.toISOString().slice(0, 10),
                        status: "completed",
                    },
                    ...prev.transactions,
                ],
                notifications: [
                    {
                        id: uid("n"),
                        title: "Deposit received",
                        message: `$${amount.toLocaleString()} was added to your AYF wallet.`,
                        read: false,
                        createdAt: now.toISOString(),
                        href: "/wallet",
                    },
                    ...prev.notifications,
                ],
            }));
            return { ok: true };
        },
        [persist, state.user],
    );

    const withdraw = useCallback(
        (amount: number) => {
            if (!state.user) return { ok: false, error: "Sign in first." };
            if (amount < 10) return { ok: false, error: "Minimum withdrawal is $10." };
            if (amount > state.walletBalance) return { ok: false, error: "Insufficient wallet balance." };
            const now = new Date();
            persist((prev) => ({
                ...prev,
                walletBalance: prev.walletBalance - amount,
                transactions: [
                    {
                        id: uid("tx"),
                        userId: prev.user?.id ?? "guest",
                        userName: prev.user?.name ?? "You",
                        type: "Withdrawal",
                        farm: "Wallet",
                        amount,
                        date: now.toISOString().slice(0, 10),
                        status: "completed",
                    },
                    ...prev.transactions,
                ],
                notifications: [
                    {
                        id: uid("n"),
                        title: "Withdrawal sent",
                        message: `$${amount.toLocaleString()} is on its way to your bank.`,
                        read: false,
                        createdAt: now.toISOString(),
                        href: "/transactions",
                    },
                    ...prev.notifications,
                ],
            }));
            return { ok: true };
        },
        [persist, state.user, state.walletBalance],
    );

    const addFarm = useCallback(
        (input: CreateFarmInput) => {
            const farm: Farm = {
                id: uid("farm"),
                name: input.name,
                location: input.location,
                cropType: input.cropType,
                description: input.description,
                image: input.image,
                images: input.images ?? [input.image],
                targetAmount: input.targetAmount,
                currentAmount: 0,
                minInvestment: input.minInvestment,
                roiPercentage: input.roiPercentage,
                durationMonths: input.durationMonths,
                investorCount: 0,
                acres: input.acres,
                harvestTime: input.harvestTime,
                status: input.status ?? "funding",
                createdAt: new Date().toISOString().slice(0, 10),
                riskLevel: input.riskLevel ?? "medium",
                updates: [
                    {
                        date: new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }),
                        title: "Opportunity listed",
                        desc: "This farm is now open to verified investors on AYF.",
                    },
                ],
            };
            persist((prev) => ({ ...prev, farms: [farm, ...prev.farms] }));
            return farm;
        },
        [persist],
    );

    const updateFarm = useCallback(
        (id: string, input: Partial<CreateFarmInput> & { currentAmount?: number; investorCount?: number }) => {
            persist((prev) => ({
                ...prev,
                farms: prev.farms.map((f) => {
                    if (f.id !== id) return f;
                    return {
                        ...f,
                        ...input,
                        images: input.images ?? f.images,
                    };
                }),
                investments: prev.investments.map((inv) =>
                    inv.farmId === id
                        ? { ...inv, farm: { ...inv.farm, ...input, images: input.images ?? inv.farm.images } }
                        : inv,
                ),
            }));
        },
        [persist],
    );

    const deleteFarm = useCallback(
        (id: string) => {
            persist((prev) => ({
                ...prev,
                farms: prev.farms.filter((f) => f.id !== id),
                watchlist: prev.watchlist.filter((fid) => fid !== id),
            }));
        },
        [persist],
    );

    const addInvestor = useCallback(
        (input: CreateInvestorInput) => {
            const investor: Investor = {
                id: uid("invr"),
                name: input.name,
                email: input.email,
                phone: input.phone,
                country: input.country,
                totalInvested: 0,
                activeProjects: 0,
                joinDate: new Date().toISOString().slice(0, 10),
                status: "active",
            };
            persist((prev) => ({ ...prev, investors: [investor, ...prev.investors] }));
            return investor;
        },
        [persist],
    );

    const markAllNotificationsRead = useCallback(() => {
        persist((prev) => ({
            ...prev,
            notifications: prev.notifications.map((n) => ({ ...n, read: true })),
        }));
    }, [persist]);

    const markNotificationRead = useCallback(
        (id: string) => {
            persist((prev) => ({
                ...prev,
                notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
            }));
        },
        [persist],
    );

    const resetDemo = useCallback(() => {
        const fresh = seedState();
        setState(fresh);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }, []);

    const unreadCount = state.notifications.filter((n) => !n.read).length;

    const value = useMemo<AppContextValue>(
        () => ({
            ...state,
            isAuthenticated: Boolean(state.user),
            unreadCount,
            signIn,
            signUp,
            signOut,
            updateProfile,
            invest,
            toggleWatchlist,
            deposit,
            withdraw,
            addFarm,
            updateFarm,
            deleteFarm,
            addInvestor,
            markAllNotificationsRead,
            markNotificationRead,
            resetDemo,
        }),
        [
            state,
            unreadCount,
            signIn,
            signUp,
            signOut,
            updateProfile,
            invest,
            toggleWatchlist,
            deposit,
            withdraw,
            addFarm,
            updateFarm,
            deleteFarm,
            addInvestor,
            markAllNotificationsRead,
            markNotificationRead,
            resetDemo,
        ],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
}
