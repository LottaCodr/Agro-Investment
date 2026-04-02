// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";
import FarmDetailsPage from "./pages/FarmDetailsPage";
import MyInvestmentsPage from "./pages/MyInvestmentsPage";
import TransactionsPage from "./pages/TransactionsPage";
import NewsPage from "./pages/NewsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";
import AddNewInvestment from "./pages/AddNewInvestment";
import AdminReports from "./pages/AdminReports";
import AdminTransactionsPage from "./pages/AdminTransactionsPage";
import AdminInvestor from "./pages/AdminInvestor";
import AdminFarmPage from "./pages/AdminFarm";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            {/* <Toaster /> */}
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/discover" element={<DiscoverPage />} />
                    <Route path="/farm/:id" element={<FarmDetailsPage />} />
                    <Route path="/my-investments" element={<MyInvestmentsPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/farms" element={<AdminFarmPage />} />
                    <Route path="/admin/farm/new" element={<AddNewInvestment />} />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
                    <Route path="/admin/investors" element={<AdminInvestor />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
