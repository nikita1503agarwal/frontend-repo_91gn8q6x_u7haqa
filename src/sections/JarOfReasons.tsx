import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReasonsStore } from '../store/reasons'

export default function JarOfReasons() {
  const getRandom = useReasonsStore((s) => s.getRandom)
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState(getRandom())

  const pick = () => {
    setReason(getRandom())
    setOpen(true)
  }

  return (
    <div className="min-h-[70vh] rounded-3xl p-8 bg-gradient-to-br from-sky-900/40 to-violet-900/40 border border-white/10">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <motion.div
            className="w-48 h-64 rounded-b-[2rem] bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl"
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute left-1/2 -translate-x-1/2 w-28 h-10 bg-amber-200/80 rounded-md rotate-[-6deg] shadow" initial={{ y: 30 + i * 12, opacity: 0.6 }} animate={{ y: [30 + i * 12, 20 + i * 12, 30 + i * 12] }} transition={{ duration: 2 + i * 0.2, repeat: Infinity }} />
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={pick} className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg">
          Pick a reason
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg w-full rounded-2xl bg-white p-6 text-slate-800 shadow-2xl">
                <p className="text-xl">{reason.text}</p>
                <div className="text-right mt-6">
                  <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-slate-900 text-white">Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
