'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Intro curtain — a white screen cycling "hello" through several languages,
 * then it lifts away like a curtain with a curved bottom edge (the panel
 * slides up while its curved base flattens, so the site is revealed at the
 * sides first, arching up through the middle). AnimatePresence in Intro plays
 * the exit. Skipped under reduced motion.
 */
const words = ['Hello', 'Bonjour', 'Ciao', 'Olà', 'やあ', 'Hallå', 'नमस्ते', '안녕하세요', '你好', 'Hola']

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
}

const slideUp = {
  initial: { top: 0 },
  exit: { top: '-100vh', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
}

export default function Preloader() {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) return
    const t = setTimeout(() => setIndex(index + 1), index === 0 ? 800 : 140)
    return () => clearTimeout(t)
  }, [index])

  const { width, height } = dimension
  // Curtain shape: a full-screen rectangle whose bottom edge bulges down 300px
  // (initial), then flattens on exit — that flatten + the slide gives the curve.
  const initialPath = width
    ? `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`
    : ''
  const targetPath = width
    ? `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`
    : ''

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  }

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className="preloader">
      <motion.p className="preloader-word" variants={opacity} initial="initial" animate="enter">
        {words[index]}
      </motion.p>
      {width > 0 && (
        <svg className="preloader-curve">
          <motion.path variants={curve} initial="initial" exit="exit" />
        </svg>
      )}
    </motion.div>
  )
}
