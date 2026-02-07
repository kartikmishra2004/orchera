import Link from 'next/link'
import Image from 'next/image'
import { Zap } from 'lucide-react'
import dashboard from '@/public/dashboard.png'

export default function Hero() {
    return (
        <section className="pt-32 pb-20 px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="max-w-3xl text-center space-y-8 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-500 text-xs font-medium">
                        <Zap size={14} />
                        <span>Now available for modern teams</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.1]">
                        Project Management, <span className="text-blue-500">Reimagined.</span>
                    </h1>
                    <p className="text-base md:text-lg text-zinc-500 font-normal leading-relaxed">
                        Orchera helps teams plan, organize, and execute projects with ease.
                        From discovery to delivery, streamline every step of your workflow in one unified platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 h-10 px-8 rounded-sm text-sm font-normal text-white flex items-center justify-center transition-all shadow-lg shadow-blue-500/10">
                            Get started for free
                        </Link>
                        <Link href="/" className="border border-zinc-200 hover:border-zinc-300 h-10 px-8 rounded-sm text-sm font-normal text-zinc-700 flex items-center justify-center transition-all">
                            Book a demo
                        </Link>
                    </div>
                </div>

                <div className="w-full max-w-6xl relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-10"></div>
                    <div className="relative bg-white border border-zinc-200 rounded-lg shadow-2xl overflow-hidden">
                        <div className="h-10 border-b border-zinc-100 bg-zinc-50/50 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                                <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                                <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                            </div>
                        </div>
                        <Image
                            alt='Dashboard preview'
                            src={dashboard}
                            width={1400}
                            height={800}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
