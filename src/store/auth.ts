import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  hydrate: () => void
}

const LS_KEY = 'fatima_birthday_auth'

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  hydrate: () => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.isLoggedIn) set({ isLoggedIn: true })
      }
    } catch {}
  },
  login: async (password: string) => {
    const ok = password === '123456'
    if (ok) {
      set({ isLoggedIn: true })
      localStorage.setItem(LS_KEY, JSON.stringify({ isLoggedIn: true }))
      return true
    }
    return false
  },
  logout: () => {
    localStorage.removeItem(LS_KEY)
    set({ isLoggedIn: false })
  }
}))

// Hydrate on import
useAuthStore.getState().hydrate()
