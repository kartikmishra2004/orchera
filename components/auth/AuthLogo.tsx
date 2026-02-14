'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLogo() {
    return (
        <header className="w-full max-w-275 h-12 flex justify-center items-center my-6 shrink-0">
            <Link href="/" className="w-full font-semibold h-10 tracking-tight text-zinc-700 gap-1 flex justify-center items-center">
                <Image alt='Orchera Logo' src='/logo.svg' width={19} height={19} />
                ORCHERA
            </Link>
        </header>
    );
}
