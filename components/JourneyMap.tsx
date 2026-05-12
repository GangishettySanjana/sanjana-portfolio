"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";

export type JourneyItem = {
  year: number;
  title: string;
  subtitle?: string;
  location?: string;
  blurb: string;
  tags?: string[];
  image?: string;
  turning?: boolean;
};

type Props = {
  items: JourneyItem[];
  accent?: string;
  title?: string;
  eyebrow?: string;
  inline?: boolean;
  onPick?: (item: JourneyItem, index: number) => void;
  initialIndex?: number;
};

export function JourneyMap({
  items,
  accent = "#A880D4",
  title = "the whole journey, at once",
  eyebrow = "map view · all chapters",
  inline = false,
  onPick,
  initialIndex,
}: Props) {
  const defaultIdx = initialIndex ?? Math.max(0, items.findIndex((i) => i.turning));
  const [activeIdx, setActiveIdx] = useState(defaultIdx);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const previewIdx = hoverIdx ?? activeIdx;
  const previewItem = items[previewIdx] ?? items[0];

  const layout = useMemo(() => {
    const n = items.length;
    return items.map((it, i) => {
      const t = n <= 1 ? 0.5 : i / (n - 1);
      const x = 8 + t * 84;
      const yBase = 50 + Math.sin(t * Math.PI * 2.2) * 22;
      const y = it.turning ? 50 : yBase;
      const size = it.turning ? 26 : 13 + Math.sin(t * 9) * 2;
      return { x, y, size };
    });
  }, [items]);

  const handlePick = useCallback((i: number) => {
    setActiveIdx(i);
    onPick?.(items[i], i);
  }, [items, onPick]);

  // Position card next to the hovered node
  const handleMouseEnter = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setHoverIdx(i);
    if (stageRef.current) {
      const stageRect = stageRef.current.getBoundingClientRect();
      const nodeRect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
      const x = nodeRect.left - stageRect.left + nodeRect.width / 2;
      const y = nodeRect.top - stageRect.top + nodeRect.height / 2;
      setCardPos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setHoverIdx(null);
    setCardPos(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveIdx((i) => Math.min(items.length - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  // Compute card placement — flip to left if too close to right edge
  const getCardStyle = (): React.CSSProperties => {
    if (!cardPos || !stageRef.current) return { display: "none" };
    const stageW = stageRef.current.offsetWidth;
    const cardW = 320;
    const gap = 18;
    const fromRight = stageW - cardPos.x;
    const goLeft = fromRight < cardW + gap + 40;
    return {
      position: "absolute",
      top: Math.max(0, cardPos.y - 120),
      left: goLeft ? cardPos.x - cardW - gap : cardPos.x + gap,
      width: cardW,
      zIndex: 20,
      pointerEvents: "none",
    };
  };

  return (
    <div
      className={"jm-root" + (inline ? " jm-inline" : "")}
      style={{ ["--jm-accent" as string]: accent }}
      role="region"
      aria-label="Journey map"
    >
      {/* Header */}
      <div className="jm-header">
        <div className="jm-eyebrow">{eyebrow}</div>
        <div className="jm-headline">{title}</div>
      </div>

      {/* Stage — the winding path + nodes */}
      <div className="jm-stage" ref={stageRef}>
        <svg
          className="jm-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={layout.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="0.15"
            fill="none"
            strokeDasharray="0.6 0.5"
          />
        </svg>

        {items.map((it, i) => {
          const p = layout[i];
          const isActive = i === activeIdx;
          const isHover = i === hoverIdx;
          const isTrailing = i === items.length - 1 && it.year >= 2026;

          if (isTrailing) {
            return (
              <div
                key={it.year}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  pointerEvents: 'none',
                }}
              >
                {/* dashed trailing line extending right */}
                <svg width="60" height="2" style={{ overflow: 'visible' }}>
                  <line x1="0" y1="1" x2="60" y2="1"
                    stroke="rgba(247,243,238,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="60" cy="1" r="3"
                    fill="none"
                    stroke="rgba(247,243,238,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>
                <span style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: 'clamp(15px, 1.8vw, 20px)',
                  color: '#F7F3EE',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <span>excited to see</span>
                  <span>what comes next.</span>
                </span>
              </div>
            );
          }

          return (
            <button
              key={it.year}
              type="button"
              className={
                "jm-node" +
                (it.turning ? " jm-turning" : "") +
                (isActive ? " jm-active" : "") +
                (isHover ? " jm-hover" : "")
              }
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size * 1.3}px`,
                height: `${p.size * 1.3}px`,
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => handleMouseEnter(i, e)}
              onMouseLeave={handleMouseLeave}
              onFocus={(e) => handleMouseEnter(i, e as unknown as React.MouseEvent<HTMLButtonElement>)}
              onClick={() => handlePick(i)}
              aria-label={`${it.year}: ${it.title}`}
            >
              <span className="jm-node-year">{it.year}</span>
            </button>
          );
        })}

        {/* Hover card — appears next to the node */}
        {hoverIdx !== null && cardPos && (
          <div className="jm-hover-card" style={getCardStyle()}>
            {previewItem.image && (
              <div className="jm-card-img">
                <img src={previewItem.image} alt={previewItem.title} />
                {previewItem.turning && (
                  <div className="jm-card-badge">★ turning point</div>
                )}
              </div>
            )}
            <div className="jm-card-body">
              <div className="jm-card-meta">
                {previewItem.year}{previewItem.location ? ` · ${previewItem.location}` : ""}
              </div>
              <div className="jm-card-title">{previewItem.title}</div>
              {previewItem.subtitle && (
                <div className="jm-card-sub">{previewItem.subtitle}</div>
              )}
              <div className="jm-card-blurb">
                {previewItem.blurb.split('\n\n').map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? '0 0 8px' : '0' }}>{para}</p>
                ))}
              </div>
              {previewItem.tags && previewItem.tags.length > 0 && (
                <div className="jm-card-tags">
                  {previewItem.tags.map((t) => (
                    <span key={t} className="jm-tag">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Persistent bottom bar — shows active item when not hovering */}
      <div className="jm-bar">
        <div className="jm-bar-year">{items[activeIdx]?.year}</div>
        <div className="jm-bar-title">{items[activeIdx]?.title}</div>
        <div className="jm-bar-hint">hover a year · ← → to navigate</div>
      </div>

      <style jsx>{`
        .jm-root {
          --jm-bg:      #334EAC;
          --jm-bg-2:    #2a4299;
          --jm-fg:      #F7F3EE;
          --jm-fg-dim:  rgba(247,243,238,0.65);
          --jm-fg-faint:rgba(247,243,238,0.35);
          --jm-line:    rgba(247,243,238,0.08);
          --jm-line-2:  rgba(247,243,238,0.22);
          --jm-display: var(--font-display, "Georgia", serif);
          --jm-sans:    var(--font-label, "Helvetica Neue", sans-serif);
          --jm-mono:    ui-monospace, "SF Mono", Menlo, monospace;

          position: relative;
          width: 100%;
          min-height: 680px;
          background: var(--jm-bg);
          color: var(--jm-fg);
          font-family: var(--jm-sans);
          overflow: hidden;
          border-radius: 20px;
        }
        .jm-root.jm-inline { min-height: 480px; }

        /* ── Header ── */
        .jm-header {
          position: absolute;
          top: 32px;
          left: 40px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .jm-eyebrow {
          font-family: var(--jm-mono);
          font-size: 10px;
          color: var(--jm-accent);
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }
        .jm-headline {
          font-family: var(--jm-display);
          font-style: italic;
          font-size: clamp(20px, 2.5vw, 30px);
          line-height: 1;
          color: var(--jm-fg);
          font-weight: 400;
        }

        /* ── Stage ── */
        .jm-stage {
          position: absolute;
          top: 110px;
          bottom: 72px;
          left: 40px;
          right: 40px;
        }
        .jm-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          color: var(--jm-fg);
        }

        /* ── Nodes ── */
        .jm-node {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--jm-bg-2);
          border: 1.5px solid var(--jm-line-2);
          color: var(--jm-fg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--jm-mono);
          font-size: 11px;
          font-weight: 500;
          padding: 0;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.15s, background 0.15s;
          animation: jmPop 0.5s cubic-bezier(0.2,0.8,0.2,1) both;
        }
        .jm-node-year {
          font-size: 10px;
          letter-spacing: -0.02em;
        }
        .jm-node:hover,
        .jm-node.jm-hover {
          transform: translate(-50%, -50%) scale(1.5);
          border-color: var(--jm-accent);
          background: rgba(168,128,212,0.15);
          z-index: 10;
        }
        .jm-node.jm-active {
          border-color: var(--jm-accent);
          background: var(--jm-accent);
          color: #fff;
        }
        .jm-node.jm-turning {
          background: var(--jm-accent);
          border: none;
          color: #fff;
          font-family: var(--jm-display);
          font-style: italic;
          font-size: 20px;
          font-weight: 400;
        }
        .jm-node.jm-turning:hover {
          transform: translate(-50%, -50%) scale(1.15);
        }
        .jm-node.jm-turning::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: var(--jm-accent);
          opacity: 0.18;
          animation: jmPulse 2s ease-in-out infinite;
        }
        @keyframes jmPop {
          from { transform: translate(-50%,-50%) scale(0); opacity: 0; }
        }
        @keyframes jmPulse {
          0%,100% { transform: scale(1); opacity: 0.18; }
          50%      { transform: scale(1.5); opacity: 0; }
        }
        @keyframes jmShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Hover card ── */
        .jm-hover-card {
          background: rgba(20, 30, 80, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(247,243,238,0.15);
          border-radius: 14px;
          overflow: hidden;
          animation: jmFade 0.2s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
        @keyframes jmFade {
          from { opacity: 0; transform: translateY(6px); }
        }
        .jm-card-img {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--jm-bg-2);
        }
        .jm-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .jm-card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-family: var(--jm-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          background: var(--jm-accent);
          padding: 4px 8px;
          border-radius: 999px;
        }
        .jm-card-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .jm-card-meta {
          font-family: var(--jm-mono);
          font-size: 9px;
          color: var(--jm-accent);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .jm-card-title {
          font-family: var(--jm-display);
          font-style: italic;
          font-size: 18px;
          line-height: 1.1;
          color: var(--jm-fg);
          font-weight: 400;
        }
        .jm-card-sub {
          font-family: var(--jm-mono);
          font-size: 10px;
          color: var(--jm-fg-dim);
          letter-spacing: 0.04em;
        }
        .jm-card-blurb {
          font-size: 12px;
          line-height: 1.55;
          color: var(--jm-fg-dim);
          margin-top: 2px;
        }
        .jm-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 6px;
        }
        .jm-tag {
          font-family: var(--jm-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid var(--jm-line-2);
          color: var(--jm-fg-dim);
        }

        /* ── Bottom bar ── */
        .jm-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          gap: 20px;
          border-top: 1px solid var(--jm-line-2);
          background: rgba(30, 50, 130, 0.4);
          backdrop-filter: blur(8px);
        }
        .jm-bar-year {
          font-family: var(--jm-display);
          font-style: italic;
          font-size: 28px;
          color: var(--jm-accent);
          line-height: 1;
          min-width: 56px;
        }
        .jm-bar-title {
          font-family: var(--jm-sans);
          font-size: 13px;
          color: var(--jm-fg);
          font-weight: 500;
          flex: 1;
        }
        .jm-bar-hint {
          font-family: var(--jm-mono);
          font-size: 9px;
          color: var(--jm-fg-faint);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .jm-stage { left: 20px; right: 20px; bottom: 80px; }
          .jm-header { left: 20px; top: 24px; }
          .jm-bar { padding: 0 20px; }
          .jm-bar-hint { display: none; }
          .jm-hover-card { width: 260px !important; }
        }
      `}</style>
    </div>
  );
}
