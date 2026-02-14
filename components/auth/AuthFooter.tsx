import Link from 'next/link';

export default function AuthFooter() {
    return (
        <footer className="w-full max-w-md flex justify-center items-center mb-10 pb-4 mt-12 md:mt-0 md:h-10">
            <ul className="w-full px-6 text-zinc-400 flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-2 text-[10px] md:text-xs">
                <li>
                    <Link href='/' className="hover:text-zinc-600 transition-colors">
                        © Orchera systems
                    </Link>
                </li>
                <li>
                    <Link href='/' className="hover:text-zinc-600 transition-colors">
                        Privacy
                    </Link>
                </li>
                <li>
                    <Link href='/' className="hover:text-zinc-600 transition-colors">
                        Support
                    </Link>
                </li>
                <li>
                    <Link href='/' className="hover:text-zinc-600 transition-colors">
                        Pricing
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
