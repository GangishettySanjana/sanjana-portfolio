'use client'

/* ─────────────────────────────────────────────────────────────────
   Lanyard ID badge.

   Built from CSS and SVG rather than a flat image so it stays crisp at
   any size, the photo can be swapped without re-exporting artwork, and
   the accent recolours from one variable (--badge-accent).

   Purely decorative parts are aria-hidden; the photo keeps a real alt,
   and the name and role are live text so they are readable by screen
   readers and selectable.
   ───────────────────────────────────────────────────────────────── */

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
  return (
    <div className={`idbadge${className ? ' ' + className : ''}`}>
      {/* lanyard */}
      <div className="idbadge-lanyard" aria-hidden="true">
        <span className="idbadge-strap idbadge-strap-l" />
        <span className="idbadge-strap idbadge-strap-r" />
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
            <img src={photo} alt={alt} />
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
  )
}
