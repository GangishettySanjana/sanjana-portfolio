'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './Preloader'

/**
 * Shows the intro curtain once per browser session — plays on the first load,
 * then stays out of the way on later loads/refreshes within the session (no
 * animation replay). Skipped entirely under reduced motion.
 */
export default function Intro() {
  const [show, setShow] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('sanjuIntroSeen')
    if (reduce || seen) {
      // Already shown this session (or reduced motion): drop it instantly,
      // without triggering the slide-up exit.
      setMounted(false)
      return
    }
    sessionStorage.setItem('sanjuIntroSeen', '1')
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
