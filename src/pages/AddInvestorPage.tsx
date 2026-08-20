import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export default function AddInvestorPage() {
    const { addInvestor } = useApp();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", phone: "", country: "Liberia" });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email.includes("@")) {
            toast.error("Name and a valid email are required.");
            return;
        }
        addInvestor(form);
        toast.success("Investor added");
        navigate("/admin/investors");
    };

    return (
        <DashboardLayout userRole="admin">
            <div className="max-w-lg animate-fade-in">
                <div className="page-header">
                    <p className="section-tag">Admin · Investors</p>
                    <h1 className="page-header-title">Add investor</h1>
                </div>
                <form onSubmit={submit} className="rounded-2xl bg-white border border-[#e8e0d4] p-6 space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input className="mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                        <Label>Country</Label>
                        <select
                            className="mt-1.5 w-full h-9 rounded-md border px-3"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                        >
                            {COUNTRIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="text-white rounded-xl" style={{ background: "#0e2a1a" }}>
                        Create investor
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
