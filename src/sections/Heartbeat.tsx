import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useMouseParallax } from '../utils/useMouseParallax'

export default function Heartbeat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [exploded, setExploded] = useState(false)
  useMouseParallax(containerRef)

  return (
    <div ref={containerRef} className="relative min-h-[70vh] rounded-3xl p-8 overflow-hidden bg-gradient-to-br from-black/60 to-rose-900/30 border border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6">
        <motion.div
          onClick={() => setExploded(true)}
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 shadow-[0_0_50px_rgba(244,63,94,0.6)] cursor-pointer"
        />

        <p className="text-white/80 max-w-2xl">Tap the glowing heart</p>
      </div>

      <AnimatePresence>
        {exploded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="max-w-3xl text-center text-3xl md:text-5xl font-semibold text-rose-100"
            >
              “My heart beats for you, Fatima. Happy Birthday, my love.”
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="parallax-item absolute w-2 h-2 bg-rose-400/60 rounded-full"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1], y: [-10, -30, -15, -40] }}
          transition={{ delay: i * 0.05, duration: 6, repeat: Infinity }}
          style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
        />
      ))}
    </div>
  )
}
