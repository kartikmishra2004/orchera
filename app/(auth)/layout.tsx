"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && user && pathname !== "/onboarding") {
            router.replace("/dashboard");
        }
    }, [user, loading, pathname]);

    if (loading) return null;
    if (user && pathname !== "/onboarding") return null;

    return children;
}