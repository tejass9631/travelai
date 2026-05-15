'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, Wifi, Utensils, Dumbbell, Waves } from 'lucide-react'
import { Hotel } from '@/types'

interface HotelCardProps {
  hotel: Hotel
  onBook?: () => void
}

export default function HotelCard({ hotel, onBook }: HotelCardProps) {
  const amenityIcons = {
    WiFi: <Wifi size={16} />,
    Restaurant: <Utensils size={16} />,
    Gym: <Dumbbell size={16} />,
    'Beach Access': <Waves size={16} />,
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <MapPin size={16} />
          {hotel.location}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {hotel.rating} ({hotel.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-primary-600">₹{hotel.pricePerNight.toLocaleString()}</p>
          <p className="text-xs text-gray-600">per night</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs">
              {amenityIcons[amenity as keyof typeof amenityIcons] || null}
              <span className="hidden sm:inline">{amenity}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onBook}
          className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  )
}
