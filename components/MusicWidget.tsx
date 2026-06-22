'use client'
import { useState } from 'react'

const VIBE = {
  artist: 'Luther, lo-fi',
  trackId: '6mh5qxroeTY1UqOh4JdV1x',
}

export default function MusicWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
      }}
    >
      <style>{`
        @keyframes mw-embedIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes mw-labelIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mw-btn {
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.2s ease, box-shadow 0.2s ease;
        }
        .mw-btn:hover { transform: scale(1.1); }
        .mw-btn:active { transform: scale(0.92) !important; }
      `}</style>

      {/* Spotify embed, slides in above the button */}
      {open && (
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 56px rgba(10,15,30,0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
            animation: 'mw-embedIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards',
          }}
        >
          <iframe
            key="vibe"
            src={`https://open.spotify.com/embed/track/${VIBE.trackId}?utm_source=generator&theme=0`}
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block' }}
          />
        </div>
      )}

      {/* Label + button row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Info label, visible when idle */}
        {!open && (
          <span
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'rgba(0,36,72,0.45)',
              background: 'rgba(253,252,250,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid rgba(0,36,72,0.08)',
              boxShadow: '0 4px 16px rgba(10,15,30,0.08)',
              whiteSpace: 'nowrap',
              animation: 'mw-labelIn 0.3s ease forwards',
              cursor: 'default',
            }}
          >
            🔊 check volume · play some vibe ✦
          </span>
        )}

        {/* Play / Pause button */}
        <button
          className="mw-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close player' : 'Play background music'}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: open ? '#002448' : '#FDFCFA',
            boxShadow: open
              ? '0 8px 32px rgba(0,36,72,0.28)'
              : '0 8px 32px rgba(10,15,30,0.14), 0 1px 0 rgba(255,255,255,0.9) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {open ? (
            /* Pause bars */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="4.5" height="12" rx="2" fill="white" />
              <rect x="8.5" y="1" width="4.5" height="12" rx="2" fill="white" />
            </svg>
          ) : (
            /* Play triangle */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5L13 7L3 12.5V1.5Z" fill="#002448" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
