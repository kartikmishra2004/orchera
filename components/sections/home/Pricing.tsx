import { Check } from 'lucide-react'

const plans = [
    {
        name: "Starter",
        price: "0",
        desc: "Perfect for side projects and small teams.",
        features: ["Up to 3 projects", "Unlimited tasks", "Basic team chat", "Core features"],
        btn: "Get Started",
        pref: false
    },
    {
        name: "Professional",
        price: "12",
        desc: "Advanced features for growing organizations.",
        features: ["Unlimited projects", "Team-specific channels", "Custom role management", "Advanced analytics", "Priority support"],
        btn: "Try for free",
        pref: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "The power of Orchera with dedicated support.",
        features: ["SAML & SSO", "Custom security audits", "Dedicated account manager", "Custom onboarding", "SLA guarantees"],
        btn: "Contact sales",
        pref: false
    }
]

export default function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-24 px-6 md:px-8 bg-zinc-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-4">Simple, transparent pricing</h2>
                    <p className="text-sm md:text-base text-zinc-500">Choose the plan that's right for your team. Scale up as you grow.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={`p-6 sm:p-8 md:p-10 rounded-sm border ${plan.pref ? 'border-blue-500 bg-white shadow-xl relative scale-100 lg:scale-105 z-10' : 'border-zinc-200 bg-transparent'} flex flex-col`}>
                            {plan.pref && (
                                <div className="absolute top-0 right-1/2 translate-x-1/2 lg:right-10 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-base md:text-lg font-medium text-zinc-900 mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl md:text-3xl font-bold text-zinc-900">{plan.price === 'Custom' ? '' : '$'}{plan.price}</span>
                                {plan.price !== 'Custom' && <span className="text-zinc-500 text-sm">/mo</span>}
                            </div>
                            <p className="text-zinc-500 text-xs md:text-sm mb-8">{plan.desc}</p>
                            <ul className="space-y-3 md:space-y-4 mb-10 flex-1">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex gap-3 text-xs md:text-sm text-zinc-700">
                                        <Check size={16} className="text-blue-500 shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full h-10 md:h-11 rounded-sm text-sm font-medium transition-all ${plan.pref ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20' : 'border border-zinc-200 text-zinc-700 hover:border-zinc-300'}`}>
                                {plan.btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
