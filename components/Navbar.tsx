'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Compass, LogOut, Menu, Sparkles, X } from 'lucide-react'
import { useAuthStore } from '@/store'

const navItems = [
  { href: '/explore', label: 'Explore' },
  { href: '/hotels', label: 'Hotels' },
  { href: '/budget', label: 'Budget' },
  { href: '/trips', label: 'My Trips' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/85 shadow-glass backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 shadow-lg shadow-cyan-900/20">
              <Compass size={22} />
            </div>
            <span className="hidden text-xl font-bold text-slate-950 sm:inline">TravelAI</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-gray-700 transition hover:text-cyan-700">
                {item.label}
              </Link>
            ))}
            <Link
              href="/ai-planner"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              <Sparkles size={16} />
              AI Planner
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden text-sm text-gray-700 sm:inline">{user.name}</span>
                <button
                  onClick={() => {
                    logout()
                    alert('Logged out successfully')
                  }}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                Login
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 md:hidden" aria-label="Toggle navigation">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="space-y-2 pb-4 md:hidden">
            {[...navItems, { href: '/ai-planner', label: 'AI Planner' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
