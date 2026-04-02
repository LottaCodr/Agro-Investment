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
        <div className="min-h-screen bg-background">
            <Sidebar
                userRole={userRole}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-[220px]">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
