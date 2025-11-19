import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SurpriseLetter() {
  const [ok, setOk] = useState(false)
  const [pwd, setPwd] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwd.toLowerCase() === 'fatima') setOk(true)
    else {
      setOk(false)
    }
  }

  return (
    <div className="min-h-[70vh] rounded-3xl p-6 md:p-8 border border-white/10 bg-gradient-to-br from-indigo-900/40 to-rose-900/40">
      {!ok ? (
        <form onSubmit={submit} className="mx-auto max-w-md text-center space-y-4">
          <h3 className="text-2xl font-semibold">A tiny lock for a big surprise</h3>
          <input value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter secret word" className="w-full rounded-2xl bg-white/10 px-5 py-4 outline-none ring-2 ring-transparent focus:ring-fuchsia-400/70 text-white" />
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow">
            Unlock
          </motion.button>
        </form>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prose prose-invert max-w-none">
            <motion.h3 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl font-serif">My Love Letter to You</motion.h3>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
              To my dearest Fatima, you are my favorite constant, my softest place to land, and the melody that never leaves my heart. With every day, I find a new reason to love you deeper.
            </motion.p>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Thank you for your kindness, your courage, and the way you make the world gentler just by being in it. Happy Birthday, my love.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              {['https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1502139214984-08f6b1b9f274?q=80&w=1200&auto=format&fit=crop'].map((s, i) => (
                <motion.img key={i} src={s} className="rounded-xl shadow-lg" initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
