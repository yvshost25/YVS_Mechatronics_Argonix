import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const user = storedUsers.find((u: any) => u.email === email && u.password === password)
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ user: userWithoutPassword, isAuthenticated: true })
          return true
        }
        return false
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        
        if (storedUsers.some((u: any) => u.email === email)) {
          return false
        }

        const newUser = {
          id: crypto.randomUUID(),
          name,
          email,
          password
        }

        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]))
        const { password: _, ...userWithoutPassword } = newUser
        set({ user: userWithoutPassword, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)