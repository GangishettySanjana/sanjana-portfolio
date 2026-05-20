'use client'
import { useState } from 'react'

const MOODS = [
  {
    id: 'recommended',
    emoji: '⭐',
    label: 'Recommended',
    artist: 'Ólafur Arnalds',
    desc: 'Cinematic electronics',
    color: '#C9A84C',
    spotifyId: '37i9dQZF1DX4OzrY981I1W',
  },
  {
    id: 'focus',
    emoji: '🎯',
    label: 'Deep Work',
    artist: 'Jon Hopkins',
    desc: 'No lyrics, pure flow',
    color: '#2BB5C2',
    spotifyId: '37i9dQZF1DWZeKCadgRdKQ',
  },
  {
    id: 'chill',
    emoji: '🌊',
    label: 'Drift',
    artist: 'Tycho',
    desc: 'Warm synths, no words',
    color: '#A880D4',
    spotifyId: '37i9dQZF1DX8NTLI2TtZa6',
  },
  {
    id: 'study',
    emoji: '☕',
    label: 'Settle In',
    artist: 'Nils Frahm',
    desc: 'Intimate piano',
    color: '#4DAA60',
    spotifyId: '37i9dQZF1DX4sWSpwq3LiO',
  },
  {
    id: 'creative',
    emoji: '✦',
    label: 'Make Things',
    artist: 'Bicep',
    desc: 'Driving, lyric-free',
    color: '#E07B54',
    spotifyId: '37i9dQZF1DX5trt9i14X7j',
  },
]

