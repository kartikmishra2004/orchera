import { Check } from 'lucide-react'

const collabItems = [
    "Global and team-specific chat channels",
    "Automated progress notifications",
    "Collaborative documentation and tasks",
    "Transparent feedback loops"
]

export default function Collaboration() {
    return (
        <section className="py-16 md:py-24 px-6 md:px-8 bg-white overflow-hidden border-t border-zinc-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="space-y-6 md:space-y-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight">Seamless collaboration across every department</h2>
                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed">
                        Orchera breaks down silos by connecting developers, designers, and project managers in a shared workspace.
                        With built-in chat and real-time updates, communication flows naturally.
                    </p>
                    <ul className="space-y-3 md:space-y-4">
                        {collabItems.map((item, i) => (
                            <li key={i} className="flex gap-3 items-center text-zinc-600 text-sm md:text-base">
                                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-3xl invisible md:visible"></div>
                    <div className="relative bg-zinc-50 border border-zinc-200 rounded-sm p-4 md:p-6 shadow-xl">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-400 shrink-0"></div>
                                <div className="bg-white border border-zinc-100 p-2 md:p-3 rounded-tr-lg rounded-b-lg text-xs md:text-sm text-zinc-700 max-w-[85%] md:max-w-[80%] shadow-sm">
                                    "Just updated the Design System. Can the dev team review the new components?"
                                </div>
                            </div>
                            <div className="flex gap-3 flex-row-reverse">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-400 shrink-0"></div>
                                <div className="bg-blue-500 p-2 md:p-3 rounded-tl-lg rounded-b-lg text-xs md:text-sm text-white max-w-[85%] md:max-w-[80%] shadow-md">
                                    "On it! Looks great. I'll start the implementation phase now."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
