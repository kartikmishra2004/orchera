import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-8">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-semibold text-zinc-700 tracking-tight">
            Project management, simplified
          </h1>
          <p className="text-lg text-zinc-500 font-normal">
            Streamline your workflow with intuitive tools designed for modern teams.
            Stay organized, collaborate seamlessly, and deliver projects on time.
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Link href="/signup" className="bg-blue-400 hover:bg-blue-500 h-10 px-6 rounded-sm text-sm font-normal text-zinc-50 flex items-center">
              Get started
            </Link>
            <Link href="/" className="border-2 border-zinc-200 hover:border-zinc-300 h-10 px-6 rounded-sm text-sm font-normal text-zinc-700 flex items-center">
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-20 w-full max-w-4xl border-2 border-zinc-200 rounded-sm p-8 bg-zinc-50/50">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-blue-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-700">Task boards</h3>
              <p className="text-xs text-zinc-500">Organize work visually with customizable boards</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-blue-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-700">Team collaboration</h3>
              <p className="text-xs text-zinc-500">Work together seamlessly in real-time</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-blue-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-700">Progress tracking</h3>
              <p className="text-xs text-zinc-500">Monitor progress with detailed insights</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}