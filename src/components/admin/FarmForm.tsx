import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle, Plus } from "lucide-react";
import { CROP_TYPES } from "@/lib/mock-data";
import { useApp, type CreateFarmInput } from "@/lib/store";
import type { Farm, FarmStatus, RiskLevel } from "@/lib/types";
import { toast } from "sonner";
import farmPalmTrees from "@/assets/farm-palm-trees.jpg";

function readFiles(files: FileList): Promise<string[]> {
    return Promise.all(
        Array.from(files).map(
            (file) =>
                new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result));
                    reader.readAsDataURL(file);
                }),
        ),
    );
}

export function FarmForm({ farm }: { farm?: Farm }) {
    const navigate = useNavigate();
    const { addFarm, updateFarm } = useApp();
    const [form, setForm] = useState({
        name: farm?.name ?? "",
        location: farm?.location ?? "",
        cropType: farm?.cropType ?? "Palm Oil",
        description: farm?.description ?? "",
        targetAmount: farm ? String(farm.targetAmount) : "",
        roiPercentage: farm ? String(farm.roiPercentage) : "",
        durationMonths: farm ? String(farm.durationMonths) : "",
        minInvestment: farm ? String(farm.minInvestment) : "100",
        acres: farm ? String(farm.acres) : "",
        harvestTime: farm?.harvestTime ?? "",
        riskLevel: (farm?.riskLevel ?? "medium") as RiskLevel,
        status: (farm?.status ?? "funding") as FarmStatus,
    });
    const [images, setImages] = useState<string[]>(farm?.images?.length ? farm.images : farm?.image ? [farm.image] : [farmPalmTrees]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const urls = await readFiles(e.target.files);
        setImages((prev) => [...prev, ...urls].slice(0, 5));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const payload: CreateFarmInput = {
            name: form.name.trim(),
            location: form.location.trim(),
            cropType: form.cropType,
            description: form.description.trim(),
            targetAmount: Number(form.targetAmount),
            roiPercentage: Number(form.roiPercentage),
            durationMonths: Number(form.durationMonths),
            minInvestment: Number(form.minInvestment),
            acres: Number(form.acres),
            harvestTime: form.harvestTime,
            image: images[0] ?? farmPalmTrees,
            images,
            riskLevel: form.riskLevel,
            status: form.status,
        };
        if (!payload.name || !payload.targetAmount) {
            toast.error("Name and target amount are required.");
            return;
        }
        if (farm) {
            updateFarm(farm.id, payload);
            toast.success("Farm updated");
        } else {
            addFarm(payload);
            toast.success("Opportunity listed");
        }
        navigate("/admin/farms");
    }

    return (
        <form className="space-y-0 bg-white rounded-2xl border border-[#e8e0d4]" onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-6 border-b border-[#e8e0d4] pb-2">Basic information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="name" className="mb-2 block">Opportunity name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handleChange} required className="bg-[#f7f3ed]" />
                        </div>
                        <div>
                            <Label htmlFor="location" className="mb-2 block">Location</Label>
                            <Input id="location" name="location" value={form.location} onChange={handleChange} required className="bg-[#f7f3ed]" />
                        </div>
                        <div>
                            <Label htmlFor="cropType" className="mb-2 block">Crop</Label>
                            <select id="cropType" name="cropType" value={form.cropType} onChange={handleChange} className="w-full h-9 rounded-md border px-3 bg-[#f7f3ed]">
                                {CROP_TYPES.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <Label htmlFor="description" className="mb-2 block">Description</Label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full border rounded-lg px-3 py-2 bg-[#f7f3ed]"
                    />
                </div>

                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-6 border-b border-[#e8e0d4] pb-2">Financials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            ["targetAmount", "Target amount (USD)", "50000"],
                            ["roiPercentage", "Projected ROI %", "15"],
                            ["durationMonths", "Duration (months)", "12"],
                            ["minInvestment", "Min investment", "100"],
                            ["acres", "Size (acres)", "80"],
                            ["harvestTime", "Harvest window", "Oct 2027"],
                        ].map(([name, label, ph]) => (
                            <div key={name}>
                                <Label htmlFor={name} className="mb-2 block">{label}</Label>
                                <Input
                                    id={name}
                                    name={name}
                                    value={form[name as keyof typeof form]}
                                    onChange={handleChange}
                                    placeholder={ph}
                                    required
                                    className="bg-[#f7f3ed]"
                                />
                            </div>
                        ))}
                        <div>
                            <Label htmlFor="riskLevel" className="mb-2 block">Risk</Label>
                            <select id="riskLevel" name="riskLevel" value={form.riskLevel} onChange={handleChange} className="w-full h-9 rounded-md border px-3 bg-[#f7f3ed]">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="status" className="mb-2 block">Status</Label>
                            <select id="status" name="status" value={form.status} onChange={handleChange} className="w-full h-9 rounded-md border px-3 bg-[#f7f3ed]">
                                <option value="funding">Funding</option>
                                <option value="active">Active</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-3">Images</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                        {images.map((url, idx) => (
                            <div key={`${url.slice(0, 24)}-${idx}`} className="relative w-28 h-20 rounded-lg overflow-hidden border">
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImages((imgs) => imgs.filter((_, i) => i !== idx))}
                                    className="absolute top-1 right-1 bg-white rounded-full"
                                >
                                    <XCircle size={16} className="text-red-500" />
                                </button>
                            </div>
                        ))}
                        {images.length < 5 && (
                            <label className="w-28 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer text-[#5a6b5e]">
                                <Plus className="w-4 h-4" />
                                <span className="text-xs">Add</span>
                                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                            </label>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate("/admin/farms")}>
                        Cancel
                    </Button>
                    <Button type="submit" className="h-11 px-8 rounded-xl text-white" style={{ background: "#0e2a1a" }}>
                        {farm ? "Save changes" : "Create opportunity"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
