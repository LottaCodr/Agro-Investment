import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FarmForm } from "@/components/admin/FarmForm";
import { useApp } from "@/lib/store";

export default function EditFarmPage() {
    const { id } = useParams();
    const { farms } = useApp();
    const farm = farms.find((f) => f.id === id);

    return (
        <DashboardLayout userRole="admin">
            <div className="max-w-5xl mx-auto animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Farms</p>
                    <h1 className="page-header-title">Edit farm</h1>
                </div>
                {!farm ? (
                    <p className="text-[#5a6b5e]">
                        Farm not found. <Link to="/admin/farms" className="text-[#c8903c]">Back to list</Link>
                    </p>
                ) : (
                    <FarmForm farm={farm} />
                )}
            </div>
        </DashboardLayout>
    );
}
