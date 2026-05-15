'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DestinationCard from '@/components/DestinationCard'
import { mockDestinations } from '@/lib/mockData'
import { TravelService } from '@/lib/travelService'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [destinations, setDestinations] = useState(mockDestinations)

  const categories = ['Beach', 'Mountains', 'Adventure', 'Religious', 'Family', 'Honeymoon', 'Luxury', 'Backpacking']

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = TravelService.searchDestinations(query, mockDestinations)
    setDestinations(query ? results : mockDestinations)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category) {
      const filtered = mockDestinations.filter((d) => d.category === category)
      setDestinations(filtered)
    } else {
      setDestinations(mockDestinations)
    }
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
          <h1 className="section-title">Explore Destinations</h1>
          <p className="text-gray-600 text-lg">Find your next adventure from our curated collection</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Categories */}
          <div>
            <p className="font-semibold text-gray-900 mb-4">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryFilter('')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === ''
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 mb-8">
            Showing {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
          </p>

          {destinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <DestinationCard destination={dest} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No destinations found. Try a different search!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
