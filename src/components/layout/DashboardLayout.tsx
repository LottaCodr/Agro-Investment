import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
    children: React.ReactNode;
    userRole?: "investor" | "admin";
}

export function DashboardLayout({ children, userRole = "investor" }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen" style={{ background: "#f7f3ed" }}>
            <Sidebar
                userRole={userRole}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-[260px]">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="px-6 py-6 lg:px-8 lg:py-8 max-w-[1400px] mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
