'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Compass,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AITravelChat from '@/components/AITravelChat'
import DestinationCard from '@/components/DestinationCard'
import TravelGlobe3D from '@/components/TravelGlobe3D'
import { mockDestinations } from '@/lib/mockData'
import { TravelService } from '@/lib/travelService'
import { useSearchStore } from '@/store'
import type { Destination } from '@/types'

const stats = [
  { label: 'AI trip routes', value: '48k+' },
  { label: 'Live destination signals', value: '120+' },
  { label: 'Budget scenarios', value: '9.8M' },
]

const commandCards = [
  { icon: Sparkles, label: 'AI mood match', value: 'Beach + food + culture' },
  { icon: Wallet, label: 'Smart budget', value: 'INR 52,400 optimized' },
  { icon: ShieldCheck, label: 'Travel confidence', value: 'Visa, safety, season' },
]

const experiences = [
  {
    icon: Compass,
    title: '3D discovery cockpit',
    text: 'Scan destinations, routes, budgets, and stay options from one cinematic travel console.',
  },
  {
    icon: Zap,
    title: 'Instant itinerary engine',
    text: 'Generate day-by-day plans with cost estimates, activity timing, and hotel next steps.',
  },
  {
    icon: Plane,
    title: 'Trip-ready decisions',
    text: 'Turn vague ideas into confident bookings with ratings, seasons, and personalized filters.',
  },
]

export default function Home() {
  const router = useRouter()
  const [trendingDestinations, setTrendingDestinations] = useState<Destination[]>([])
  const { setSearch } = useSearchStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setTrendingDestinations(TravelService.getTrendingDestinations(mockDestinations))
  }, [])

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (!query) return

    setSearch({ destination: query })
    router.push(`/explore?search=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative overflow-hidden">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-white">
        <TravelGlobe3D />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(249,115,22,0.24),transparent_26%),linear-gradient(110deg,rgba(2,6,23,0.96),rgba(15,23,42,0.72)_48%,rgba(2,6,23,0.92))]" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
              <Sparkles size={16} className="text-amber-300" />
              AI powered travel planning with a live 3D command view
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              Plan trips like you are piloting the future.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Explore destinations, compare budgets, generate itineraries, and move from dream to booking with a
              cinematic AI travel cockpit.
            </p>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/12 p-3 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
              <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_1fr_auto]">
                <label className="group flex min-h-[64px] items-center gap-3 rounded-xl bg-white px-4 text-slate-900 shadow-sm">
                  <MapPin size={20} className="text-cyan-600" />
                  <span className="flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Where</span>
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                      className="w-full bg-transparent text-base font-semibold outline-none placeholder:text-slate-400"
                      placeholder="Goa, Bali, Maldives..."
                    />
                  </span>
                </label>
                <div className="flex min-h-[64px] items-center gap-3 rounded-xl bg-white px-4 text-slate-900 shadow-sm">
                  <Calendar size={20} className="text-orange-500" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">When</span>
                    <span className="text-base font-semibold">Flexible</span>
                  </span>
                </div>
                <div className="flex min-h-[64px] items-center gap-3 rounded-xl bg-white px-4 text-slate-900 shadow-sm">
                  <Users size={20} className="text-lime-600" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Travelers</span>
                    <span className="text-base font-semibold">2 guests</span>
                  </span>
                </div>
                <button
                  onClick={handleSearch}
                  className="inline-flex min-h-[64px] items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-amber-300"
                >
                  <Search size={19} />
                  Search
                </button>
              </div>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative min-h-[520px]"
          >
            <div className="absolute right-0 top-8 w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/55 p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Live route</p>
                  <h2 className="mt-1 text-2xl font-bold">Goa escape</h2>
                </div>
                <div className="rounded-2xl bg-lime-300 px-3 py-2 text-sm font-bold text-slate-950">92% fit</div>
              </div>

              <div className="space-y-3">
                {commandCards.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.35 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">{item.label}</p>
                        <p className="font-bold text-white">{item.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="absolute bottom-8 left-0 max-w-xs rounded-3xl border border-white/15 bg-white/12 p-5 shadow-2xl backdrop-blur-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-200">Next step</p>
              <p className="mt-2 text-2xl font-bold">Generate a 5-day itinerary</p>
              <Link
                href="/ai-planner"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-200"
              >
                Open planner <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-700">Experience layer</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-bold text-slate-950 sm:text-5xl">
                Not just a website. A travel operating system.
              </h2>
            </div>
            <Link href="/explore" className="inline-flex items-center gap-2 font-bold text-cyan-700">
              Explore destinations <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {experiences.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-2xl hover:shadow-cyan-950/10"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 transition group-hover:bg-cyan-500 group-hover:text-slate-950">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-300">Trending now</p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Destination cards with real decision signals.</h2>
            </div>
            <Link href="/explore" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950">
              View all <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trendingDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="destination-lift"
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-50 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-700">AI assistant</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Ask for a trip. Refine it like a pro.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Use the travel assistant for destination ideas, budget tradeoffs, packing hints, hotel zones, and day-by-day
              planning.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Find hidden beaches', 'Plan under INR 50k', 'Best season check', 'Family-friendly route'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-2xl shadow-slate-950/10">
            <AITravelChat />
          </div>
        </div>
      </section>
    </div>
  )
}
