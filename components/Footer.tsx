'use client'

import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                <Compass size={21} />
              </div>
              <h3 className="text-lg font-bold">TravelAI</h3>
            </div>
            <p className="text-sm leading-6 text-gray-400">
              Discover, plan, and book smarter trips with immersive AI-powered recommendations.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/explore" className="transition hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="transition hover:text-white">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/ai-planner" className="transition hover:text-white">
                  AI Planner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Plan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/budget" className="transition hover:text-white">
                  Budget
                </Link>
              </li>
              <li>
                <Link href="/trips" className="transition hover:text-white">
                  My Trips
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Social</h4>
            <div className="flex gap-3">
              {['X', 'FB', 'IG'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-sm font-bold text-gray-300 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">Copyright 2026 TravelAI. All rights reserved.</p>
          <p className="text-sm text-gray-500">Built for cinematic travel planning.</p>
        </div>
      </div>
    </footer>
  )
}
