import { create } from 'zustand'
import { User } from '@/types'

interface AuthStore {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

interface SearchStore {
  destination: string
  startDate: string
  endDate: string
  travelers: number
  setSearch: (data: {
    destination?: string
    startDate?: string
    endDate?: string
    travelers?: number
  }) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  destination: '',
  startDate: '',
  endDate: '',
  travelers: 1,
  setSearch: (data) => set((state) => ({ ...state, ...data })),
}))

interface CartStore {
  hotels: string[]
  activities: string[]
  addHotel: (id: string) => void
  removeHotel: (id: string) => void
  addActivity: (id: string) => void
  removeActivity: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  hotels: [],
  activities: [],
  addHotel: (id) =>
    set((state) => ({
      hotels: [...state.hotels, id],
    })),
  removeHotel: (id) =>
    set((state) => ({
      hotels: state.hotels.filter((h) => h !== id),
    })),
  addActivity: (id) =>
    set((state) => ({
      activities: [...state.activities, id],
    })),
  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a !== id),
    })),
  clearCart: () =>
    set({
      hotels: [],
      activities: [],
    }),
}))