function Waveform({
  color = '#C9A84C',
  active = false,
  large = false,
}: {
  color?: string
  active?: boolean
  large?: boolean
}) {
  const heights = large
    ? [6, 14, 9, 18, 7, 16, 11, 19, 8]
    : [4, 8, 6, 10, 5, 9, 7]
  const size = large ? { w: 3, gap: 3, h: 20 } : { w: 2.5, gap: 2, h: 14 }
  const speed = large ? 0.45 : 0.75

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: size.gap,
        height: size.h,
        marginRight: 2,
      }}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            width: size.w,
            height: active ? h : large ? 4 : 3,
            background: color,
            borderRadius: 2,
            display: 'block',
            transition: 'height 0.2s ease',
            animation: active
              ? `wave${i % 3} ${speed}s ease-in-out ${i * 0.07}s infinite alternate`
              : 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes wave0 { from { height: 3px } to { height: ${large ? 16 : 11}px } }
        @keyframes wave1 { from { height: 5px } to { height: ${large ? 20 : 14}px } }
        @keyframes wave2 { from { height: 4px } to { height: ${large ? 11 : 9}px } }
      `}</style>
    </span>
  )
}

function MusicWidget({
  defaultOpen = false,
  defaultMood = '',
}: {
  defaultOpen?: boolean
  defaultMood?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [selected, setSelected] = useState(defaultMood)
  const [isPlaying, setIsPlaying] = useState(defaultMood !== '')
  const [cardKey, setCardKey] = useState(0)

  const activeMood = MOODS.find(m => m.id === selected)

  function handleToggleOpen() {
    if (!open) setCardKey(k => k + 1)
    setOpen(o => !o)
  }

  function handleSelectMood(id: string) {
    if (selected === id) {
      setIsPlaying(p => !p)
    } else {
      setSelected(id)
      setIsPlaying(true)
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
      }}
    >
      <style>{`
        @keyframes cardSpring {
          0%   { opacity: 0; transform: scale(0.84) translateY(16px); }
          60%  { opacity: 1; transform: scale(1.02) translateY(-2px); }
          80%  { transform: scale(0.99) translateY(1px); }
          100% { transform: scale(1)    translateY(0); }
        }
        @keyframes pillSlide {
          from { opacity: 0; transform: translateX(-10px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        .mw-pill {
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.18s ease;
        }
        .mw-pill:hover { transform: scale(1.02); }
        .mw-pill:active { transform: scale(0.96) !important; }
        .mw-playbtn {
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.15s ease;
        }
        .mw-playbtn:hover { transform: scale(1.12); }
        .mw-playbtn:active { transform: scale(0.9) !important; }
      `}</style>

      {/* Card */}
      {open && (
        <div
          key={cardKey}
          style={{
            width: 300,
            background: '#FDFCFA',
            borderRadius: 20,
            boxShadow:
              '0 24px 64px rgba(10,15,30,0.18), 0 1px 0 rgba(255,255,255,0.9) inset',
            border: '1px solid rgba(0,36,72,0.08)',
            overflow: 'hidden',
            transformOrigin: 'bottom right',
            animation: 'cardSpring 0.52s cubic-bezier(0.34,1.56,0.64,1) forwards',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 18px 14px',
              borderBottom: '1px solid rgba(0,36,72,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,36,72,0.4)',
                  margin: '0 0 4px',
                }}
              >
                {isPlaying && selected
                  ? 'Now playing'
                  : selected
                  ? 'Paused'
                  : 'Pick a vibe'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Waveform
                  color={activeMood?.color ?? '#C9A84C'}
                  active={!!selected && isPlaying}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-display), Georgia, serif',
                    fontSize: 15,
                    fontStyle: 'italic',
                    color: '#002448',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {activeMood ? activeMood.artist : 'Pick your vibe'}
                </p>
              </div>
            </div>

            {/* Play / Pause */}
            {selected && activeMood && (
              <button
                className="mw-playbtn"
                onClick={() => setIsPlaying(p => !p)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeMood.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 14px ${activeMood.color}66`,
                }}
              >
                {isPlaying ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="white">
                    <rect x="0.5" y="0.5" width="3.5" height="10" rx="1.5" />
                    <rect x="7" y="0.5" width="3.5" height="10" rx="1.5" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="white">
                    <path d="M2 1L10 5.5L2 10V1Z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Mood pills */}
          <div
            style={{
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 7,
            }}
          >
            {MOODS.map((mood, i) => {
              const isActive = selected === mood.id
              const isRec = mood.id === 'recommended'
              return (
                <button
                  key={mood.id}
                  className="mw-pill"
                  onClick={() => handleSelectMood(mood.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive
                      ? mood.color
                      : isRec
                      ? 'rgba(201,168,76,0.08)'
                      : 'rgba(0,36,72,0.03)',
                    outline:
                      isRec && !isActive
                        ? '1.5px solid rgba(201,168,76,0.4)'
                        : 'none',
                    animation: `pillSlide 0.38s cubic-bezier(0.34,1.56,0.64,1) ${
                      0.1 + i * 0.06
                    }s both`,
                  }}
                >
                  <span style={{ fontSize: 15, flexShrink: 0 }}>
                    {mood.emoji}
                  </span>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-label), sans-serif',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        margin: '0 0 1px',
                        color: isActive ? '#FFFFFF' : '#002448',
                      }}
                    >
                      {mood.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Georgia, serif',
                        fontSize: 12,
                        color: isActive
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(0,36,72,0.45)',
                        margin: 0,
                      }}
                    >
                      {mood.desc}
                    </p>
                  </div>
                  {isRec && !isActive && (
                    <span
                      style={{
                        fontFamily: 'var(--font-label), sans-serif',
                        fontSize: 9,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#C9A84C',
                        fontWeight: 700,
                      }}
                    >
                      Pick
                    </span>
                  )}
                  {isActive && (
                    <Waveform
                      color="rgba(255,255,255,0.85)"
                      active={isPlaying}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Spotify embed — mounts when playing, unmounts when paused (stops audio) */}
          {isPlaying && selected && activeMood && (
            <div style={{ padding: '0 14px 14px' }}>
              <iframe
                key={activeMood.spotifyId}
                src={`https://open.spotify.com/embed/playlist/${activeMood.spotifyId}?utm_source=generator&theme=0&autoplay=1`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: 10, display: 'block' }}
              />
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              padding: '10px 18px',
              borderTop: '1px solid rgba(0,36,72,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 10,
                color: 'rgba(0,36,72,0.3)',
                margin: 0,
                letterSpacing: '0.08em',
              }}
            >
              Powered by Spotify
            </p>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleToggleOpen}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: open ? '#002448' : '#FDFCFA',
          boxShadow:
            '0 8px 32px rgba(10,15,30,0.18), 0 1px 0 rgba(255,255,255,0.9) inset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {selected ? (
          <Waveform
            color={open ? '#FFFFFF' : activeMood?.color ?? '#C9A84C'}
            active={isPlaying}
            large
          />
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? '#FFFFFF' : '#002448'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default function MusicPreviewPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F3EF',
        fontFamily: 'var(--font-body), Georgia, serif',
        padding: '60px 40px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-label), sans-serif',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(0,36,72,0.4)',
          marginBottom: 8,
        }}
      >
        Music widget — preview
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 42,
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#002448',
          marginBottom: 64,
          lineHeight: 1.1,
        }}
      >
        Pick your vibe.
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 80,
          alignItems: 'end',
        }}
      >
        {/* State 1 */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,36,72,0.35)',
              marginBottom: 20,
            }}
          >
            01 — Button, idle
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MusicWidget defaultOpen={false} defaultMood="" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 13,
              color: 'rgba(0,36,72,0.45)',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            Sits bottom-right on every page. Subtle. Click to open.
          </p>
        </div>

        {/* State 2 */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,36,72,0.35)',
              marginBottom: 20,
            }}
          >
            02 — Card open
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MusicWidget defaultOpen={true} defaultMood="" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 13,
              color: 'rgba(0,36,72,0.45)',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            Spring bounce on open. Pills stagger in. Click any vibe to play.
          </p>
        </div>

        {/* State 3 */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,36,72,0.35)',
              marginBottom: 20,
            }}
          >
            03 — Playing
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MusicWidget defaultOpen={true} defaultMood="recommended" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 13,
              color: 'rgba(0,36,72,0.45)',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            Play/pause button in header. Click same pill to pause. Switch vibes
            seamlessly.
          </p>
        </div>
      </div>
    </div>
  )
}
