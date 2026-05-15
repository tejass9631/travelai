'use client'

import { motion } from 'framer-motion'
import HotelCard from '@/components/HotelCard'
import { mockHotels } from '@/lib/mockData'
import { useState } from 'react'
import { Sliders } from 'lucide-react'

export default function HotelsPage() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(15000)
  const [minRating, setMinRating] = useState(0)

  const filteredHotels = mockHotels.filter(
    (h) => h.pricePerNight >= minPrice && h.pricePerNight <= maxPrice && h.rating >= minRating
  )

  const handleBooking = (hotelName: string) => {
    alert(`Booking started for ${hotelName}! Redirecting to payment...`)
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="section-title">🏨 Find Your Perfect Hotel</h1>
          <p className="text-gray-600 text-lg">Browse and book from thousands of premium properties</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Sliders size={20} className="text-primary-600" />
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {[4.0, 4.5, 4.7].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      />
                      <span className="text-sm text-gray-700">⭐ {rating}+</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>{filteredHotels.length}</strong> hotels found
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hotels Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {filteredHotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <HotelCard hotel={hotel} onBook={() => handleBooking(hotel.name)} />
                </motion.div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No hotels found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
