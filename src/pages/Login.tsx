import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useAuthStore } from '../store/auth'

const hearts = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 12 + Math.random() * 18,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 6,
  opacity: 0.3 + Math.random() * 0.5,
}))

function TypingHeading({ text }: { text: string }) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [text])
  return (
    <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-2xl">
      {display}
      <span className="inline-block w-1 h-8 md:h-10 bg-white ml-1 animate-pulse" />
    </h1>
  )
}

export default function Login() {
  const login = useAuthStore((s) => s.login)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await login(password)
    if (!ok) {
      setError('Oops! That password was shy. Try again, my love.')
      setPassword('')
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-900 via-fuchsia-900 to-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: h.opacity, y: [0, -40, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <Heart className="text-rose-300/60" style={{ width: h.size, height: h.size }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8 gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400/30">
              <Sparkles className="text-rose-200" />
            </div>
            <TypingHeading text="Happy Birthday, Fatima" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <label className="text-rose-100 text-sm">Enter the secret password</label>
              <div className="relative mt-2">
                <input
                  ref={inputRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-2xl bg-white/10 px-5 py-4 text-white placeholder-white/50 outline-none ring-2 ring-transparent focus:ring-rose-400/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] transition"
                  placeholder="••••••"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={false}
                  animate={{ boxShadow: password ? '0 0 40px rgba(244,63,94,0.45)' : '0 0 0 rgba(0,0,0,0)' }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold py-4 shadow-lg shadow-rose-900/40"
            >
              Let me in
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-rose-200 text-center text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-rose-200/70 text-xs">Hint: 6 magic numbers</p>
          </form>
        </div>
      </div>
    </div>
  )
}
