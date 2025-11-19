import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const message = [
  "Hey Fatima… I know you're reading this with your cute smile.",
  "Today is your day, and I just want to tell you…",
  'You are my calm after storms, my laughter in quiet rooms,',
  'the warmth in my favorite memories, and the dream I get to live.',
  'Thank you for being you. Happy Birthday, my love.'
]

export default function TypingLetter() {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i < message.length) {
        setLines((prev) => [...prev, message[i]])
        i++
      } else {
        clearInterval(id)
      }
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-[70vh] rounded-3xl p-8 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center border border-white/10">
      <div className="backdrop-blur-sm bg-amber-50/70 rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="prose prose-lg max-w-none font-serif">
          {lines.map((line, idx) => (
            <motion.p key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-slate-800">
              {line}
              {idx === lines.length - 1 && <span className="ml-1 animate-pulse">|</span>}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}
