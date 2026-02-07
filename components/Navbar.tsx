"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {

    const { user, logoutUser } = useAuth();

    return (
        <header className="w-full fixed z-999 bg-zinc-50 h-16 border-b border-zinc-200 flex justify-between items-center px-8">
            <h1 className="font-semibold text-zinc-700 gap-1 flex items-center">
                <Image alt='' src='logo.svg' width={19} height={19} />
                ORCHERA
            </h1>
            <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">Pricing</Link>
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">Support</Link>
                {!user && (<>
                    <Link href="/signin" className="text-sm text-zinc-700 hover:text-zinc-900">Sign in</Link>
                    <Link href="/signup" className="bg-blue-400 hover:bg-blue-500 h-8 px-4 rounded-sm text-sm font-normal text-zinc-50 flex items-center"> Sign up </Link>
                </>)}
                {user && (
                    <button onClick={logoutUser} className="text-sm text-red-500 hover:text-red-600 cursor-pointer">Log out</button>
                )}
            </nav>
        </header>
    )
}