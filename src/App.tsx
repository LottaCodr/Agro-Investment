import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/lib/store";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";
import FarmDetailsPage from "./pages/FarmDetailsPage";
import MyInvestmentsPage from "./pages/MyInvestmentsPage";
import TransactionsPage from "./pages/TransactionsPage";
import NewsPage from "./pages/NewsPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";
import AddNewInvestment from "./pages/AddNewInvestment";
import AdminReports from "./pages/AdminReports";
import AdminTransactionsPage from "./pages/AdminTransactionsPage";
import AdminInvestor from "./pages/AdminInvestor";
import AdminFarmPage from "./pages/AdminFarm";
import EditFarmPage from "./pages/EditFarmPage";
import AddInvestorPage from "./pages/AddInvestorPage";
import WalletPage from "./pages/WalletPage";
import WatchlistPage from "./pages/WatchlistPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import { PrivacyPage, TermsPage, ContactPage } from "./pages/LegalPages";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AppProvider>
            <TooltipProvider>
                <Sonner />
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
                        <Route path="/farm/:id" element={<ProtectedRoute><FarmDetailsPage /></ProtectedRoute>} />
                        <Route path="/my-investments" element={<ProtectedRoute><MyInvestmentsPage /></ProtectedRoute>} />
                        <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
                        <Route path="/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
                        <Route path="/news/:id" element={<ProtectedRoute><NewsArticlePage /></ProtectedRoute>} />
                        <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
                        <Route path="/watchlist" element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

                        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
                        <Route path="/admin/farms" element={<ProtectedRoute role="admin"><AdminFarmPage /></ProtectedRoute>} />
                        <Route path="/admin/farm/new" element={<ProtectedRoute role="admin"><AddNewInvestment /></ProtectedRoute>} />
                        <Route path="/admin/farm/:id/edit" element={<ProtectedRoute role="admin"><EditFarmPage /></ProtectedRoute>} />
                        <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>} />
                        <Route path="/admin/transactions" element={<ProtectedRoute role="admin"><AdminTransactionsPage /></ProtectedRoute>} />
                        <Route path="/admin/investors" element={<ProtectedRoute role="admin"><AdminInvestor /></ProtectedRoute>} />
                        <Route path="/admin/investor/new" element={<ProtectedRoute role="admin"><AddInvestorPage /></ProtectedRoute>} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </AppProvider>
    </QueryClientProvider>
);

export default App;
