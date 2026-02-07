"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/signin");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-zinc-50">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-blue-400 animate-spin" />
            </div>
        </div>;
    }

    if (!user) return null;

    return children;
}
