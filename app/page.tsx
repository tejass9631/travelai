'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Plane, MapPin, Users, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DestinationCard from '@/components/DestinationCard'
import AITravelChat from '@/components/AITravelChat'
import { mockDestinations } from '@/lib/mockData'
import { TravelService } from '@/lib/travelService'
import { useSearchStore } from '@/store'
import type { Destination } from '@/types'

export default function Home() {
  const router = useRouter()
  const [trendingDestinations, setTrendingDestinations] = useState<Destination[]>([])
  const { destination, setSearch } = useSearchStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const trending = TravelService.getTrendingDestinations(mockDestinations)
    setTrendingDestinations(trending)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearch({ destination: searchQuery })
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Your <span className="gradient-text">AI Travel</span> Companion
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing destinations, plan perfect itineraries, and book unforgettable trips with AI-powered recommendations.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="input-field"
                  />
                </div>

                {/* Check In */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline mr-2" size={16} />
                    Check In
                  </label>
                  <input type="date" className="input-field" />
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline mr-2" size={16} />
                    Check Out
                  </label>
                  <input type="date" className="input-field" />
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="inline mr-2" size={16} />
                    Travelers
                  </label>
                  <select className="input-field">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Search Trips
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-title text-center mb-16"
          >
            Why Choose TravelAI?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Planning',
                description: 'Smart itineraries tailored to your preferences and budget',
              },
              {
                icon: '💰',
                title: 'Budget Optimizer',
                description: 'Get accurate cost estimates and find the best deals',
              },
              {
                icon: '🌍',
                title: 'Personalized Recommendations',
                description: 'Discover hidden gems and trending destinations',
              },
              {
                icon: '🏨',
                title: 'Easy Bookings',
                description: 'Book hotels, flights, and activities in one place',
              },
              {
                icon: '📱',
                title: 'Real-Time Updates',
                description: 'Get live notifications and trip reminders',
              },
              {
                icon: '⭐',
                title: 'Community Reviews',
                description: 'Read reviews from verified travelers worldwide',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="section-title">Trending Destinations</h2>
            <Link href="/explore" className="btn-primary text-sm">
              View All →
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingDestinations.map((dest: any) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="section-title text-center">Chat with AI Travel Assistant</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Get instant recommendations and personalized travel advice powered by artificial intelligence.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <AITravelChat />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Ready to Start Your Adventure?
          </motion.h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of travelers planning their perfect trips with TravelAI
          </p>
          <Link href="/auth/signup" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
