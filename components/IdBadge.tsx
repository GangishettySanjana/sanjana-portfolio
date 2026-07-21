'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────
   Lanyard ID badge.

   Built from CSS and SVG rather than a flat image so it stays crisp at
   any size, the photo can be swapped without re-exporting artwork, and
   the accent recolours from one variable (--badge-accent).

   The badge hangs from a single strap and swings from the clip. Drag it
   and it follows your pointer; let go and it settles with a damped
   swing, the way something on a lanyard actually would. Under
   prefers-reduced-motion it simply hangs still.

   Decorative parts are aria-hidden; the photo keeps a real alt, and the
   name and role are live text.
   ───────────────────────────────────────────────────────────────── */

const MAX_ANGLE = 22   // degrees either side, so it never reads as spinning
const REST_ANGLE = -2  // hangs very slightly off-plumb, like a real badge

export default function IdBadge({
  photo,
  alt,
  name,
  role,
  className,
}: {
  photo: string
  alt: string
  name: string
  role: string
  className?: string
}) {
  const swingRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(REST_ANGLE)
  const [dragging, setDragging] = useState(false)
  const reduce = useRef(false)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  /* Rotation tracks how far the pointer is from the pivot, so the badge
     leads your hand rather than snapping to it. */
  const angleFrom = useCallback((clientX: number) => {
    const el = swingRef.current
    if (!el) return REST_ANGLE
    const r = el.getBoundingClientRect()
    const pivotX = r.left + r.width / 2
    const dx = clientX - pivotX
    const raw = (dx / (r.width || 1)) * 60
    return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduce.current) return
    /* Capture keeps the drag alive if the pointer leaves the badge, but it
       throws when the pointer id is not active. Never let that abort the
       drag — the swing works fine without capture. */
    try {
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
    } catch {
      /* no capture available; drag still tracks via the move handler */
    }
    setDragging(true)
    setAngle(angleFrom(e.clientX))
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setAngle(angleFrom(e.clientX))
  }
  const release = () => {
    if (!dragging) return
    setDragging(false)
    setAngle(REST_ANGLE) // the CSS transition does the settling
  }

  return (
    <div className={`idbadge${className ? ' ' + className : ''}`}>
      <div
        ref={swingRef}
        className={`idbadge-swing${dragging ? ' is-dragging' : ''}`}
        style={{ transform: `rotate(${angle}deg)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={release}
      >
        {/* single strap running up out of frame */}
        <div className="idbadge-lanyard" aria-hidden="true">
          <span className="idbadge-strap" />
          <span className="idbadge-clip" />
        </div>

        <div className="idbadge-card">
          {/* red chevron tab the clip passes through */}
          <div className="idbadge-tab" aria-hidden="true" />
          {/* scalloped left edge */}
          <div className="idbadge-scallop" aria-hidden="true" />

          <div className="idbadge-body">
            <div className="idbadge-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt={alt} draggable={false} />
            </div>

            <p className="idbadge-name">{name}</p>
            <p className="idbadge-role">{role}</p>

            <div className="idbadge-barcode" aria-hidden="true" />
          </div>

          {/* starburst, breaking the card's bottom-right corner */}
          <svg className="idbadge-star" viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M50 0 L59 32 L82 12 L70 41 L100 38 L74 54 L98 74 L67 68 L72 100 L50 76
                 L28 100 L33 68 L2 74 L26 54 L0 38 L30 41 L18 12 L41 32 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
