import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Mail, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { COUNTRIES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import type { UserRole } from "@/lib/types";
import farmPalmTrees from "@/assets/farm-palm-trees.jpg";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>("signin");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signUp, user } = useApp();
    const from = (location.state as { from?: string } | null)?.from;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
        role: "investor" as UserRole,
    });

    if (user) {
        return <Navigate to={from || (user.role === "admin" ? "/admin" : "/dashboard")} replace />;
    }

    const goAfterAuth = (role: UserRole) => {
        if (from) {
            navigate(from, { replace: true });
            return;
        }
        navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 500));

        if (mode === "signin") {
            const result = signIn(formData.email, formData.password, formData.role);
            setIsLoading(false);
            if (!result.ok) {
                toast.error(result.error);
                return;
            }
            toast.success(`Welcome back${result.user ? `, ${result.user.name.split(" ")[0]}` : ""}`);
            goAfterAuth(result.user?.role ?? "investor");
            return;
        }

        const result = signUp(formData);
        setIsLoading(false);
        if (!result.ok) {
            toast.error(result.error);
            return;
        }
        toast.success("Account created. You are in.");
        goAfterAuth(result.user?.role ?? "investor");
    };

    const demo = (role: UserRole) => {
        const email = role === "admin" ? "admin@ayf.africa" : "bami@ayf.africa";
        const result = signIn(email, "demo1234", role);
        if (result.ok) {
            toast.success(role === "admin" ? "Signed in as admin" : "Signed in as Bami");
            goAfterAuth(role);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f7f3ed]">
            <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden">
                <img src={farmPalmTrees} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a1a] via-[#0e2a1a]/70 to-[#0e2a1a]/30" />
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#c8903c] flex items-center justify-center font-bold">
                            AYF
                        </div>
                        <span className="text-lg font-semibold">African Youth Forum</span>
                    </Link>
                    <div>
                        <p className="text-[#e8b060] text-xs font-semibold tracking-[2px] uppercase mb-3">
                            Agriculture · West Africa
                        </p>
                        <h2 className="ayf-heading text-5xl leading-tight mb-4">
                            Capital that <em className="italic text-[#e8b060]">reaches</em> the field
                        </h2>
                        <p className="text-white/65 max-w-sm font-light">
                            Join 2,500+ investors funding verified farms — with live progress and contracted payouts.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm text-[#5a6b5e] hover:text-[#0e2a1a] mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>

                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#c8903c] text-white font-bold flex items-center justify-center">
                            AYF
                        </div>
                        <span className="text-lg font-semibold">African Youth Forum</span>
                    </div>

                    <p className="text-[#5a6b5e] mb-1">
                        {mode === "signin" ? "Welcome back." : "Open an account in a minute."}
                    </p>
                    <h1 className="ayf-heading text-4xl mb-8">
                        {mode === "signin" ? "Sign in" : "Create account"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "signup" && (
                            <div>
                                <Label htmlFor="name">Full name</Label>
                                <div className="relative mt-1.5">
                                    <Input
                                        id="name"
                                        placeholder="Bami Kamara"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="pr-10 h-11 rounded-xl bg-white"
                                    />
                                    <User className="input-icon w-4 h-4" />
                                </div>
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative mt-1.5">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="pr-10 h-11 rounded-xl bg-white"
                                />
                                <Mail className="input-icon w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative mt-1.5">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={mode === "signup" ? 6 : 1}
                                    className="pr-10 h-11 rounded-xl bg-white"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6b5e]"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {mode === "signup" && (
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                                >
                                    <SelectTrigger className="mt-1.5 h-11 rounded-xl bg-white">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COUNTRIES.map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div>
                            <Label>I am a</Label>
                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                                {(["investor", "admin"] as const).map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className="h-11 rounded-xl text-sm font-medium capitalize border transition"
                                        style={
                                            formData.role === role
                                                ? { background: "#0e2a1a", color: "white", borderColor: "#0e2a1a" }
                                                : { background: "white", color: "#5a6b5e", borderColor: "hsl(34 25% 85%)" }
                                        }
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full btn-primary-gradient h-12 text-base rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                        </Button>
                    </form>

                    <div className="mt-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 bg-white border rounded-xl"
                            disabled={isLoading}
                            onClick={() => demo("investor")}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden>
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue as demo investor
                        </Button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => demo("investor")}
                            className="text-xs py-2 rounded-lg border border-[#e8e0d4] bg-white hover:bg-[#f7f3ed]"
                        >
                            Demo: bami@ayf.africa
                        </button>
                        <button
                            type="button"
                            onClick={() => demo("admin")}
                            className="text-xs py-2 rounded-lg border border-[#e8e0d4] bg-white hover:bg-[#f7f3ed]"
                        >
                            Demo: admin@ayf.africa
                        </button>
                    </div>

                    <p className="text-center text-[#5a6b5e] mt-6 text-sm">
                        {mode === "signin" ? (
                            <>
                                New here?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("signup")}
                                    className="text-[#1a4a2e] font-semibold hover:underline"
                                >
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("signin")}
                                    className="text-[#1a4a2e] font-semibold hover:underline"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
