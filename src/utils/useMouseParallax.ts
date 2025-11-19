import { useEffect } from 'react'

export function useMouseParallax(container: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = container.current
    if (!el) return

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.querySelectorAll<HTMLElement>('.parallax-item').forEach((item, i) => {
        const depth = (i % 5) + 1
        item.style.transform = `translate(${x * depth * 6}px, ${y * depth * 6}px)`
      })
    }

    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [container])
}
