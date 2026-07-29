import { playTokens } from '@/app/play/tokens'

export type PassageMomentData = {
  kind: 'ladder' | 'snake'
  name: string
  actor: 'You' | 'Computer'
  from: number
  to: number
}

type PassageMomentProps = {
  moment: PassageMomentData
}

/**
 * Full-board beat when someone hits a passage.
 * Text stays on paper for contrast. Sage/rose are accent only.
 */
export default function PassageMoment({ moment }: PassageMomentProps) {
  const isLadder = moment.kind === 'ladder'
  const verb = isLadder ? 'climbs' : 'slides'
  const label = isLadder ? 'Virtue' : 'Vice'
  const accent = isLadder ? playTokens.sage : playTokens.rose

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center p-4"
      role="status"
      aria-live="assertive"
    >
      <div
        className="w-full max-w-[16rem] border-2 border-[var(--play-ink)] bg-[var(--play-paper)] px-5 py-4 text-center"
        style={{
          boxShadow: `inset 4px 0 0 0 ${accent}`,
        }}
      >
        <p
          className="font-label text-label uppercase tracking-[0.1em]"
          style={{ color: playTokens.ink, opacity: 0.7 }}
        >
          {label}
        </p>
        <p
          className="mt-2 font-heading capitalize leading-none"
          style={{
            color: playTokens.ink,
            fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
          }}
        >
          {moment.name}
        </p>
        <p
          className="mt-3 font-body text-body"
          style={{ color: playTokens.ink }}
        >
          {moment.actor === 'You' ? 'You' : 'Computer'} {verb} from {moment.from}{' '}
          to {moment.to}.
        </p>
      </div>
    </div>
  )
}
