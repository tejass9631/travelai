import { Destination, Hotel, BudgetEstimate } from '@/types'

export class TravelService {
  // Search destinations
  static searchDestinations(query: string, destinations: Destination[]): Destination[] {
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Calculate budget
  static calculateBudget(
    destination: Destination,
    travelers: number,
    days: number,
    mode: 'economy' | 'luxury' = 'economy'
  ): BudgetEstimate {
    const multiplier = mode === 'luxury' ? 1.8 : 1
    const perPersonFlightCost = destination.estimatedBudget * 0.4 * multiplier
    const perPersonHotelCost = (destination.estimatedBudget * 0.35 * multiplier) / days
    const perPersonFoodCost = (destination.estimatedBudget * 0.15 * multiplier) / days
    const perPersonTransportCost = (destination.estimatedBudget * 0.05 * multiplier) / days
    const perPersonActivitiesCost = (destination.estimatedBudget * 0.05 * multiplier) / days

    const totalFlights = perPersonFlightCost * travelers
    const totalAccommodation = perPersonHotelCost * travelers * days
    const totalFood = perPersonFoodCost * travelers * days
    const totalTransport = perPersonTransportCost * travelers * days
    const totalActivities = perPersonActivitiesCost * travelers * days
    const buffer = (totalFlights + totalAccommodation + totalFood + totalTransport + totalActivities) * 0.1

    return {
      flights: Math.round(totalFlights),
      accommodation: Math.round(totalAccommodation),
      food: Math.round(totalFood),
      transport: Math.round(totalTransport),
      activities: Math.round(totalActivities),
      buffer: Math.round(buffer),
      total: Math.round(
        totalFlights + totalAccommodation + totalFood + totalTransport + totalActivities + buffer
      ),
    }
  }

  // Filter hotels by price
  static filterHotels(hotels: Hotel[], minPrice: number, maxPrice: number): Hotel[] {
    return hotels.filter((h) => h.pricePerNight >= minPrice && h.pricePerNight <= maxPrice)
  }

  // Sort destinations by rating
  static sortByRating(destinations: Destination[], descending = true): Destination[] {
    return [...destinations].sort((a, b) => (descending ? b.rating - a.rating : a.rating - b.rating))
  }

  // Get trending destinations
  static getTrendingDestinations(destinations: Destination[]): Destination[] {
    return this.sortByRating(destinations).slice(0, 6)
  }

  // Calculate trip duration
  static calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }
}
