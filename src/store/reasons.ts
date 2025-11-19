import { create } from 'zustand'

export interface Reason {
  id: number
  text: string
}

interface ReasonsState {
  reasons: Reason[]
  getRandom: () => Reason
}

const initial: Reason[] = [
  { id: 1, text: 'Your laugh makes ordinary moments magical.' },
  { id: 2, text: 'You listen with your heart first.' },
  { id: 3, text: 'You are my safest place.' },
  { id: 4, text: 'You inspire me to be better every day.' },
  { id: 5, text: 'Your eyes hold my favorite stories.' },
  { id: 6, text: 'We dream in the same direction.' },
]

export const useReasonsStore = create<ReasonsState>(() => ({
  reasons: initial,
  getRandom: () => initial[Math.floor(Math.random() * initial.length)]
}))
