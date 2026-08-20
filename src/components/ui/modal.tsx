import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <button
                type="button"
                aria-label="Close dialog"
                className="absolute inset-0 bg-[#0e2a1a]/45 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    "relative z-10 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white shadow-xl border border-[#e8e0d4] p-6 animate-scale-in",
                    className,
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1.5 rounded-lg text-[#5a6b5e] hover:bg-[#f7f3ed]"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
                {title && (
                    <h3 className="text-xl font-semibold pr-8 ayf-heading" style={{ color: "#0e2a1a" }}>
                        {title}
                    </h3>
                )}
                {description && <p className="text-sm mt-1 mb-4" style={{ color: "#5a6b5e" }}>{description}</p>}
                {children}
            </div>
        </div>
    );
}

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    destructive?: boolean;
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirm",
    destructive,
}: ConfirmDialogProps) {
    return (
        <Modal open={open} onClose={onClose} title={title} description={description}>
            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 h-10 rounded-full text-sm font-medium border border-[#e8e0d4] hover:bg-[#f7f3ed]"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="px-4 h-10 rounded-full text-sm font-semibold text-white"
                    style={{ background: destructive ? "#dc2626" : "linear-gradient(135deg, #0e2a1a, #1a4a2e)" }}
                >
                    {confirmLabel}
                </button>
            </div>
        </Modal>
    );
}
