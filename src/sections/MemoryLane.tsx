import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop', caption: 'Our laughter echoing into forever' },
  { src: 'https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=1200&auto=format&fit=crop', caption: 'Sunsets feel warmer with you' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', caption: 'Quiet moments, loud hearts' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', caption: 'Every road leads me to you' },
  { src: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPdXIlMjBsYXVnaHRlciUyMGVjaG9pbmclMjBpbnRvfGVufDB8MHx8fDE3NjM1NzExMjN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', caption: 'Your smile, my forever favorite' },
]

export default function MemoryLane() {
  const [active, setActive] = useState<number | null>(null)

  const shuffleMemory = () => {
    const i = Math.floor(Math.random() * photos.length)
    setActive(i)
  }

  return (
    <div className="min-h-[70vh] rounded-3xl p-4 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ y: -6, rotate: (i % 2 ? 1 : -1) * 2 }}
            className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img src={p.src} className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-6">
        <motion.button onClick={shuffleMemory} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="px-5 py-3 rounded-full bg-rose-500 text-white shadow-lg">
          Shuffle Memory
        </motion.button>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img src={photos[active].src} className="w-full h-80 object-cover" />
              <div className="p-6">
                <p className="text-slate-700 text-lg">{photos[active].caption}</p>
                <div className="text-right mt-4">
                  <button onClick={() => setActive(null)} className="px-4 py-2 rounded-lg bg-slate-900 text-white">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
