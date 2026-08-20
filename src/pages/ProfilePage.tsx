import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { COUNTRIES } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/modal";

export default function ProfilePage() {
    const { user, updateProfile, resetDemo, signOut } = useApp();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        country: user?.country ?? "",
    });
    const [confirmReset, setConfirmReset] = useState(false);

    const save = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(form);
        toast.success("Profile updated");
    };

    return (
        <DashboardLayout userRole={user?.role === "admin" ? "admin" : "investor"}>
            <div className="max-w-xl animate-fade-in space-y-8">
                <div className="page-header">
                    <p className="section-tag">Account</p>
                    <h1 className="page-header-title">Profile settings</h1>
                    <p className="page-header-subtitle">How you appear across AYF. Stored on this device.</p>
                </div>

                <form onSubmit={save} className="rounded-2xl bg-white border border-[#e8e0d4] p-6 space-y-4">
                    <div>
                        <Label htmlFor="name">Full name</Label>
                        <Input
                            id="name"
                            className="mt-1.5 h-11 rounded-xl"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1.5 h-11 rounded-xl"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            className="mt-1.5 h-11 rounded-xl"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+231 …"
                        />
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <select
                            id="country"
                            className="mt-1.5 w-full h-11 rounded-xl border border-[#e8e0d4] px-3"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                        >
                            {COUNTRIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="rounded-xl h-11 px-6 text-white" style={{ background: "#0e2a1a" }}>
                        Save changes
                    </Button>
                </form>

                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
                    <h2 className="font-semibold text-[#0e2a1a] mb-1">Demo data</h2>
                    <p className="text-sm text-[#5a6b5e] mb-4">
                        Reset restores the original farms, wallet, and investments on this browser.
                    </p>
                    <button
                        type="button"
                        className="text-sm font-semibold text-red-700 hover:underline"
                        onClick={() => setConfirmReset(true)}
                    >
                        Reset demo data
                    </button>
                </div>
            </div>

            <ConfirmDialog
                open={confirmReset}
                onClose={() => setConfirmReset(false)}
                title="Reset this browser?"
                description="Farms you added, investments, and wallet history will be replaced with the original demo."
                confirmLabel="Reset"
                destructive
                onConfirm={() => {
                    resetDemo();
                    signOut();
                    toast.success("Demo reset. Sign in again.");
                    navigate("/auth");
                }}
            />
        </DashboardLayout>
    );
}
