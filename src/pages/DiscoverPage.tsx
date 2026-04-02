import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmCard } from "@/components/dashboard/FarmCard";
import { mockFarms } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DiscoverPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFarms = mockFarms.filter(farm =>
        farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout userRole="investor">
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Discover Farms</h1>
                        <p className="text-muted-foreground">Find and invest in verified agricultural projects</p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search farms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFarms.map((farm, index) => (
                        <div
                            key={farm.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <FarmCard farm={farm} />
                        </div>
                    ))}
                </div>

                {filteredFarms.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No farms found matching your search.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
