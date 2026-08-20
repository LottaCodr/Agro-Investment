import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { formatLongDate } from "@/lib/mock-data";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
    const { notifications, markNotificationRead, markAllNotificationsRead, user } = useApp();
    const navigate = useNavigate();

    return (
        <DashboardLayout userRole={user?.role === "admin" ? "admin" : "investor"}>
            <div className="max-w-2xl space-y-6 animate-fade-in">
                <div className="page-header flex items-end justify-between gap-4">
                    <div>
                        <p className="section-tag">Inbox</p>
                        <h1 className="page-header-title">Notifications</h1>
                    </div>
                    <button
                        type="button"
                        className="text-sm font-semibold text-[#c8903c]"
                        onClick={markAllNotificationsRead}
                    >
                        Mark all read
                    </button>
                </div>
                <div className="rounded-2xl bg-white border border-[#e8e0d4] overflow-hidden">
                    {notifications.length === 0 && (
                        <div className="py-16 text-center text-[#5a6b5e]">
                            <Bell className="w-7 h-7 mx-auto mb-2 text-[#c8903c]" />
                            No notifications yet.
                        </div>
                    )}
                    {notifications.map((n) => (
                        <button
                            key={n.id}
                            type="button"
                            className="w-full text-left px-5 py-4 border-b border-[#e8e0d4] last:border-0 hover:bg-[#f7f3ed]/70"
                            onClick={() => {
                                markNotificationRead(n.id);
                                if (n.href) navigate(n.href);
                            }}
                        >
                            <div className="flex justify-between gap-3">
                                <p className="font-semibold text-[#0e2a1a]">{n.title}</p>
                                {!n.read && <span className="w-2 h-2 rounded-full bg-[#c8903c] mt-2 flex-shrink-0" />}
                            </div>
                            <p className="text-sm text-[#5a6b5e] mt-0.5">{n.message}</p>
                            <p className="text-[11px] text-[#8a948c] mt-1">{formatLongDate(n.createdAt)}</p>
                        </button>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
