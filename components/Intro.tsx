'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Preloader from './Preloader'

const NO_CURTAIN_PATHS = ['/daily-ui']

export default function Intro() {
  const pathname = usePathname()
  const [show, setShow] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (NO_CURTAIN_PATHS.some(p => pathname.startsWith(p))) {
      setMounted(false)
      return
    }
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
