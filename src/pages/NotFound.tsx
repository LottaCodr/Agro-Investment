import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6">
            <div className="text-center max-w-md">
                <p className="section-tag">404</p>
                <h1 className="ayf-heading text-6xl mb-3">This field is empty</h1>
                <p className="mb-8 text-[#5a6b5e]">
                    We could not find <span className="font-medium text-[#0e2a1a]">{location.pathname}</span>.
                </p>
                <Link
                    to="/"
                    className="inline-flex px-6 py-3 rounded-full bg-[#0e2a1a] text-white text-sm font-semibold"
                >
                    Return home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
