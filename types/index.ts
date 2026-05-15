export interface Destination {
  id: string
  name: string
  country: string
  category: string
  image: string
  rating: number
  reviews: number
  estimatedBudget: number
  weather: string
  bestSeason: string
  description: string
  attractions: string[]
  safetyRating: number
  visaRequired: boolean
}

export interface Hotel {
  id: string
  name: string
  location: string
  rating: number
  reviews: number
  pricePerNight: number
  image: string
  amenities: string[]
  roomTypes: RoomType[]
  description: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface RoomType {
  id: string
  name: string
  price: number
  capacity: number
  amenities: string[]
  image: string
}

export interface Trip {
  id: string
  userId: string
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
  status: 'planning' | 'booked' | 'completed' | 'cancelled'
  hotels: string[]
  activities: string[]
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  travelPreferences: string[]
  budgetRange: [number, number]
  favoriteDestinations: string[]
  pastTrips: number
}

export interface BudgetEstimate {
  flights: number
  accommodation: number
  food: number
  transport: number
  activities: number
  buffer: number
  total: number
}

export interface Itinerary {
  id: string
  title: string
  destination: string
  days: ItineraryDay[]
  totalBudget: number
  totalDuration: number
}

export interface ItineraryDay {
  day: number
  title: string
  activities: Activity[]
  meals: Meal[]
  estimatedCost: number
}

export interface Activity {
  id: string
  name: string
  time: string
  duration: number
  cost: number
  description: string
  location: string
}

export interface Meal {
  id: string
  name: string
  time: string
  type: 'breakfast' | 'lunch' | 'dinner'
  cost: number
  location: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  text: string
  date: string
  verified: boolean
  images?: string[]
}
