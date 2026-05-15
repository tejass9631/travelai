'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Plane, Star, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Destination } from '@/types'

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-xl shadow-slate-950/10 transition-shadow hover:shadow-2xl"
    >
      <div className="relative h-52 overflow-hidden bg-gray-200">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white shadow-lg">
          {destination.category}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{destination.name}</h3>
          <p className="text-sm text-white/80">{destination.country}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
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

        <p className="mb-4 min-h-[48px] text-sm leading-6 text-gray-600">{destination.description}</p>

        <div className="mb-5 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Wallet size={16} className="text-cyan-600" />
            Budget: INR {destination.estimatedBudget.toLocaleString()}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-orange-500" />
            {destination.bestSeason}
          </p>
          <p className="flex items-center gap-2">
            <Plane size={16} className="text-lime-600" />
            Visa: {destination.visaRequired ? 'Required' : 'Not Required'}
          </p>
        </div>

        <Link href={`/destination/${destination.id}`}>
          <button className="w-full rounded-xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-cyan-600">
            Explore Now
          </button>
        </Link>
      </div>
    </motion.div>
  )
}
