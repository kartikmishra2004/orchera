"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {

    const { user, logoutUser } = useAuth();

    return (
        <header className="w-full fixed top-0 z-50 bg-white/60 backdrop-blur-lg h-16 border-b border-zinc-200 flex justify-between items-center px-8">
            <Link href="/" className="font-semibold text-zinc-700 gap-1 flex items-center">
                <Image alt='' src='logo.svg' width={19} height={19} />
                ORCHERA
            </Link>
            <nav className="flex gap-6 items-center">
                <Link href="#features" className="text-sm text-zinc-500 hover:text-zinc-700">Features</Link>
                <Link href="#pricing" className="text-sm text-zinc-500 hover:text-zinc-700">Pricing</Link>
                <Link href="#faq" className="text-sm text-zinc-500 hover:text-zinc-700">FAQ</Link>
                {!user && (<>
                    <Link href="/signin" className="text-sm text-zinc-700 hover:text-zinc-900 ml-2">Sign in</Link>
                    <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 h-8 px-4 rounded-sm text-sm font-normal text-zinc-50 flex items-center transition-colors"> Sign up </Link>
                </>)}
                {user && (<>
                    <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-700">Dashboard</Link>
                    <button onClick={logoutUser} className="text-sm text-red-500 hover:text-red-600 cursor-pointer">Log out</button>
                </>)}
            </nav>
        </header>
    )
}