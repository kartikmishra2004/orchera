import { Check, MessageSquare, Shield, Zap, Layout, Users } from 'lucide-react'

const features = [
    {
        icon: <Layout className="text-blue-500" size={24} />,
        title: "Project Planning",
        desc: "Create and manage complex projects with intuitive boards and timelines."
    },
    {
        icon: <Users className="text-blue-500" size={24} />,
        title: "Dynamic Teams",
        desc: "Build cross-functional teams and manage access with granular role controls."
    },
    {
        icon: <Zap className="text-blue-500" size={24} />,
        title: "Real-time Updates",
        desc: "Stay in sync with instant notifications and live status tracking."
    },
    {
        icon: <MessageSquare className="text-blue-500" size={24} />,
        title: "Integrated Chat",
        desc: "Global and team-specific channels keeping everyone connected."
    },
    {
        icon: <Shield className="text-blue-500" size={24} />,
        title: "Role Management",
        desc: "Assign roles like developers, testers, and designers with specific permissions."
    },
    {
        icon: <Check className="text-blue-500" size={24} />,
        title: "Task Orchestration",
        desc: "Move projects from ideas to completion with structured workflows."
    }
]

export default function Features() {
    return (
        <section id="features" className="py-24 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl mb-16">
                    <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Everything you need to move faster</h2>
                    <p className="text-base text-zinc-500">Powerful features designed to help your team focus on what matters most—delivering great work.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="p-8 border border-zinc-100 rounded-sm hover:border-zinc-200 hover:shadow-sm transition-all group">
                            <div className="w-12 h-12 rounded-sm bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-medium text-zinc-900 mb-2">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
