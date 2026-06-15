'use client'

import { useState, useRef, useEffect } from 'react'
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
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    setError(null)

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

      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError('Something went wrong. Try again?')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:w-[360px] bg-white rounded-2xl shadow-stamp border border-[var(--color-border)] overflow-hidden flex flex-col"
            style={{ maxHeight: '75vh' }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-roasted text-lace">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-butter flex items-center justify-center">
                  <span className="font-display text-sm font-semibold text-roasted">S</span>
                </div>
                <div>
                  <p className="font-label text-[12px] uppercase tracking-widest text-lace">
                    Chat with Sanju
                  </p>
                  <p className="font-label text-[10px] text-[#A8B5C4] tracking-wide">
                    Powered by Claude
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#A8B5C4] hover:text-lace transition-colors p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar min-h-0">

              {/* Welcome state */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="font-body text-[15px] text-roasted leading-relaxed">
                    Hey! I&apos;m Sanju 👋 Ask me anything — about my work, my process, what I&apos;m looking for, or just say hi.
                  </p>
                  <div className="space-y-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left font-body text-[13px] text-text-muted px-3 py-2 rounded-lg bg-lace hover:bg-[#ece8e1] transition-colors"
                      >
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
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-[14px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-roasted text-lace rounded-br-sm'
                        : 'bg-lace text-roasted rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-lace rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-text-muted"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <p className="font-label text-[11px] text-red-500 text-center">{error}</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-[var(--color-border)]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 font-body text-[14px] text-roasted placeholder:text-text-faint bg-transparent outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full bg-roasted text-lace flex items-center justify-center disabled:opacity-30 hover:bg-roasted-dark transition-colors text-sm"
                aria-label="Send message"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="chat-fab fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04 }}
        aria-label={open ? 'Close chat' : 'Chat with Sanju'}
      >
        {/* "online" pulse dot when closed */}
        {!open && (
          <span className="absolute top-1 right-1">
            <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-500 opacity-50 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#e8e8e8]" />
          </span>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="23" height="23" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
