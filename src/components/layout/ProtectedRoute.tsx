import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "@/lib/store";
import type { UserRole } from "@/lib/types";

export function ProtectedRoute({
    children,
    role,
}: {
    children: React.ReactNode;
    role?: UserRole;
}) {
    const { user } = useApp();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
    }

    if (role && user.role !== role) {
        return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
    }

    return <>{children}</>;
}
