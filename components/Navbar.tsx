"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { user, logoutUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-lg h-16 border-b border-zinc-200 flex justify-between items-center px-4 md:px-8">
            <Link href="/" className="font-semibold text-zinc-700 gap-1 flex items-center shrink-0">
                <Image alt='' src='logo.svg' width={19} height={19} />
                ORCHERA
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 items-center">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-sm text-zinc-500 hover:text-zinc-700">
                        {link.name}
                    </Link>
                ))}
                {!user && (
                    <>
                        <Link href="/signin" className="text-sm text-zinc-700 hover:text-zinc-900 ml-2">Sign in</Link>
                        <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 h-8 px-4 rounded-sm text-sm font-normal text-zinc-50 flex items-center transition-colors">
                            Sign up
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-700">Dashboard</Link>
                        <button onClick={logoutUser} className="text-sm text-red-500 hover:text-red-600 cursor-pointer">
                            Log out
                        </button>
                    </>
                )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2 text-zinc-500 hover:text-zinc-700 cursor-pointer"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-200 py-6 px-4 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-zinc-600 hover:text-zinc-900 py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-zinc-100 my-2" />
                    {!user && (
                        <>
                            <Link
                                href="/signin"
                                className="text-base font-medium text-zinc-600 hover:text-zinc-900 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-blue-500 hover:bg-blue-600 h-10 px-4 rounded-sm text-base font-medium text-zinc-50 flex items-center justify-center transition-colors shadow-lg shadow-blue-500/20"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-base font-medium text-zinc-600 hover:text-zinc-900 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    logoutUser();
                                    setIsMenuOpen(false);
                                }}
                                className="text-base font-medium text-red-500 hover:text-red-600 text-left py-2 cursor-pointer"
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}