'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Download, Share2 } from 'lucide-react'
import Link from 'next/link'
import { mockDestinations } from '@/lib/mockData'

interface GeneratedActivity {
  time: string
  activity: string
  cost: number
}

interface GeneratedItineraryDay {
  day: number
  title: string
  activities: GeneratedActivity[]
}

interface GeneratedItinerary {
  title: string
  destination: string
  days: number
  budget: number
  days_breakdown: GeneratedItineraryDay[]
  totalCost: number
  recommendations: string[]
}

export default function AIPlannerPage() {
  const [tripData, setTripData] = useState({
    destination: 'Goa',
    days: 5,
    travelers: 2,
    budget: 50000,
    interests: ['Beach', 'Adventure', 'Food'],
  })

  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setTripData({
      ...tripData,
      [e.target.name]: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value),
    })
  }

  const generateItinerary = async () => {
    setLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const sampleItinerary = {
        title: `Perfect ${tripData.days}-Day Trip to ${tripData.destination}`,
        destination: tripData.destination,
        days: tripData.days,
        budget: tripData.budget,
        days_breakdown: [
          {
            day: 1,
            title: 'Arrival & Beach Relaxation',
            activities: [
              { time: '10:00', activity: 'Arrive at airport', cost: 0 },
              { time: '14:00', activity: 'Check-in to hotel', cost: 0 },
              { time: '18:00', activity: 'Beach walk & sunset', cost: 200 },
              { time: '20:00', activity: 'Dinner at beachfront restaurant', cost: 800 },
            ],
          },
          {
            day: 2,
            title: 'Water Adventure Day',
            activities: [
              { time: '08:00', activity: 'Breakfast at hotel', cost: 300 },
              { time: '10:00', activity: 'Scuba diving', cost: 3500 },
              { time: '15:00', activity: 'Lunch', cost: 600 },
              { time: '18:00', activity: 'Spa & massage', cost: 1200 },
              { time: '20:00', activity: 'Dinner', cost: 1000 },
            ],
          },
          {
            day: 3,
            title: 'Cultural Exploration',
            activities: [
              { time: '09:00', activity: 'Breakfast', cost: 300 },
              { time: '11:00', activity: 'Fort exploration', cost: 500 },
              { time: '13:00', activity: 'Lunch', cost: 700 },
              { time: '16:00', activity: 'Local cooking class', cost: 1200 },
              { time: '19:00', activity: 'Dinner with sunset view', cost: 1500 },
            ],
          },
          {
            day: 4,
            title: 'Adventure & Nature',
            activities: [
              { time: '08:00', activity: 'Breakfast', cost: 300 },
              { time: '10:00', activity: 'Waterfall trek', cost: 1500 },
              { time: '13:00', activity: 'Picnic lunch', cost: 600 },
              { time: '17:00', activity: 'Local market visit', cost: 400 },
              { time: '20:00', activity: 'Beach bonfire dinner', cost: 1200 },
            ],
          },
          {
            day: 5,
            title: 'Departure',
            activities: [
              { time: '08:00', activity: 'Breakfast', cost: 300 },
              { time: '10:00', activity: 'Last-minute shopping', cost: 500 },
              { time: '14:00', activity: 'Departure', cost: 0 },
            ],
          },
        ],
        totalCost: 15237,
        recommendations: [
          'Book water sports in advance for better rates',
          'Visit local markets in the morning for fresh deals',
          'Try street food but ensure cleanliness',
          'Bring waterproof bag for beach activities',
        ],
      }

      setItinerary(sampleItinerary)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-500" size={40} />
            AI Trip Planner
          </h1>
          <p className="text-gray-600 text-lg">Let our AI create the perfect itinerary for you</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Details</h3>

              <div className="space-y-5">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
                  <select
                    name="destination"
                    value={tripData.destination}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {mockDestinations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Days */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration: {tripData.days} days
                  </label>
                  <input
                    type="range"
                    name="days"
                    min="1"
                    max="30"
                    value={tripData.days}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travelers: {tripData.travelers}
                  </label>
                  <input
                    type="range"
                    name="travelers"
                    min="1"
                    max="10"
                    value={tripData.travelers}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget: ₹{tripData.budget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    name="budget"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={tripData.budget}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateItinerary}
                  disabled={loading}
                  className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  {loading ? 'Generating...' : 'Generate Itinerary'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Itinerary Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {itinerary ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{itinerary.title}</h2>
                    <p className="text-gray-600 mt-2">
                      {itinerary.days} days • {itinerary.budget} INR budget
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                      <Share2 size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                      <Download size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Days */}
                <div className="space-y-6 mb-8">
                  {itinerary.days_breakdown.map((dayData, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-l-4 border-primary-500 pl-6 py-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Day {dayData.day}: {dayData.title}
                      </h3>
                      <div className="space-y-2">
                        {dayData.activities.map((act, actIdx) => (
                          <div key={actIdx} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-900">{act.time} - {act.activity}</p>
                              {act.cost > 0 && <p className="text-xs text-gray-600 mt-1">Est. cost: ₹{act.cost}</p>}
                            </div>
                            {act.cost > 0 && (
                              <span className="text-sm font-bold text-primary-600">₹{act.cost}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">💡 AI Recommendations</h4>
                  <ul className="space-y-2">
                    {itinerary.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-yellow-600">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link href="/hotels" className="btn-primary w-full text-center">
                  Book Hotels & Activities
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12 border-2 border-dashed border-primary-300 text-center h-96 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-gray-600 text-lg font-semibold">
                  Configure your trip and let AI create a perfect itinerary!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
