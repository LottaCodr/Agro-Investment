import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmForm } from "@/components/admin/FarmForm";

export default function AddNewInvestment() {
    return (
        <DashboardLayout userRole="admin">
            <div className="max-w-5xl mx-auto animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Farms</p>
                    <h1 className="page-header-title">Add opportunity</h1>
                    <p className="page-header-subtitle">List a verified farm. It appears on Discover immediately.</p>
                </div>
                <FarmForm />
            </div>
        </DashboardLayout>
    );
}
