import axios, { AxiosInstance } from 'axios'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Destinations
  async getDestinations() {
    try {
      const response = await this.client.get('/destinations')
      return response.data
    } catch (error) {
      console.error('Error fetching destinations:', error)
      throw error
    }
  }

  async searchDestinations(query: string) {
    try {
      const response = await this.client.get(`/destinations/search?q=${query}`)
      return response.data
    } catch (error) {
      console.error('Error searching destinations:', error)
      throw error
    }
  }

  // Hotels
  async getHotels(destination: string) {
    try {
      const response = await this.client.get(`/hotels?destination=${destination}`)
      return response.data
    } catch (error) {
      console.error('Error fetching hotels:', error)
      throw error
    }
  }

  // User Profile
  async getUserProfile(userId: string) {
    try {
      const response = await this.client.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  // Bookings
  async createBooking(bookingData: any) {
    try {
      const response = await this.client.post('/bookings', bookingData)
      return response.data
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  async getBookings(userId: string) {
    try {
      const response = await this.client.get(`/bookings/user/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  }

  // Reviews
  async getReviews(destinationId: string) {
    try {
      const response = await this.client.get(`/reviews?destinationId=${destinationId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  }

  async submitReview(reviewData: any) {
    try {
      const response = await this.client.post('/reviews', reviewData)
      return response.data
    } catch (error) {
      console.error('Error submitting review:', error)
      throw error
    }
  }

  // AI Services
  async generateItinerary(tripData: any) {
    try {
      const response = await this.client.post('/ai/itinerary', tripData)
      return response.data
    } catch (error) {
      console.error('Error generating itinerary:', error)
      throw error
    }
  }

  async chatWithAssistant(message: string) {
    try {
      const response = await this.client.post('/ai/chat', { message })
      return response.data
    } catch (error) {
      console.error('Error chatting with assistant:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
