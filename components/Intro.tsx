'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './Preloader'

/**
 * Shows the intro curtain on every full page load (refresh / direct entry).
 * It does NOT replay on in-site navigation, since the layout stays mounted.
 * Skipped entirely under reduced motion.
 */
export default function Intro() {
  const [show, setShow] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMounted(false)
      return
    }
    const t = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {show && <Preloader />}
    </AnimatePresence>
  )
}
