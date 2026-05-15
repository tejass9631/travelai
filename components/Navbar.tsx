'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-glass shadow-glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">✈</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl text-primary-900">TravelAI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-gray-700 hover:text-primary-600 transition">
              Explore
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-primary-600 transition">
              Hotels
            </Link>
            <Link href="/budget" className="text-gray-700 hover:text-primary-600 transition">
              Budget
            </Link>
            <Link href="/ai-planner" className="text-gray-700 hover:text-primary-600 transition">
              AI Planner
            </Link>
            <Link href="/trips" className="text-gray-700 hover:text-primary-600 transition">
              My Trips
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={() => {
                    logout()
                    alert('Logged out successfully')
                  }}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/explore" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Explore
            </Link>
            <Link href="/hotels" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Hotels
            </Link>
            <Link href="/budget" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Budget Calculator
            </Link>
            <Link href="/ai-planner" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              AI Planner
            </Link>
            <Link href="/trips" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              My Trips
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
