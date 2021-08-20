// ====== interfaces

// Login & Signup
export interface AuthState {
  username: string
  password: string
}
export interface Workout {
  description: string
  definition: string
  result: string
  id?: number
}

// ======= types
export type Token = string
