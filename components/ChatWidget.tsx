'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'What are you working on right now?',
  'Tell me about FlairX',
  'What kind of roles are you looking for?',
  "What's your design process like?",
  'How do you work with engineers?',
]

// Pool of follow-up chips shown after each reply (ones already asked get filtered out)
const FOLLOWUPS = [
  'What was the hardest part?',
  'What would you do differently?',
  'Tell me about the AI Trust Meter',
  'Tell me about FlairX',
  'How do you work with engineers?',
  'What are you looking for in a role?',
  'What tools do you use?',
  'Why product design?',
  'What do you do for fun?',
  'Show me another project',
]

// Playful "thinking" lines that rotate while a reply is loading
const THINKING = [
  'thinking like Sanju…',
  'digging through my case studies…',
  'pouring a coffee…',
  'checking my notes…',
]

// Easter eggs: when the user's message matches, float a little burst of emoji
const EGGS: { test: RegExp; emojis: string[]; count: number }[] = [
  { test: /\b(hire|hiring|work together|working together|join (your|the) team|let'?s work|job offer|offer you)\b/i, emojis: ['🎉', '✨', '💛', '🎊'], count: 26 },
  { test: /\b(coffee|latte|espresso|chai|cafe|café)\b/i, emojis: ['☕'], count: 7 },
  { test: /\b(amazing|awesome|love (it|this)|incredible|stunning|brilliant|wow|impressive)\b/i, emojis: ['✨', '💛'], count: 12 },
]

interface Egg { id: number; emoji: string; x: number; delay: number; size: number; rotate: number }

export default function ChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [placeholder, setPlaceholder] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [thinkIdx, setThinkIdx] = useState(0)
  const [eggs, setEggs] = useState<Egg[]>([])
  const eggId = useRef(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, suggestions])

  // Rotate the playful "thinking" line while loading
  useEffect(() => {
    if (!loading) return
    setThinkIdx(0)
    const id = setInterval(() => setThinkIdx((i) => (i + 1) % THINKING.length), 1400)
    return () => clearInterval(id)
  }, [loading])

  // Auto-typing rotating placeholder, only while the bar is empty and the panel is closed
  useEffect(() => {
    if (open || input) {
      setPlaceholder('Ask me anything...')
      return
    }
    let q = 0
    let char = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const text = SUGGESTED_QUESTIONS[q]
      if (!deleting) {
        char++
        setPlaceholder(text.slice(0, char))
        if (char === text.length) {
          deleting = true
          timer = setTimeout(tick, 1700)
          return
        }
      } else {
        char--
        setPlaceholder(text.slice(0, char))
        if (char === 0) {
          deleting = false
          q = (q + 1) % SUGGESTED_QUESTIONS.length
        }
      }
      timer = setTimeout(tick, deleting ? 30 : 55)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [open, input])

  function fireEggs(text: string) {
    const egg = EGGS.find((e) => e.test.test(text))
    if (!egg) return
    const items: Egg[] = Array.from({ length: egg.count }, () => ({
      id: eggId.current++,
      emoji: egg.emojis[Math.floor(Math.random() * egg.emojis.length)],
      x: Math.random() * 92 + 4,
      delay: Math.random() * 0.35,
      size: 18 + Math.random() * 16,
      rotate: Math.random() * 70 - 35,
    }))
    setEggs((prev) => [...prev, ...items])
    const ids = new Set(items.map((i) => i.id))
    setTimeout(() => setEggs((prev) => prev.filter((e) => !ids.has(e.id))), 2400)
  }

  function pickFollowups(history: Message[]): string[] {
    const asked = history
      .filter((m) => m.role === 'user')
      .map((m) => m.content.toLowerCase().trim())
    const pool = FOLLOWUPS.filter(
      (q) => !asked.some((a) => a === q.toLowerCase() || a.includes(q.toLowerCase().slice(0, 12)))
    )
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    setError(null)
    setOpen(true)
    setSuggestions([])
    fireEggs(text)

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Request failed')

      const finalMessages = [...newMessages, { role: 'assistant' as const, content: data.reply }]
      setMessages(finalMessages)
      setSuggestions(pickFollowups(finalMessages))
    } catch (err) {
      setError('My brain buffered for a sec. Try that again?')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  // Keep the assistant off the game routes (so it doesn't show inside the embed).
  if (pathname.startsWith('/play')) return null

  return (
    <>
      {/* Chat panel, opens above the bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-[92px] z-50 w-[calc(100%-2rem)] max-w-[400px] bg-white rounded-[22px] shadow-stamp border border-black/[0.06] overflow-hidden flex flex-col"
            style={{ right: '1rem', maxHeight: '74vh' }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Floating easter-egg layer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
              <AnimatePresence>
                {eggs.map((e) => (
                  <motion.span
                    key={e.id}
                    className="absolute select-none"
                    style={{ left: `${e.x}%`, bottom: 72, fontSize: e.size }}
                    initial={{ y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ y: -280, opacity: [0, 1, 1, 0], scale: 1, rotate: e.rotate }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.9, delay: e.delay, ease: 'easeOut' }}
                  >
                    {e.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* Header — iMessage-style, avatar over centered name */}
            <div className="relative flex flex-col items-center gap-1 px-5 pt-4 pb-3 border-b border-black/[0.06]">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#F2F2F7]">
                <img src="/images/sanju-avatar.png" alt="Sanju" className="w-full h-full object-cover" />
              </div>
              <div className="text-center leading-tight">
                <p className="font-body text-[13px] font-semibold text-[#1c1c1e]">Sanju</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-[#c7c7cc] hover:text-[#1c1c1e] transition-colors p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 chat-scrollbar min-h-0">
              {/* Welcome state — Sanju's first text + tappable chips */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="imsg imsg-received">
                      I&apos;m Sanju 👋 ask me anything about my work, my process, or what I&apos;m looking for.
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 pl-0.5">
                    {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                      <button key={q} onClick={() => sendMessage(q)} className="imsg-chip">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message history */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`imsg ${msg.role === 'user' ? 'imsg-sent' : 'imsg-received'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator — dots in a gray received bubble */}
              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="imsg imsg-received flex gap-1.5 items-center !py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#9a9a9f]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Follow-up suggestion chips (after a reply) */}
              {!loading && suggestions.length > 0 && messages.length > 0 && (
                <motion.div
                  className="flex flex-col items-start gap-1.5 pt-1 pl-0.5"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => sendMessage(s)} className="imsg-chip">
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <p className="font-label text-[11px] text-red-500 text-center">{error}</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input bar — iMessage rounded field + blue send */}
            <form onSubmit={handleSubmit} className="imsg-inputbar">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                aria-label="Ask Sanju anything"
                className="imsg-input"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="imsg-send"
                aria-label="Send message"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </button>
            </form>
            <p className="imsg-disclaimer">An AI assistant trained on my work, so answers may be imperfect.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bar, always visible, right aligned at the bottom */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed z-50 w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-2xl rounded-full shadow-stamp border border-white/30 hover:bg-white/30 transition-colors"
        style={{ bottom: '25px', right: '25px' }}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[#8e8e93]" aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
      </motion.button>

      {/* Original form - now hidden when closed */}
    </>
  )
}
