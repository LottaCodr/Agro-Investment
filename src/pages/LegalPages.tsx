import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f7f3ed]">
            <header className="h-16 px-6 flex items-center border-b border-[#e8e0d4] bg-white/70 backdrop-blur">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#5a6b5e] hover:text-[#0e2a1a]">
                    <ArrowLeft className="w-4 h-4" /> Home
                </Link>
                <span className="ml-4 font-semibold text-[#0e2a1a]">AYF</span>
            </header>
            <article className="max-w-2xl mx-auto px-6 py-14">
                <h1 className="ayf-heading text-4xl mb-6">{title}</h1>
                <div className="space-y-4 text-[#3d4d41] leading-relaxed text-[15px]">{children}</div>
            </article>
        </div>
    );
}

export function PrivacyPage() {
    return (
        <Shell title="Privacy policy">
            <p>African Youth Forum (“AYF”) stores the name, email, and investment activity you enter in this demo on your device via localStorage. We do not send it to a server.</p>
            <p>In a production deployment we would collect identity documents for KYC, keep them with a regulated processor, and never sell personal data.</p>
            <p>You can wipe local demo data from Profile → Reset demo data.</p>
        </Shell>
    );
}

export function TermsPage() {
    return (
        <Shell title="Terms of service">
            <p>This interface is a product demonstration. Figures, farms, and returns are illustrative. Nothing here is an offer of securities or a promise of profit.</p>
            <p>Agriculture involves weather, price, and operational risk. You can lose some or all of the capital you allocate to a cycle.</p>
            <p>By using the demo you agree not to treat displayed balances as real money.</p>
        </Shell>
    );
}

export function ContactPage() {
    const [sent, setSent] = useState(false);
    return (
        <Shell title="Contact">
            <p>
                Partnerships and support: <a className="text-[#c8903c] font-medium" href="mailto:hello@ayf.africa">hello@ayf.africa</a>
            </p>
            <p>Monrovia office hours: Monday–Friday, 9:00–17:00 GMT.</p>
            <form
                className="mt-6 space-y-3"
                onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    toast.success("Message noted — demo inbox only.");
                }}
            >
                <input required placeholder="Your name" className="w-full h-11 rounded-xl border px-3 bg-white" />
                <input required type="email" placeholder="Email" className="w-full h-11 rounded-xl border px-3 bg-white" />
                <textarea required rows={4} placeholder="How can we help?" className="w-full rounded-xl border px-3 py-2 bg-white" />
                <button type="submit" className="px-5 h-11 rounded-full bg-[#0e2a1a] text-white text-sm font-semibold">
                    {sent ? "Sent" : "Send message"}
                </button>
            </form>
        </Shell>
    );
}
