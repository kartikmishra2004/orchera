import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/home/Hero'
import Logos from '@/components/sections/home/Logos'
import Features from '@/components/sections/home/Features'
import Collaboration from '@/components/sections/home/Collaboration'
import Pricing from '@/components/sections/home/Pricing'

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Logos />
        <Features />
        <Collaboration />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
