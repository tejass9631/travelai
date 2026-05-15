'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { Destination } from '@/types'

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-warm text-white px-3 py-1 rounded-full text-sm font-semibold">
          {destination.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{destination.country}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(destination.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {destination.rating} ({destination.reviews})
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <p>💰 Budget: ₹{destination.estimatedBudget.toLocaleString()}</p>
          <p>🌤️ {destination.bestSeason}</p>
          <p>✈️ Visa: {destination.visaRequired ? 'Required' : 'Not Required'}</p>
        </div>

        {/* CTA */}
        <Link href={`/destination/${destination.id}`}>
          <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
            Explore Now
          </button>
        </Link>
      </div>
    </motion.div>
  )
}
