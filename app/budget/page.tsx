'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Users, Calendar, Zap } from 'lucide-react'
import { TravelService } from '@/lib/travelService'
import { mockDestinations } from '@/lib/mockData'

export default function BudgetCalculator() {
  const [selectedDestination, setSelectedDestination] = useState(mockDestinations[0])
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(5)
  const [mode, setMode] = useState<'economy' | 'luxury'>('economy')
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {
    const estimate = TravelService.calculateBudget(selectedDestination, travelers, days, mode)
    setResult(estimate)
  }

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dest = mockDestinations.find((d) => d.id === e.target.value)
    if (dest) setSelectedDestination(dest)
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
          <h1 className="section-title">💰 Travel Budget Calculator</h1>
          <p className="text-gray-600 text-lg">Get accurate cost estimates for your dream trip</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Destination */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Destination
                </label>
                <select
                  value={selectedDestination.id}
                  onChange={handleDestinationChange}
                  className="input-field"
                >
                  {mockDestinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}, {dest.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Travelers */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Users className="inline mr-2" size={16} />
                  Number of Travelers
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-primary-600 w-12">{travelers}</span>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="inline mr-2" size={16} />
                  Duration (Days)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-primary-600 w-12">{days}</span>
                </div>
              </div>

              {/* Travel Mode */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Travel Mode</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMode('economy')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                      mode === 'economy'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    💰 Budget
                  </button>
                  <button
                    onClick={() => setMode('luxury')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                      mode === 'luxury'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    👑 Luxury
                  </button>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Calculate Budget
              </button>
            </div>

            {/* Destination Info */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-200">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{selectedDestination.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{selectedDestination.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Rating</p>
                  <p className="font-bold text-primary-600">⭐ {selectedDestination.rating}</p>
                </div>
                <div>
                  <p className="text-gray-600">Best Season</p>
                  <p className="font-bold text-primary-600">{selectedDestination.bestSeason}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {result ? (
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown</h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: 'Flights', amount: result.flights, icon: '✈️' },
                      { label: 'Accommodation', amount: result.accommodation, icon: '🏨' },
                      { label: 'Food & Dining', amount: result.food, icon: '🍽️' },
                      { label: 'Local Transport', amount: result.transport, icon: '🚕' },
                      { label: 'Activities', amount: result.activities, icon: '🎫' },
                      { label: 'Emergency Buffer', amount: result.buffer, icon: '🛡️' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-semibold text-gray-700">
                          <span className="text-xl mr-2">{item.icon}</span>
                          {item.label}
                        </span>
                        <span className="text-lg font-bold text-primary-600">₹{item.amount.toLocaleString()}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-8 text-center"
                  >
                    <p className="text-white/80 mb-2">Total Estimated Budget</p>
                    <p className="text-4xl font-bold mb-2">₹{result.total.toLocaleString()}</p>
                    <p className="text-sm text-white/80">
                      For {travelers} traveler{travelers > 1 ? 's' : ''} • {days} days • {mode === 'luxury' ? 'Luxury' : 'Budget'} Mode
                    </p>
                    <p className="text-xs text-white/70 mt-4">
                      Per person: ₹{Math.round(result.total / travelers).toLocaleString()}
                    </p>
                  </motion.div>

                  {/* Tips */}
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> Book in advance for better prices. Consider visiting during off-season for up to 30% savings!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12 border-2 border-dashed border-primary-300 text-center">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-gray-600 text-lg font-semibold">Enter your trip details and calculate!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
