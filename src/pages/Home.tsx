import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../shared/Navbar'
import Heartbeat from '../sections/Heartbeat'
import TypingLetter from '../sections/TypingLetter'
import MemoryLane from '../sections/MemoryLane'
import JarOfReasons from '../sections/JarOfReasons'
import SurpriseLetter from '../sections/SurpriseLetter'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    const ctx = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-slate-950 text-white">
      <div className="parallax-bg pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-fuchsia-900/20 to-slate-950" />
      <Navbar />
      <main className="relative">
        <Section id="heartbeat"><Heartbeat /></Section>
        <Section id="letter"><TypingLetter /></Section>
        <Section id="memories"><MemoryLane /></Section>
        <Section id="reasons"><JarOfReasons /></Section>
        <Section id="surprise"><SurpriseLetter /></Section>
      </main>
    </div>
  )
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="w-full max-w-6xl">
        {children}
      </motion.div>
    </section>
  )
}
