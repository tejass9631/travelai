'use client'

import { motion } from 'framer-motion'
import { useAuthStore } from '@/store'
import Link from 'next/link'
import { MapPin, Calendar, Users, Trash2 } from 'lucide-react'

export default function MyTripsPage() {
  const { user } = useAuthStore()

  // Mock trips data
  const trips = [
    {
      id: 1,
      destination: 'Goa',
      startDate: '2024-06-15',
      endDate: '2024-06-20',
      travelers: 2,
      status: 'booked',
      hotel: 'Sunset Beach Resort',
      budget: 50000,
    },
    {
      id: 2,
      destination: 'Manali',
      startDate: '2024-07-10',
      endDate: '2024-07-15',
      travelers: 3,
      status: 'planning',
      hotel: 'Mountain Peak Lodge',
      budget: 45000,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked':
        return 'bg-green-100 text-green-800'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your trips</h2>
          <Link href="/auth/login" className="btn-primary inline-block">
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="section-title">My Trips</h1>
          <p className="text-gray-600 text-lg">Manage your upcoming and past adventures</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4 border-b border-gray-200">
            <button className="px-6 py-3 font-semibold text-primary-600 border-b-2 border-primary-600">
              Upcoming Trips
            </button>
            <button className="px-6 py-3 font-semibold text-gray-600 hover:text-gray-900">
              Past Trips
            </button>
            <button className="px-6 py-3 font-semibold text-gray-600 hover:text-gray-900">
              Wishlist
            </button>
          </div>
        </motion.div>

        {/* Trips List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {trips.length > 0 ? (
            trips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Side */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{trip.destination}</h3>
                        <p className="text-gray-600">{trip.hotel}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(trip.status)}`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-primary-600" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users size={18} className="text-primary-600" />
                        <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-primary-600" />
                        <span>Budget: ₹{trip.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col justify-between">
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-4 border border-primary-200">
                      <p className="text-sm text-gray-600 mb-1">Trip Progress</p>
                      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 w-1/3"></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">3 of 5 days planned</p>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/trips/${trip.id}`} className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition text-center">
                        View Details
                      </Link>
                      <button className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="text-gray-600 text-lg font-semibold">No trips yet. Start planning your adventure!</p>
              <Link href="/explore" className="btn-primary inline-block mt-6">
                Explore Destinations
              </Link>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Plan Your Next Adventure</h3>
          <p className="mb-6 text-white/90">Let our AI help you create the perfect itinerary</p>
          <Link href="/ai-planner" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block">
            Start Planning
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
