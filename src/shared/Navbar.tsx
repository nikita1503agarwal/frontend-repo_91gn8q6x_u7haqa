import { motion } from 'framer-motion'
import { Heart, Image, NotebookText, Sparkles, Lock } from 'lucide-react'

const items = [
  { id: 'heartbeat', icon: Heart, label: 'Heartbeat' },
  { id: 'letter', icon: NotebookText, label: 'Love Letter' },
  { id: 'memories', icon: Image, label: 'Memories' },
  { id: 'reasons', icon: Sparkles, label: 'Reasons' },
  { id: 'surprise', icon: Lock, label: 'Surprise' },
]

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 py-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-rose-300 font-semibold">
            For Fatima, with love
          </motion.div>
          <div className="ml-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            {items.map(({ id, icon: Icon, label }) => (
              <a key={id} href={`#${id}`} className="group px-3 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition flex items-center gap-2">
                <Icon size={16} className="text-rose-300 group-hover:scale-110 transition" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
